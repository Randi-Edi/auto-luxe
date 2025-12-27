import { Phone, Mail, MapPin } from "lucide-react";
import { 
  SiFacebook, 
  SiInstagram, 
  SiX, 
  SiYoutube, 
  SiWhatsapp,
  SiLinkedin,
  SiTiktok,
  SiPinterest,
  SiSnapchat,
} from "react-icons/si";
import Link from "next/link";
import type { SocialLink } from "@/lib/sanity/fetch";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Pre Orders", href: "/pre-orders" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

// Fallback social links if Sanity data is not available
const fallbackSocialLinks: SocialLink[] = [
  { platform: 'facebook', label: "Facebook", url: "#", order: 0 },
  { platform: 'instagram', label: "Instagram", url: "#", order: 1 },
  { platform: 'twitter', label: "X", url: "#", order: 2 },
  { platform: 'youtube', label: "YouTube", url: "#", order: 3 },
  { platform: 'whatsapp', label: "WhatsApp", url: "#", order: 4 },
];

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  twitter: SiX,
  x: SiX,
  youtube: SiYoutube,
  whatsapp: SiWhatsapp,
  linkedin: SiLinkedin,
  tiktok: SiTiktok,
  pinterest: SiPinterest,
  snapchat: SiSnapchat,
};

interface FooterProps {
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  footerHeading?: string;
  footerDescription?: string;
  socialLinks?: SocialLink[];
}

export default function Footer({ 
  logo, 
  phone, 
  email, 
  address,
  footerHeading,
  footerDescription,
  socialLinks 
}: FooterProps) {
  // Get icon component for platform
  const getIcon = (platform: string) => {
    return iconMap[platform.toLowerCase()] || iconMap.facebook;
  };

  // Ensure socialLinks is always an array
  const linksArray = Array.isArray(socialLinks) && socialLinks.length > 0 
    ? socialLinks 
    : fallbackSocialLinks;
  
  // Sort social links by order
  const sortedSocialLinks = [...linksArray].sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <footer className="border-t border-white/10 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center justify-start gap-2 mb-4" data-testid="link-footer-logo" aria-label="Ganegoda International Home">
              <img 
                src={logo || "/ganegoda_logo.png"} 
                alt="Ganegoda International Logo" 
                className="h-14 sm:h-16 w-auto"
              />
            </Link>
            {footerHeading && (
              <h3 className="font-semibold text-foreground mb-2">
                {footerHeading}
              </h3>
            )}
            {footerDescription && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {footerDescription}
            </p>
            )}
            <div className="flex gap-3">
              {sortedSocialLinks.map((social, index) => {
                const IconComponent = getIcon(social.platform);
                const label = social.label || social.platform;
                return (
                <a
                    key={`${social.platform}-${index}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-silver/10 text-silver hover:bg-silver/20 hover:text-silver-light transition-colors"
                    aria-label={label}
                    data-testid={`link-social-${social.platform.toLowerCase()}`}
                >
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                </a>
                );
              })}
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
              {phone && (
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-silver mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-foreground hover:text-silver-light transition-colors"
                    >
                      {phone}
                    </a>
                  <div className="text-muted-foreground">Mon-Sat 9am-7pm</div>
                </div>
              </li>
              )}
              {email && (
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-silver mt-0.5" aria-hidden="true" />
                <a
                    href={`mailto:${email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-email"
                    aria-label={`Email us at ${email}`}
                >
                    {email}
                </a>
              </li>
              )}
              {address && (
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-silver mt-0.5" aria-hidden="true" />
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {address}
                </div>
              </li>
              )}
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


