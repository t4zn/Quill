import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">BlogAI</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Create stunning blog posts with the power of AI. Write, generate, and publish your thoughts effortlessly.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-explore">
                    Explore Blogs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-dashboard">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/editor">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-editor">
                    Write
                  </a>
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
          <p>© 2024 BlogAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
