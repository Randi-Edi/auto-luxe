"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import ContactForm from "@/components/ContactForm";
import Map from "@/components/Map";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (234) 567-890", "+1 (234) 567-891"],
    action: { label: "Call Now", href: "tel:+1234567890" },
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@elitemotors.com", "sales@elitemotors.com"],
    action: { label: "Send Email", href: "mailto:info@elitemotors.com" },
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["XWVV+59 Kadawatha", "Sri Lanka"],
    action: { label: "Get Directions", href: "#map" },
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 5:00 PM"],
  },
];

export default function Contact() {
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
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                  onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                  data-testid="button-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat Now
                </Button>
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

          <ContactForm />
        </div>
      </div>
    </main>
  );
}



