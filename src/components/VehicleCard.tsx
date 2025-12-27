import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, Gauge, Settings2 } from "lucide-react";
import Link from "next/link";
import { formatLKRPrice } from "@/lib/utils";

export type VehicleStatus = "new" | "used" | "reserved" | "sold";

export interface Vehicle {
  id: string;
  slug?: string; // SEO-friendly URL slug
  name: string;
  price: number;
  image: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  status: VehicleStatus;
  brand?: string; // Vehicle brand
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickView?: (vehicle: Vehicle) => void;
  featured?: boolean;
}

const statusConfig: Record<VehicleStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  used: { label: "Used", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  reserved: { label: "Reserved", className: "bg-amber-900/80 text-amber-50 border-amber-400/50 backdrop-blur-md shadow-lg" },
  sold: { label: "Sold", className: "bg-slate-900/80 text-slate-200 border-slate-400/50 backdrop-blur-md shadow-lg" },
};

export default function VehicleCard({ vehicle, onQuickView, featured = false }: VehicleCardProps) {
  // Ensure status exists and is valid, default to 'used' if not
  const vehicleStatus = vehicle.status || 'used'
  const status = statusConfig[vehicleStatus] || statusConfig.used

  return (
    <Card
      className={`group overflow-visible border-white/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover-elevate ${
        featured ? "lg:col-span-2" : ""
      }`}
      data-testid={`card-vehicle-${vehicle.id}`}
    >
      <Link href={`/vehicles/${vehicle.slug || vehicle.id}`} aria-label={`View details for ${vehicle.name}`}>
        <div className="relative overflow-hidden rounded-t-xl cursor-pointer isolate">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full aspect-video object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant="outline"
              className={`${status.className} border font-semibold px-2 py-1 text-sm`}
            >
              {status.label}
            </Badge>
          </div>
          {/* Reserved Watermark - Centered */}
          {vehicleStatus === "reserved" && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <img
                src="/img/reserved.png"
                alt="Reserved"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain opacity-90 drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/vehicles/${vehicle.slug || vehicle.id}`} aria-label={`View details for ${vehicle.name}`}>
          <div className="flex items-start justify-between gap-2 cursor-pointer">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 hover:text-silver-light transition-colors">{vehicle.name}</h3>
              <p className="text-sm text-muted-foreground">{vehicle.year}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-silver-light whitespace-nowrap">
                {formatLKRPrice(vehicle.price)}
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{(vehicle.mileage || 0).toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Fuel className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{vehicle.fuel || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{vehicle.transmission || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
