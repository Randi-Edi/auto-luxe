import { Phone, Mail, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube, SiWhatsapp } from "react-icons/si";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Pre Orders", href: "/pre-orders" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const socialLinks = [
  { icon: SiFacebook, label: "Facebook", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiX, label: "X", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
  { icon: SiWhatsapp, label: "WhatsApp", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <img 
                src="/ganegoda_logo.png" 
                alt="Ganegoda International Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Your trusted partner for premium luxury vehicles. Excellence in every deal, trust in every transaction.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-silver/10 text-silver hover:bg-silver/20 hover:text-silver-light transition-colors"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-silver mt-0.5" />
                <div className="text-sm">
                  <div className="text-foreground">+1 (234) 567-890</div>
                  <div className="text-muted-foreground">Mon-Sat 9am-7pm</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-silver mt-0.5" />
                <a
                  href="mailto:info@ganegoda.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-email"
                >
                  info@ganegoda.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-silver mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  123 Luxury Lane, Premium District
                  <br />
                  New York, NY 10001
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="text-foreground">9:00 - 19:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-muted-foreground">Saturday</span>
                <span className="text-foreground">10:00 - 17:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-foreground">10:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ganegoda International. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


