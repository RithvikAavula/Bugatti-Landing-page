import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/models", label: "Models" },
    { href: "/heritage", label: "Heritage" },
    { href: "/contact", label: "Contact" },
  ];

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2" aria-label="Bugatti Home">
            <img
              src="https://res.cloudinary.com/dfnpgl0bb/image/upload/e_background_removal/v1762438444/Bugatti_Logo_on_Bold_Black_Background_pg7ogu.png"
              alt="Bugatti Logo"
              className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-body font-medium transition-colors hover:text-primary relative ${
                  location === link.href ? "text-primary" : "text-foreground/80"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-glow" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/models">
              <Button 
                className="relative overflow-hidden group"
                data-testid="button-configure"
              >
                <span className="relative z-10">Explore Models</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/60 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === link.href
                    ? "bg-primary/20 text-primary"
                    : "text-foreground/80 hover:bg-accent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/models">
              <Button className="w-full" onClick={() => setMobileMenuOpen(false)} data-testid="button-mobile-configure">
                Explore Models
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
