import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import ContactForm from "@/components/ContactForm";
import Map from "@/components/Map";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { generateSiteMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Contact');
}

export default async function Contact() {
  const siteSettings = await getSiteSettings().catch(() => null);

  // Format phone number for tel: link (remove any non-digit characters except +)
  const phoneNumber = siteSettings?.phone || '+1234567890';
  const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // Format WhatsApp number from site settings (remove any non-digit characters)
  // Fallback to phone number if WhatsApp number is not set
  const whatsappNumber = siteSettings?.whatsapp || siteSettings?.phone || '';
  const formattedWhatsApp = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : '';
  
  // Debug: Log site settings (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Site Settings:', {
      whatsapp: siteSettings?.whatsapp,
      phone: siteSettings?.phone,
      formattedWhatsApp: formattedWhatsApp
    });
  }

  // Format email
  const email = siteSettings?.email || 'info@example.com';

  // Format address - split by newlines if it's a multi-line address
  const addressLines = siteSettings?.address 
    ? siteSettings.address.split('\n').filter(line => line.trim())
    : ['XWVV+59 Kadawatha', 'Sri Lanka'];

  // Get location plus code for directions link
  const locationPlusCode = siteSettings?.locationPlusCode || 'XWVV+59 Kadawatha';
  const getDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationPlusCode)}`;

  // Business hours - use from site settings or default
  const businessHours = siteSettings?.businessHours && siteSettings.businessHours.length > 0
    ? siteSettings.businessHours
    : ['Mon-Fri: 9:00 AM - 7:00 PM', 'Sat: 10:00 AM - 5:00 PM'];

  const contactInfo: Array<{
    icon: typeof Phone;
    title: string;
    details: string[];
    action?: { label: string; href: string; target?: string };
  }> = [
    {
      icon: Phone,
      title: "Phone",
      details: phoneNumber ? [phoneNumber] : [],
      action: { label: "Call Now", href: `tel:${formattedPhone}` },
    },
    {
      icon: Mail,
      title: "Email",
      details: email ? [email] : [],
      action: { label: "Send Email", href: `mailto:${email}` },
    },
    {
      icon: MapPin,
      title: "Location",
      details: addressLines,
      action: { label: "Get Directions", href: getDirectionsUrl, target: "_blank" },
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: businessHours,
    },
  ];

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team. We're here to answer your questions and
            help you find your perfect vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <Card
                  key={item.title}
                  className="border-silver/20 bg-card/30 backdrop-blur-sm p-5"
                  data-testid={`card-contact-${item.title.toLowerCase()}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-silver/10 shrink-0">
                      <item.icon className="h-5 w-5 text-silver-light" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                      {item.action && (
                        <a
                          href={item.action.href}
                          target={item.action.target || undefined}
                          rel={item.action.target === "_blank" ? "noopener noreferrer" : undefined}
                          className="text-sm text-silver-light mt-2 inline-block hover:underline"
                          data-testid={`link-${item.title.toLowerCase()}-action`}
                        >
                          {item.action.label}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20">
                  <SiWhatsapp className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with us directly for quick responses
                  </p>
                </div>
                <a
                  href={`https://wa.me/${formattedWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                    data-testid="button-whatsapp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat Now
                  </Button>
                </a>
              </div>
            </Card>

            <Card
              id="map"
              className="border-silver/20 bg-card/30 backdrop-blur-sm overflow-hidden relative"
            >
              <div className="relative w-full h-[400px] sm:h-[450px] bg-white">
                <Map />
              </div>
            </Card>
          </div>

          <ContactForm 
            whatsappNumber={formattedWhatsApp}
            recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          />
        </div>
      </div>
    </main>
  );
}
