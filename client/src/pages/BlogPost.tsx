import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  
  const blog = {
    title: "Getting Started with AI Content Generation",
    content: `
# Introduction

Artificial intelligence is revolutionizing the way we create content. In this comprehensive guide, we'll explore how AI can enhance your writing process and help you create engaging blog posts faster than ever before.

## The Power of AI in Writing

AI-powered writing tools have come a long way in recent years. They can now:

- Generate creative ideas and outlines
- Suggest relevant topics based on trends
- Help with grammar and style improvements
- Create engaging introductions and conclusions

## Getting Started

To begin using AI for content generation, you'll need to:

1. Choose the right AI writing tool
2. Define your content goals
3. Provide clear instructions and context
4. Review and refine the generated content

## Best Practices

When working with AI-generated content, remember to:

- Always review and edit the output
- Maintain your unique voice and style
- Fact-check all information
- Use AI as a tool to enhance, not replace, your creativity

## Conclusion

AI content generation is a powerful tool that can significantly improve your writing workflow. By following these best practices, you can create high-quality content more efficiently while maintaining authenticity and originality.
    `,
    author: "Alex Morgan",
    date: "Oct 2, 2024",
    readTime: "4 min read",
    category: "AI & Technology",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop",
    isAiGenerated: true,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Badge variant="secondary" className="mb-4">{blog.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-blog-title">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-foreground">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </motion.div>

              {blog.imageUrl && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12 rounded-lg overflow-hidden"
                >
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-auto"
                    data-testid="img-blog-featured"
                  />
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg max-w-none mb-12" 
                data-testid="content-blog-post"
              >
                <p className="whitespace-pre-wrap leading-relaxed">{blog.content}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-t pt-8"
              >
                <Button variant="outline" data-testid="button-share">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </motion.div>
            </div>

            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-4 space-y-6"
            >
              <AdSensePlaceholder type="sidebar" />
              <AdSensePlaceholder type="square" />
            </motion.aside>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
