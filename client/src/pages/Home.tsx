import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { Sparkles, Clock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  const featuredBlogs = [
    {
      id: "1",
      title: "Getting Started with AI Content Generation",
      excerpt: "Learn how to leverage artificial intelligence to create compelling blog posts that engage your audience and save time.",
      author: "Alex Morgan",
      date: "Oct 2, 2024",
      readTime: "4 min read",
      category: "AI & Technology",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      isAiGenerated: true,
    },
    {
      id: "2",
      title: "The Art of Storytelling in Technical Writing",
      excerpt: "Discover techniques to make your technical content more engaging and accessible to a broader audience.",
      author: "Sarah Chen",
      date: "Oct 1, 2024",
      readTime: "6 min read",
      category: "Writing",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Building a Consistent Content Strategy",
      excerpt: "Create a sustainable content calendar that keeps your audience engaged and your blog growing.",
      author: "Michael Lee",
      date: "Sep 30, 2024",
      readTime: "5 min read",
      category: "Marketing",
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Writing",
      description: "Generate high-quality blog posts with advanced AI assistance",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Create content 10x faster with smart automation",
    },
    {
      icon: Zap,
      title: "Easy Publishing",
      description: "Publish your content with a single click",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <Hero />

      <section className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to create amazing content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 text-center hover-elevate transition-all h-full">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <feature.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <AdSensePlaceholder type="banner" className="mb-8" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Blogs</h2>
            <p className="text-muted-foreground text-lg">
              Discover the latest insights from our community
            </p>
          </motion.div>

          <div className="space-y-6">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
