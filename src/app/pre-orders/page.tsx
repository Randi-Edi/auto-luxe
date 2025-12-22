"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CalendarDays, AlertCircle } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

interface PreOrderVehicle {
  id: string;
  name: string;
  expectedPrice: string;
  image: string;
  expectedArrival: string;
  slotsAvailable: number;
  features: string[];
}

// todo: remove mock functionality
const preOrderVehicles: PreOrderVehicle[] = [
  {
    id: "po1",
    name: "Porsche 911 GT3 RS",
    expectedPrice: "From LKR 67,500,000",
    image: "/attached_assets/generated_images/white_porsche_featured_listing.png",
    expectedArrival: "Q2 2025",
    slotsAvailable: 3,
    features: ["4.0L Flat-6", "525 HP", "Track-focused suspension"],
  },
  {
    id: "po2",
    name: "BMW XM Label Red",
    expectedPrice: "From LKR 55,500,000",
    image: "/attached_assets/generated_images/silver_bmw_featured_car.png",
    expectedArrival: "Q1 2025",
    slotsAvailable: 5,
    features: ["Hybrid V8", "738 HP", "M Carbon exterior"],
  },
  {
    id: "po3",
    name: "Ferrari SF90 XX Stradale",
    expectedPrice: "From LKR 195,000,000",
    image: "/attached_assets/generated_images/red_ferrari_listing_image.png",
    expectedArrival: "Q3 2025",
    slotsAvailable: 1,
    features: ["V8 Hybrid", "1,016 HP", "Active aero package"],
  },
];

export default function PreOrders() {
  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pre-Order Upcoming Vehicles
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Secure your dream vehicle before it arrives. Our pre-order process
            allows you to reserve exclusive and limited-edition models with a
            refundable deposit. Be among the first to own the latest luxury
            automobiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {preOrderVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="border-silver/20 bg-card/30 backdrop-blur-sm overflow-visible hover-elevate"
              data-testid={`card-preorder-${vehicle.id}`}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full aspect-video object-cover rounded-t-xl"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="outline" className="bg-amber-900/80 text-amber-50 border-amber-400/50 backdrop-blur-md shadow-lg font-semibold px-2 py-1 text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  Pre-Order
                </Badge>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {vehicle.name}
                  </h3>
                  <p className="text-silver-light font-bold">
                    {vehicle.expectedPrice}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    <span>{vehicle.expectedArrival}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" />
                    <span>{vehicle.slotsAvailable} slots left</span>
                  </div>
                </div>

                <ul className="text-sm text-muted-foreground space-y-1">
                  {vehicle.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-silver" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/pre-orders/${vehicle.id}`} className="block mt-6">
                <Button
                  className="w-full bg-silver-light text-background font-medium"
                  data-testid={`button-preorder-${vehicle.id}`}
                >
                  Reserve Now
                </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm
            title="Inquire About Pre-Orders"
            subtitle="Have questions about our pre-order process? Fill out the form and our team will assist you."
          />
        </div>
      </div>
    </main>
  );
}



