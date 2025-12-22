"use client"

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleCard, { type Vehicle, type VehicleStatus } from "@/components/VehicleCard";
import VehicleFilters, { type FilterState } from "@/components/VehicleFilters";
import VehicleQuickView from "@/components/VehicleQuickView";

// todo: remove mock functionality
const allVehicles: Vehicle[] = [
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
  {
    id: "p1",
    name: "Honda Civic",
    price: 8500000, // LKR - 2018+ vehicle
    image: "/attached_assets/civic 1/590941900_17896921617358785_7108838582922432010_n.jpg",
    year: 2021,
    mileage: 25000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "p2",
    name: "Honda City",
    price: 7500000, // LKR - 2018+ vehicle
    image: "/attached_assets/honda city/588650776_17897700795358785_1331596431631181195_n.jpg",
    year: 2020,
    mileage: 32000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "p3",
    name: "Suzuki Swift",
    price: 5500000, // LKR - 2018+ vehicle
    image: "/attached_assets/swift/589070700_17897578743358785_7473685017664571608_n.jpg",
    year: 2019,
    mileage: 45000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "p4",
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
    id: "r1",
    name: "BMW 520d",
    price: 12500000, // LKR - 2018+ vehicle
    image: "/attached_assets/bmw 520/587696355_17897336799358785_4107318543107151809_n.jpg",
    year: 2020,
    mileage: 35000,
    fuel: "Diesel",
    transmission: "Auto",
    status: "reserved",
  },
  {
    id: "r2",
    name: "BMW X1",
    price: 11500000, // LKR - 2018+ vehicle
    image: "/attached_assets/bmw x1/588643803_17897103972358785_8451583355893606700_n.jpg",
    year: 2019,
    mileage: 42000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "reserved",
  },
  {
    id: "r3",
    name: "Honda Vezel",
    price: 10500000, // LKR - 2018+ vehicle
    image: "/attached_assets/vezel/590909875_17897840340358785_7490299254087544074_n.jpg",
    year: 2020,
    mileage: 38000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "reserved",
  },
];

const defaultFilters: FilterState = {
  priceRange: [0, 15000000], // LKR (0 to 15M)
  brand: "all",
  year: "all",
  transmission: "all",
  fuel: "all",
  condition: "all",
};

type TabValue = "all" | VehicleStatus;

export default function Vehicles() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((vehicle) => {
      if (activeTab !== "all" && vehicle.status !== activeTab) return false;
      if (
        vehicle.price < filters.priceRange[0] ||
        vehicle.price > filters.priceRange[1]
      )
        return false;
      return true;
    });
  }, [activeTab, filters]);

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
        />
      </div>
    </main>
  );
}



