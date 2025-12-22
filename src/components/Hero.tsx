"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const heroImages = [
  "/attached_assets/herosection/586715009_17897689899358785_3697776400551218421_n.jpg",
  "/attached_assets/herosection/587268197_17897094195358785_4153201698530653100_n.jpg",
  "/attached_assets/herosection/570344523_122167241792393081_4570727166237788921_n.jpg",
  "/attached_assets/herosection/571024011_122167241864393081_8455205215326805717_n.jpg",
  "/attached_assets/herosection/571176723_122167241906393081_1396844018869898025_n.jpg",
  "/attached_assets/herosection/572029883_122167244354393081_6363529640498285411_n.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Slider Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
      />
        ))}
      </div>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/35 to-black/25 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

      {/* Navigation Arrows - Desktop */}
      {heroImages.length > 1 && (
        <>
          <div className="hidden lg:flex absolute top-1/2 left-4 -translate-y-1/2 z-30">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
              data-testid="button-hero-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="hidden lg:flex absolute top-1/2 right-4 -translate-y-1/2 z-30">
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
              data-testid="button-hero-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-silver/30 bg-white/5 backdrop-blur-sm px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-silver-light" />
          <span className="text-sm text-silver-light tracking-wide">
            Premium Automotive Experience
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Premium Cars.
          <br />
          <span className="text-silver-light">Trusted Deals.</span>
          <br />
          Elite Experience.
        </h1>

        <p className="text-lg sm:text-xl text-silver max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover our exclusive collection of luxury vehicles. Every car curated
          for excellence, every deal crafted for trust.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/vehicles">
            <Button
              size="lg"
              className="bg-silver-light text-background font-semibold tracking-wide px-8 gap-2"
              data-testid="button-browse-vehicles"
            >
              Browse Vehicles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-silver/30 text-white backdrop-blur-sm font-medium tracking-wide px-8"
              data-testid="button-register-interest"
            >
              Register Interest
            </Button>
          </Link>
        </div>
      </div>

      {/* Dots Indicator */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              data-testid={`button-hero-dot-${index}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
