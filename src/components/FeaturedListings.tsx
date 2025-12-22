"use client";

import VehicleCard, { type Vehicle } from "./VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// todo: remove mock functionality
const featuredVehicles: Vehicle[] = [
  {
    id: "f1",
    name: "BMW 520d",
    price: 12500000, // LKR - 2018+ vehicle
    image: "/attached_assets/bmw 520/587696355_17897336799358785_4107318543107151809_n.jpg",
    year: 2020,
    mileage: 35000,
    fuel: "Diesel",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "f2",
    name: "BMW X1",
    price: 11500000, // LKR - 2018+ vehicle
    image: "/attached_assets/bmw x1/588643803_17897103972358785_8451583355893606700_n.jpg",
    year: 2019,
    mileage: 42000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "f3",
    name: "Honda Civic Blue",
    price: 8500000, // LKR - 2018+ vehicle
    image: "/attached_assets/civic blue/589024052_17897699316358785_5286289233685487724_n.jpg",
    year: 2021,
    mileage: 28000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "f4",
    name: "Honda Vezel",
    price: 10500000, // LKR - 2018+ vehicle
    image: "/attached_assets/vezel/590909875_17897840340358785_7490299254087544074_n.jpg",
    year: 2020,
    mileage: 38000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
];

interface FeaturedListingsProps {
  title?: string;
  subtitle?: string;
  vehicles?: Vehicle[];
  showViewAll?: boolean;
  gridCols?: string; // Custom grid columns class
}

export default function FeaturedListings({
  title = "Featured Listings",
  subtitle = "Handpicked premium vehicles for discerning buyers",
  vehicles = featuredVehicles,
  showViewAll = true,
  gridCols = "lg:grid-cols-4", // Default to 4 columns
}: FeaturedListingsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-card/30">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {showViewAll && (
            <Link href="/vehicles">
              <Button variant="outline" className="border-silver/30 gap-2" data-testid="button-view-all-featured">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6`}>
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onQuickView={(v) => console.log("Quick view:", v.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
