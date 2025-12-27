"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CalendarDays, AlertCircle } from "lucide-react";
import Link from "next/link";

interface PreOrderVehicle {
  id: string;
  name: string;
  expectedPrice: string;
  image: string;
  expectedArrival: string;
  slotsAvailable: number;
  specifications?: string[];
}

interface PreOrdersClientProps {
  preOrders: PreOrderVehicle[];
}

export default function PreOrdersClient({ preOrders }: PreOrdersClientProps) {
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

        {preOrders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No pre-orders available at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {preOrders.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="border-silver/20 bg-card/30 backdrop-blur-sm overflow-visible hover-elevate flex flex-col h-full"
                data-testid={`card-preorder-${vehicle.id}`}
              >
                <div className="relative overflow-hidden rounded-t-xl flex-shrink-0">
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

                <div className="p-4 flex flex-col flex-1">
                  <div className="space-y-4">
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

                  {vehicle.specifications && vehicle.specifications.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {vehicle.specifications.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-silver" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                  </div>

                  <Link href={`/pre-orders/${vehicle.id}`} className="block mt-auto pt-4">
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
        )}
      </div>
    </main>
  );
}

