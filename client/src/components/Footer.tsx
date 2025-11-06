import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                BUGATTI
              </span>
            </h3>
            <p className="text-sm text-foreground/70 font-body">
              Crafting automotive masterpieces since 1909
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/models" className="text-foreground/70 hover:text-primary transition-colors">
                  Models
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="text-foreground/70 hover:text-primary transition-colors">
                  Heritage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Find a Dealer
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Customer Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center text-sm text-foreground/50">
          <p>&copy; {new Date().getFullYear()} Bugatti Automobiles S.A.S. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
