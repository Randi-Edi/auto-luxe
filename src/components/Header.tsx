"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Pre Orders", href: "/pre-orders" },
  { label: "Tools", href: "/tools" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  logo?: string;
  phone?: string;
}

export default function Header({ logo, phone }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const logoUrl = logo || "/ganegoda_logo.png";
  const phoneNumber = phone || "+1 (234) 567-890";
  
  // Remove country code from phone number for display (remove + and leading digits)
  const formatPhoneForDisplay = (phone: string): string => {
    // Remove country code (typically + followed by 1-3 digits)
    // This removes patterns like +1, +94, +44, etc.
    return phone.replace(/^\+\d{1,3}\s*/, '').trim();
  };
  
  const displayPhone = formatPhoneForDisplay(phoneNumber);

  // Check if a link is active (handles exact matches and nested routes)
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo" aria-label="Ganegoda International Home">
            <img 
              src={logoUrl} 
              alt="Ganegoda International Logo" 
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium tracking-wide relative transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-silver-light rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground border border-silver-light/40 rounded-md hover:border-silver-light hover:bg-silver-light/10 transition-all relative animate-pulse-ring overflow-visible"
              data-testid="link-phone"
              aria-label={`Call us at ${phoneNumber}`}
            >
              <Phone className="h-4 w-4 relative z-10" aria-hidden="true" />
              <span className="relative z-10">{displayPhone}</span>
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
              className="lg:hidden relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.2 }
            }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <Link href={link.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-sm font-medium transition-all relative ${
                          active
                            ? "text-foreground bg-accent/80 border-l-2 border-silver-light pl-3 font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                        {active && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-silver-light rounded-r-full"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: navLinks.length * 0.05,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Link href="/contact">
                  <Button
                    className="w-full mt-2 bg-silver-light text-background font-medium hover:bg-silver-light/90 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-mobile-sell-car"
                  >
                    Sell Your Car
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

