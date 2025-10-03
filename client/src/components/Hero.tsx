import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen } from "lucide-react";
import heroImage from "@assets/generated_images/Blog_editor_AI_interface_9d9bd5ce.png";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight" data-testid="text-hero-title">
              Create, Generate,{" "}
              <span className="text-primary">Publish</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg" data-testid="text-hero-subtitle">
              AI-powered blogging platform that helps you write stunning content faster. Generate ideas, draft posts, and publish with ease.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/editor">
                <Button size="lg" data-testid="button-start-writing">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Writing
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" data-testid="button-explore-blogs">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Blogs
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground" data-testid="text-trust-indicator">
              Join 10,000+ writers creating amazing content with AI
            </p>
          </div>
          
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Blog editor interface with AI assistance"
                className="w-full h-auto"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
