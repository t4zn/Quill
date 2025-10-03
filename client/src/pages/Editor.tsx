import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnhancedBlogEditor from "@/components/EnhancedBlogEditor";
import AdSensePlaceholder from "@/components/AdSensePlaceholder";
import { motion } from "framer-motion";

export default function Editor() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Create New Blog</h1>
            <p className="text-muted-foreground text-lg">
              Write your thoughts and share them with the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <EnhancedBlogEditor />
            </div>
            
            <motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              <AdSensePlaceholder type="sidebar" />
              <AdSensePlaceholder type="square" />
            </motion.aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
