"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Phone, Eye, Fuel, Gauge, Settings2, Calendar, Cog, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import type { Vehicle, VehicleStatus } from "./VehicleCard";
import type { SiteSettings } from "@/lib/sanity/fetch";
import { formatLKRPrice } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

interface VehicleQuickViewProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images?: string[];
  siteSettings?: SiteSettings | null;
}

const statusConfig: Record<VehicleStatus, { label: string; className: string }> = {
  new: { label: "Available", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  used: { label: "Available", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  reserved: { label: "Reserved", className: "bg-amber-900/80 text-amber-50 border-amber-400/50 backdrop-blur-md shadow-lg" },
  sold: { label: "Sold", className: "bg-slate-900/80 text-slate-200 border-slate-400/50 backdrop-blur-md shadow-lg" },
};

export default function VehicleQuickView({ vehicle, open, onOpenChange, images, siteSettings }: VehicleQuickViewProps) {
  const vehicleImages = images || (vehicle ? [vehicle.image, vehicle.image, vehicle.image] : []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!open && emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [open, emblaApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      } else if (e.key === "ArrowLeft") {
        if (emblaApi) emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        if (emblaApi) emblaApi.scrollNext();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, emblaApi, onOpenChange]);

  if (!vehicle) return null;

  // Ensure status exists and is valid, default to 'used' if not
  const vehicleStatus = vehicle.status || 'used'
  const status = statusConfig[vehicleStatus] || statusConfig.used
  const isSold = vehicle.status === "sold";

  // Get phone and WhatsApp numbers from site settings
  const phoneNumber = siteSettings?.phone || '+1234567890';
  const whatsappNumber = siteSettings?.whatsapp || '1234567890';
  
  // Format phone number for tel: link (remove any non-digit characters except +)
  const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // Format WhatsApp number (remove any non-digit characters)
  const formattedWhatsApp = whatsappNumber.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.name} listed at ${formatLKRPrice(vehicle.price)}. Please provide more details.`
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-card/95 backdrop-blur-xl border-silver/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-hidden">
          <div className="relative bg-black flex flex-col">
            <div className="embla overflow-hidden flex-1 min-h-[400px] lg:min-h-[500px]" ref={emblaRef}>
              <div className="embla__container flex h-full">
                {vehicleImages.map((img, index) => (
                  <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 flex items-center justify-center">
              <img
                      src={img}
                      alt={`${vehicle.name} - Image ${index + 1}`}
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />
                  </div>
                ))}
              </div>
            </div>
              
              {vehicleImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white border-0 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-all ml-2"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                    data-testid="button-quickview-prev"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white border-0 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-all mr-2"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                    data-testid="button-quickview-next"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </>
              )}

            {vehicleImages.length > 1 && (
              <div className="flex justify-center gap-2 p-3 bg-black/50">
                {vehicleImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === selectedIndex ? "w-6 bg-silver-light" : "w-2 bg-silver/40 hover:bg-silver/60"
                    }`}
                    data-testid={`button-quickview-dot-${index}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 overflow-y-auto">
            <div className="mb-4">
              <Badge variant="outline" className={`${status.className} border font-semibold px-2 py-1 text-sm mb-3`}>
                {status.label}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {vehicle.year} {vehicle.name}
            </h3>
            <p className="text-3xl font-bold text-silver-light mb-6">
              {formatLKRPrice(vehicle.price)}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-silver" />
                <span>Year: {vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-silver" />
                <span>Mileage: {vehicle.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-silver" />
                <span>Fuel: {vehicle.fuel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-silver" />
                <span>Transmission: {vehicle.transmission}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href={`/vehicles/${vehicle.slug || vehicle.id}`} passHref>
                <Button className="w-full bg-silver-light text-background font-medium">
                  View Full Details
                </Button>
              </Link>
              <a
                href={`https://wa.me/${formattedWhatsApp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-silver/30 text-foreground font-medium py-2.5 rounded-md hover:bg-silver/20 transition-colors"
              >
                <SiWhatsapp className="h-5 w-5" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:${formattedPhone}`}
                className="w-full flex items-center justify-center gap-2 border border-silver/30 text-foreground font-medium py-2.5 rounded-md hover:bg-silver/20 transition-colors"
                >
                <Phone className="h-5 w-5" aria-hidden="true" />
                  Call Us
              </a>
            </div>
          </div>
        </div>

        <style jsx global>{`
          .embla {
            overflow: hidden;
          }
          .embla__container {
            display: flex;
            touch-action: pan-y pinch-zoom;
          }
          .embla__slide {
            flex: 0 0 100%;
            min-width: 0;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
