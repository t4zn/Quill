import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import User from "./models/User";
import Blog from "./models/Blog";
import { generateToken, verifyToken, optionalAuth } from "./middleware/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import passport from "./config/passport";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // User authentication endpoints
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password, firstName, lastName } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }]
      });

      if (existingUser) {
        return res.status(409).json({
          error: existingUser.username === username ? "Username already exists" : "Email already exists"
        });
      }

      // Create new user
      const user = new User({
        username,
        email,
        password,
        firstName,
        lastName
      });

      await user.save();

      // Generate JWT token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        user: user.toJSON(),
        token
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      // Find user by username or email
      const user = await User.findOne({
        $or: [{ username }, { email: username }]
      });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = generateToken(user._id);

      res.json({
        success: true,
        user: user.toJSON(),
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // Get current user profile
  app.get("/api/auth/me", verifyToken, async (req: Request, res: Response) => {
    res.json({ user: req.user?.toJSON() });
  });

  // OAuth Routes
  // Google OAuth
  app.get("/api/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth?error=google_failed" }),
    async (req, res) => {
      const user = req.user as any;
      const token = generateToken(user._id);
      res.redirect(`/?token=${token}&user=${encodeURIComponent(JSON.stringify(user.toJSON()))}`);
    }
  );

  // GitHub OAuth
  app.get("/api/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get("/api/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth?error=github_failed" }),
    async (req, res) => {
      const user = req.user as any;
      const token = generateToken(user._id);
      res.redirect(`/?token=${token}&user=${encodeURIComponent(JSON.stringify(user.toJSON()))}`);
    }
  );

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  // AI content generation endpoint
  app.post("/api/generate-content", verifyToken, async (req: Request, res: Response) => {
    try {
      const { topic, quantity = 1 } = req.body;

      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "AI service not configured" });
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const generatedContent = [];

      for (let i = 0; i < parseInt(quantity); i++) {
        const prompt = `Write a comprehensive blog post about "${topic}". 
        Include:
        1. An engaging title
        2. A brief excerpt (2-3 sentences)
        3. Full content with proper structure (introduction, main points, conclusion)
        4. Make it informative and engaging
        
        Format the response as JSON with: title, excerpt, content`;

        try {
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();

          // Try to parse as JSON, fallback to structured text
          let blogData;
          try {
            blogData = JSON.parse(text);
          } catch {
            blogData = {
              title: `${topic} - AI Generated Article ${i + 1}`,
              excerpt: `An AI-generated article exploring various aspects of ${topic}.`,
              content: text
            };
          }

          generatedContent.push({
            id: `generated-${Date.now()}-${i}`,
            title: blogData.title || `${topic} - Part ${i + 1}`,
            content: blogData.content || text,
            excerpt: blogData.excerpt || `A comprehensive guide about ${topic}.`,
            author: req.user?.username || "AI Assistant",
            date: new Date().toISOString(),
            readTime: Math.ceil((blogData.content || text).split(' ').length / 200) + " min read",
            isAIGenerated: true
          });
        } catch (aiError) {
          console.error("AI generation error:", aiError);
          // Fallback content
          generatedContent.push({
            id: `generated-${Date.now()}-${i}`,
            title: `AI Generated: ${topic} - Part ${i + 1}`,
            content: `This is AI-generated content about ${topic}. The AI service encountered an issue, but here's a placeholder article structure you can expand upon.`,
            excerpt: `A brief overview of ${topic} and its key concepts.`,
            author: req.user?.username || "AI Assistant",
            date: new Date().toISOString(),
            readTime: "3 min read",
            isAIGenerated: true
          });
        }
      }

      res.json({ success: true, content: generatedContent });
    } catch (error) {
      console.error("Content generation error:", error);
      res.status(500).json({ error: "Failed to generate content" });
    }
  });

  // Blog CRUD endpoints
  app.get("/api/blogs", optionalAuth, async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, category, author, search } = req.query;

      const query: any = { status: 'published' };

      if (category) query.category = category;
      if (author) {
        const authorUser = await User.findOne({ username: author });
        if (authorUser) query.author = authorUser._id;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search as string, 'i')] } }
        ];
      }

      const blogs = await Blog.find(query)
        .populate('author', 'username firstName lastName avatar')
        .sort({ publishedAt: -1 })
        .limit(Number(limit) * 1)
        .skip((Number(page) - 1) * Number(limit));

      const total = await Blog.countDocuments(query);

      res.json({
        blogs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      console.error("Fetch blogs error:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.post("/api/blogs", verifyToken, async (req: Request, res: Response) => {
    try {
      const blogData = {
        ...req.body,
        author: req.user!._id
      };

      const blog = new Blog(blogData);
      await blog.save();

      await blog.populate('author', 'username firstName lastName avatar');

      res.status(201).json({ success: true, blog });
    } catch (error) {
      console.error("Create blog error:", error);
      res.status(500).json({ error: "Failed to create blog" });
    }
  });

  app.get("/api/blogs/:id", optionalAuth, async (req: Request, res: Response) => {
    try {
      const blog = await Blog.findById(req.params.id)
        .populate('author', 'username firstName lastName avatar bio');

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Increment view count
      blog.views += 1;
      await blog.save();

      res.json({ blog });
    } catch (error) {
      console.error("Fetch blog error:", error);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
