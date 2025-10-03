import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/Blog_editor_AI_interface_9d9bd5ce.png";

export default function Hero() {
  const words = ["Create", "Generate", "Publish"];
  
  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight" data-testid="text-hero-title">
                  {words.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={i === words.length - 1 ? "block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" : ""}
                    >
                      {word}
                      {i < words.length - 1 ? ", " : ""}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed" 
              data-testid="text-hero-subtitle"
            >
              Transform your ideas into beautiful stories with AI. Write faster, publish smarter.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/editor">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow" data-testid="button-start-writing">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Writing
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" data-testid="button-explore-blogs">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore
                </Button>
              </Link>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-muted-foreground" 
              data-testid="text-trust-indicator"
            >
              Join 10,000+ writers creating amazing content
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src={heroImage}
                alt="Blog editor interface with AI assistance"
                className="w-full h-auto"
                data-testid="img-hero"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
