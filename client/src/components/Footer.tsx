import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Quill
            </motion.h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Transform your ideas into beautiful stories with AI. Write faster, publish smarter.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-explore">
                    Explore Blogs
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-dashboard">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/editor">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-editor">
                    Write
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-docs">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-support">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-privacy">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Quill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
