"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Phone, Eye, Fuel, Gauge, Settings2, Calendar, Cog, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import type { Vehicle, VehicleStatus } from "./VehicleCard";
import { formatLKRPrice } from "@/lib/utils";

interface VehicleQuickViewProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images?: string[];
}

const statusConfig: Record<VehicleStatus, { label: string; className: string }> = {
  new: { label: "Available", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  used: { label: "Available", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  reserved: { label: "Reserved", className: "bg-amber-900/80 text-amber-50 border-amber-400/50 backdrop-blur-md shadow-lg" },
  sold: { label: "Sold", className: "bg-slate-900/80 text-slate-200 border-slate-400/50 backdrop-blur-md shadow-lg" },
};

export default function VehicleQuickView({ vehicle, open, onOpenChange, images }: VehicleQuickViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const vehicleImages = images || (vehicle ? [vehicle.image, vehicle.image, vehicle.image] : []);

  useEffect(() => {
    if (!open) setCurrentImageIndex(0);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + vehicleImages.length) % vehicleImages.length);
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % vehicleImages.length);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, vehicleImages.length, onOpenChange]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicleImages.length) % vehicleImages.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicleImages.length);
  };

  if (!vehicle) return null;

  const status = statusConfig[vehicle.status];
  const isSold = vehicle.status === "sold";

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${vehicle.year} ${vehicle.name} listed at ${formatLKRPrice(vehicle.price)}. Please provide more details.`
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-card/95 backdrop-blur-xl border-silver/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-hidden">
          <div className="relative bg-black flex flex-col">
            <div className="relative flex-1 min-h-[400px] lg:min-h-[500px] overflow-hidden flex items-center justify-center">
              <img
                src={vehicleImages[currentImageIndex]}
                alt={vehicle.name}
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />
              
              {vehicleImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white border-0 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-all ml-2"
                    onClick={goToPrevious}
                    data-testid="button-quickview-prev"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white border-0 h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-all mr-2"
                    onClick={goToNext}
                    data-testid="button-quickview-next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {vehicleImages.length > 1 && (
              <div className="flex justify-center gap-2 p-3 bg-black/50">
                {vehicleImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === currentImageIndex ? "w-6 bg-silver-light" : "w-2 bg-silver/40 hover:bg-silver/60"
                    }`}
                    data-testid={`button-quickview-dot-${index}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col overflow-y-auto">
            <div className="mb-4">
              <Badge variant="outline" className={`${status.className} border font-semibold px-2 py-1 text-sm mb-3`}>
                {status.label}
              </Badge>
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                {vehicle.name}
              </h2>
              <p className="text-muted-foreground">{vehicle.year}</p>
            </div>

            <div className="text-3xl font-bold text-silver-light mb-6">
              {formatLKRPrice(vehicle.price)}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 rounded-md bg-background/50 border border-silver/10">
                <Calendar className="h-4 w-4 text-silver" />
                <div>
                  <div className="text-xs text-muted-foreground">Year</div>
                  <div className="text-sm font-medium">{vehicle.year}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-background/50 border border-silver/10">
                <Gauge className="h-4 w-4 text-silver" />
                <div>
                  <div className="text-xs text-muted-foreground">Mileage</div>
                  <div className="text-sm font-medium">{vehicle.mileage.toLocaleString()} mi</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-background/50 border border-silver/10">
                <Fuel className="h-4 w-4 text-silver" />
                <div>
                  <div className="text-xs text-muted-foreground">Fuel Type</div>
                  <div className="text-sm font-medium">{vehicle.fuel}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-background/50 border border-silver/10">
                <Settings2 className="h-4 w-4 text-silver" />
                <div>
                  <div className="text-xs text-muted-foreground">Transmission</div>
                  <div className="text-sm font-medium">{vehicle.transmission}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-background/50 border border-silver/10">
                <Cog className="h-4 w-4 text-silver" />
                <div>
                  <div className="text-xs text-muted-foreground">Engine</div>
                  <div className="text-sm font-medium">3.0L V6</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-background/50 border border-silver/10">
                <CheckCircle2 className="h-4 w-4 text-silver" />
                <div>
                  <div className="text-xs text-muted-foreground">Condition</div>
                  <div className="text-sm font-medium capitalize">{vehicle.status === "new" ? "New" : "Pre-Owned"}</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
              Experience luxury and performance with this exceptional {vehicle.name}. 
              This vehicle combines sophisticated design with cutting-edge technology, 
              delivering an unparalleled driving experience...
            </p>
            <Link href={`/vehicles/${vehicle.id}`}>
              <span className="text-sm text-silver-light hover:underline cursor-pointer">
                View Full Details
              </span>
            </Link>

            <div className="mt-auto pt-6 space-y-3">
              <Link href={`/vehicles/${vehicle.id}`}>
                <Button
                  className="w-full bg-silver-light text-background font-medium gap-2"
                  disabled={isSold}
                  data-testid="button-view-details"
                >
                  <Eye className="h-4 w-4" />
                  View Full Details
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-silver/30 gap-2"
                  onClick={() => window.open("tel:+1234567890")}
                  disabled={isSold}
                  data-testid="button-quickview-call"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                  onClick={() => window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, "_blank")}
                  disabled={isSold}
                  data-testid="button-quickview-whatsapp"
                >
                  <SiWhatsapp className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
