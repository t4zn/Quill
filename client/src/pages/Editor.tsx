import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogEditor from "@/components/BlogEditor";

export default function Editor() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Create New Blog</h1>
            <p className="text-muted-foreground text-lg">
              Write your thoughts and share them with the world
            </p>
          </div>

          <BlogEditor />
        </div>
      </div>

      <Footer />
    </div>
  );
}
