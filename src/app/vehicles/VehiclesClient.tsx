"use client"

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleCard, { type Vehicle, type VehicleStatus } from "@/components/VehicleCard";
import VehicleFilters, { type FilterState } from "@/components/VehicleFilters";
import VehicleQuickView from "@/components/VehicleQuickView";
import type { SiteSettings } from "@/lib/sanity/fetch";

const defaultFilters: FilterState = {
  brand: "all",
  year: "all",
  transmission: "all",
  fuel: "all",
  condition: "all",
};

type TabValue = "all" | VehicleStatus;

interface VehiclesClientProps {
  vehicles: Vehicle[];
  siteSettings?: SiteSettings | null;
}

export default function VehiclesClient({ vehicles, siteSettings }: VehiclesClientProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Filter by status tab
      if (activeTab !== "all" && vehicle.status !== activeTab) return false;

      // Filter by brand (case-insensitive)
      if (filters.brand !== "all") {
        const vehicleBrand = (vehicle.brand || "").toLowerCase().trim();
        const filterBrand = filters.brand.toLowerCase().trim();
        // Check if brand matches (handles partial matches for compound names)
        if (vehicleBrand !== filterBrand && !vehicleBrand.includes(filterBrand) && !filterBrand.includes(vehicleBrand)) {
          return false;
        }
      }

      // Filter by year
      if (filters.year !== "all") {
        const filterYear = filters.year;
        if (vehicle.year.toString() !== filterYear) {
          return false;
        }
      }

      // Filter by transmission (case-insensitive, handle "auto" vs "automatic")
      if (filters.transmission !== "all") {
        const vehicleTransmission = (vehicle.transmission || "").toLowerCase().trim();
        const filterTransmission = filters.transmission.toLowerCase().trim();
        
        if (filterTransmission === "automatic") {
          // Accept both "auto" and "automatic"
          if (vehicleTransmission !== "auto" && vehicleTransmission !== "automatic") {
            return false;
          }
        } else if (vehicleTransmission !== filterTransmission) {
          return false;
        }
      }

      // Filter by fuel type (case-insensitive)
      if (filters.fuel !== "all") {
        const vehicleFuel = (vehicle.fuel || "").toLowerCase().trim();
        const filterFuel = filters.fuel.toLowerCase().trim();
        if (vehicleFuel !== filterFuel) {
          return false;
        }
      }

      // Filter by condition (maps to status)
      if (filters.condition !== "all") {
        const vehicleStatus = (vehicle.status || "").toLowerCase().trim();
        const filterCondition = filters.condition.toLowerCase().trim();
        // Condition filter maps directly to status
        if (vehicleStatus !== filterCondition) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, filters, vehicles]);

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Our Vehicles
          </h1>
          <p className="text-muted-foreground">
            Explore our curated collection of premium luxury vehicles
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="mb-6">
          <TabsList className="bg-card/50 border border-silver/20">
            <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
            <TabsTrigger value="new" data-testid="tab-new">New</TabsTrigger>
            <TabsTrigger value="used" data-testid="tab-used">Used</TabsTrigger>
            <TabsTrigger value="reserved" data-testid="tab-reserved">Reserved</TabsTrigger>
            <TabsTrigger value="sold" data-testid="tab-sold">Sold</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <VehicleFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No vehicles found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onQuickView={setQuickViewVehicle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <VehicleQuickView
          vehicle={quickViewVehicle}
          open={!!quickViewVehicle}
          onOpenChange={(open) => !open && setQuickViewVehicle(null)}
          siteSettings={siteSettings}
        />
      </div>
    </main>
  );
}

