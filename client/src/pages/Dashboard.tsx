import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import BlogCard from "@/components/BlogCard";
import { FileText, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  const myBlogs = [
    {
      id: "1",
      title: "Getting Started with AI Content Generation",
      excerpt: "Learn how to leverage artificial intelligence to create compelling blog posts.",
      author: "You",
      date: "Oct 2, 2024",
      readTime: "4 min read",
      category: "AI & Technology",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      isAiGenerated: true,
    },
    {
      id: "2",
      title: "Building a Content Strategy",
      excerpt: "Create a sustainable content calendar that keeps your audience engaged.",
      author: "You",
      date: "Sep 30, 2024",
      readTime: "5 min read",
      category: "Marketing",
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Manage your blogs and track your progress
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
              title="Total Blogs"
              value="24"
              icon={FileText}
              description="+12% from last month"
            />
            <StatsCard
              title="AI Generated"
              value="12"
              icon={Sparkles}
              description="50% of total blogs"
            />
            <StatsCard
              title="Total Views"
              value="1,284"
              icon={Eye}
              description="+23% from last month"
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">My Blogs</h2>
            <div className="flex gap-3">
              <Link href="/ai-generator">
                <Button variant="outline" data-testid="button-ai-generator">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Generator
                </Button>
              </Link>
              <Link href="/editor">
                <Button data-testid="button-new-blog-dashboard">
                  New Blog
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {myBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
