import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "AI & Technology",
    "Web Development",
    "Design",
    "Marketing",
    "Writing",
    "Productivity",
  ];

  const allBlogs = [
    {
      id: "1",
      title: "Getting Started with AI Content Generation",
      excerpt: "Learn how to leverage artificial intelligence to create compelling blog posts that engage your audience.",
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
      excerpt: "Discover techniques to make your technical content more engaging and accessible.",
      author: "Sarah Chen",
      date: "Oct 1, 2024",
      readTime: "6 min read",
      category: "Writing",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Modern Web Development Best Practices",
      excerpt: "A comprehensive guide to building scalable and maintainable web applications in 2024.",
      author: "David Park",
      date: "Sep 29, 2024",
      readTime: "8 min read",
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "Design Systems That Scale",
      excerpt: "Building consistent and scalable design systems for modern applications.",
      author: "Emma Wilson",
      date: "Sep 28, 2024",
      readTime: "7 min read",
      category: "Design",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Blogs</h1>
            <p className="text-muted-foreground text-lg">
              Discover inspiring content from our community
            </p>
          </div>

          <div className="mb-8">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="mb-8">
            <CategoryFilter 
              categories={categories}
              onFilterChange={setSelectedCategory}
            />
          </div>

          <div className="space-y-6">
            {allBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
