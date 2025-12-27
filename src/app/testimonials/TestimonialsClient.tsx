"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  image: string;
  message: string;
}

interface TestimonialsClientProps {
  testimonials: Testimonial[];
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  const openLightbox = (image: string, name: string) => {
    setSelectedImage(image);
    setSelectedName(name);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    setSelectedName("");
    document.body.style.overflow = "";
  };

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) {
        closeLightbox();
      }
    };

    if (lightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="border-silver/20 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-silver/40 transition-colors flex flex-col h-full"
            data-testid={`card-testimonial-${testimonial.id}`}
          >
            {/* Full Image Section */}
            <div 
              className="relative w-full aspect-[3/4] bg-black/50 flex items-center justify-center overflow-hidden cursor-pointer group"
              onClick={() => {
                if (testimonial.image && testimonial.image !== "/placeholder-person.jpg") {
                  openLightbox(testimonial.image, testimonial.name);
                }
              }}
            >
              {testimonial.image && testimonial.image !== "/placeholder-person.jpg" ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-background/20">
                  <span className="text-6xl font-bold text-foreground opacity-50">
                    {testimonial.name[0]}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              {testimonial.image && testimonial.image !== "/placeholder-person.jpg" && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <Quote className="h-8 w-8 text-silver/30" />
                <div className="text-right">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                </div>
              </div>
              
              <p className="text-foreground leading-relaxed mb-6 flex-1 italic">
                "{testimonial.message}"
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto">
            <img
              src={selectedImage}
              alt={selectedName}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              loading="eager"
              decoding="async"
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20">
              <div className="text-white text-sm font-semibold">{selectedName}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

