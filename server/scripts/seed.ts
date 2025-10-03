import mongoose from 'mongoose';
import User from '../models/User';
import Blog from '../models/Blog';
import connectDB from '../mongodb';

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Seeding database...');
    
    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});
    
    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@blogs.taizun.site',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true
    });
    
    await adminUser.save();
    console.log('✅ Admin user created');
    
    // Create sample user
    const sampleUser = new User({
      username: 'taizun',
      email: 'hello@taizun.site',
      password: 'password123',
      firstName: 'Taizun',
      lastName: 'Developer',
      bio: 'Full-stack developer passionate about AI and modern web technologies.',
      isVerified: true
    });
    
    await sampleUser.save();
    console.log('✅ Sample user created');
    
    // Create sample blogs
    const sampleBlogs = [
      {
        title: 'Welcome to Quill - AI-Powered Blogging Platform',
        slug: 'welcome-to-quill-ai-powered-blogging-platform',
        content: `# Welcome to Quill

Quill is a modern blogging platform that combines the power of artificial intelligence with elegant design to help you create compelling content effortlessly.

## Features

- **AI Content Generation**: Generate blog posts using Google's Gemini AI
- **Rich Text Editor**: Write and format your content with ease
- **Responsive Design**: Beautiful on all devices
- **User Authentication**: Secure login and user management
- **SEO Optimized**: Built-in SEO features for better discoverability

## Getting Started

1. Create your account
2. Start writing or use AI to generate content
3. Publish and share your thoughts with the world

Welcome to the future of blogging!`,
        excerpt: 'Discover Quill, the AI-powered blogging platform that makes content creation effortless and engaging.',
        author: adminUser._id,
        tags: ['welcome', 'ai', 'blogging', 'platform'],
        category: 'Announcements',
        status: 'published',
        publishedAt: new Date(),
        isAIGenerated: false
      },
      {
        title: 'The Future of AI in Content Creation',
        slug: 'the-future-of-ai-in-content-creation',
        content: `# The Future of AI in Content Creation

Artificial Intelligence is revolutionizing how we create, edit, and optimize content. From generating initial drafts to suggesting improvements, AI tools are becoming indispensable for content creators.

## Current AI Capabilities

- **Content Generation**: AI can create articles, blog posts, and marketing copy
- **Grammar and Style**: Advanced proofreading and style suggestions
- **SEO Optimization**: Keyword suggestions and content optimization
- **Translation**: Multi-language content creation

## What's Next?

The future holds even more exciting possibilities:
- Personalized content for individual readers
- Real-time content adaptation
- Voice-to-text content creation
- Advanced multimedia integration

AI isn't replacing human creativity—it's amplifying it.`,
        excerpt: 'Explore how artificial intelligence is transforming content creation and what the future holds for creators.',
        author: sampleUser._id,
        tags: ['ai', 'content', 'future', 'technology'],
        category: 'Technology',
        status: 'published',
        publishedAt: new Date(Date.now() - 86400000), // 1 day ago
        isAIGenerated: false
      }
    ];
    
    for (const blogData of sampleBlogs) {
      const blog = new Blog(blogData);
      await blog.save();
    }
    
    console.log('✅ Sample blogs created');
    console.log('🎉 Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();