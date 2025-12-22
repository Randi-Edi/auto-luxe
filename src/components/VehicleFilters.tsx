"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, SlidersHorizontal } from "lucide-react";
import { formatLKRPrice } from "@/lib/utils";

export interface FilterState {
  priceRange: [number, number];
  brand: string;
  year: string;
  transmission: string;
  fuel: string;
  condition: string;
}

interface VehicleFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const brands = ["All", "Mercedes-Benz", "BMW", "Porsche", "Ferrari", "Audi", "Range Rover", "Tesla"];
const years = ["All", "2024", "2023", "2022", "2021", "2020"];
const transmissions = ["All", "Automatic", "Manual"];
const fuels = ["All", "Petrol", "Diesel", "Electric", "Hybrid"];
const conditions = ["All", "New", "Used"];

export default function VehicleFilters({ filters, onFiltersChange, onReset }: VehicleFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">
          Price Range: {formatLKRPrice(filters.priceRange[0], { showCurrency: true })} - {formatLKRPrice(filters.priceRange[1], { showCurrency: true })}
        </Label>
        <Slider
          value={filters.priceRange}
          min={0}
          max={150000000}
          step={1000000}
          onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
          className="mt-2"
          data-testid="slider-price-range"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Brand</Label>
        <Select value={filters.brand} onValueChange={(v) => updateFilter("brand", v)}>
          <SelectTrigger className="bg-background/50 border-silver/30" data-testid="select-brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand.toLowerCase()}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Year</Label>
        <Select value={filters.year} onValueChange={(v) => updateFilter("year", v)}>
          <SelectTrigger className="bg-background/50 border-silver/30" data-testid="select-year">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toLowerCase()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Transmission</Label>
        <Select value={filters.transmission} onValueChange={(v) => updateFilter("transmission", v)}>
          <SelectTrigger className="bg-background/50 border-silver/30" data-testid="select-transmission">
            <SelectValue placeholder="Select transmission" />
          </SelectTrigger>
          <SelectContent>
            {transmissions.map((trans) => (
              <SelectItem key={trans} value={trans.toLowerCase()}>
                {trans}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Fuel Type</Label>
        <Select value={filters.fuel} onValueChange={(v) => updateFilter("fuel", v)}>
          <SelectTrigger className="bg-background/50 border-silver/30" data-testid="select-fuel">
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            {fuels.map((fuel) => (
              <SelectItem key={fuel} value={fuel.toLowerCase()}>
                {fuel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Condition</Label>
        <Select value={filters.condition} onValueChange={(v) => updateFilter("condition", v)}>
          <SelectTrigger className="bg-background/50 border-silver/30" data-testid="select-condition">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((cond) => (
              <SelectItem key={cond} value={cond.toLowerCase()}>
                {cond}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full border-silver/30"
        onClick={onReset}
        data-testid="button-reset-filters"
      >
        <X className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        className="lg:hidden mb-4 w-full border-silver/30"
        onClick={() => setMobileOpen(!mobileOpen)}
        data-testid="button-toggle-filters"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        {mobileOpen ? "Hide Filters" : "Show Filters"}
      </Button>

      {mobileOpen && (
        <Card className="lg:hidden border-silver/20 bg-card/30 backdrop-blur-sm p-4 mb-6">
          <FilterContent />
        </Card>
      )}

      <Card className="hidden lg:block border-silver/20 bg-card/30 backdrop-blur-sm p-6 sticky top-20">
        <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        <FilterContent />
      </Card>
    </>
  );
}
