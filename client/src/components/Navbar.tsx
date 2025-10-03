import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, PenSquare } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/">
            <a className="text-xl font-bold tracking-tight hover-elevate active-elevate-2 px-3 py-2 rounded-lg" data-testid="link-home">
              BlogAI
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/">
              <a className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                location === "/" ? "bg-muted" : ""
              }`} data-testid="link-home-nav">
                Home
              </a>
            </Link>
            <Link href="/explore">
              <a className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                location === "/explore" ? "bg-muted" : ""
              }`} data-testid="link-explore">
                Explore
              </a>
            </Link>
            <Link href="/dashboard">
              <a className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                location === "/dashboard" ? "bg-muted" : ""
              }`} data-testid="link-dashboard">
                Dashboard
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Link href="/editor">
              <Button data-testid="button-new-blog">
                <PenSquare className="h-4 w-4 mr-2" />
                New Blog
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" data-testid="button-login">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
