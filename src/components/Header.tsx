"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Pre Orders", href: "/pre-orders" },
  { label: "Tools", href: "/tools" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <img 
              src="/ganegoda_logo.png" 
              alt="Ganegoda International Logo" 
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium tracking-wide ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground border border-silver-light/40 rounded-md hover:border-silver-light hover:bg-silver-light/10 transition-all"
              data-testid="link-phone"
            >
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>

            <Link href="/contact">
              <Button
                className="hidden sm:flex bg-silver-light text-background font-medium tracking-wide"
                data-testid="button-sell-car"
              >
                Sell Your Car
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm font-medium ${
                    pathname === link.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                className="w-full mt-2 bg-silver-light text-background font-medium"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-mobile-sell-car"
              >
                Sell Your Car
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

