"use client";

import React, { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

// Fallback content if Sanity data is not available
const fallbackSection = {
  label: "Premium Automotive Experience",
  mainTitle: "Premium Cars.\nTrusted Deals.\nElite Experience.",
  subtitle: "Discover our exclusive collection of luxury vehicles. Every car curated for excellence, every deal crafted for trust.",
};

const fallbackImages = [
  {
    image: "/attached_assets/herosection/586715009_17897689899358785_3697776400551218421_n.jpg",
    alt: "Hero image",
  },
];

interface HeroImage {
  image: string;
  alt?: string;
}

interface HeroSection {
  label?: string;
  mainTitle: string;
  subtitle?: string;
}

interface HeroProps {
  section?: HeroSection | null;
  images?: HeroImage[];
}

export default function Hero({ 
  section = fallbackSection, 
  images = fallbackImages 
}: HeroProps) {
  // Use fallback if no section provided
  const heroSection = section || fallbackSection;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      duration: 35, 
      dragFree: false,
      align: 'start',
      containScroll: 'trimSnaps',
      skipSnaps: false,
    }
  );

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroOffset, setHeroOffset] = useState(0);

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

  // Parallax scroll effect
  useEffect(() => {
    let ticking = false;
    const heroSectionRef = document.querySelector('section[class*="min-h-[85vh]"]');
    
    const updateParallax = () => {
      if (!heroSectionRef) return;
      
      const currentScrollY = window.scrollY;
      const rect = heroSectionRef.getBoundingClientRect();
      const heroTop = rect.top + currentScrollY;
      
      setScrollY(currentScrollY);
      setHeroOffset(heroTop);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial calculation
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate parallax transform
  const calculateParallax = () => {
    if (heroOffset === 0 || scrollY < heroOffset) return 0;
    
    const scrollProgress = scrollY - heroOffset;
    // Move content upward slowly (0.25x scroll speed for smooth parallax effect)
    // Only apply parallax while hero section is in view
    const parallaxValue = -scrollProgress * 0.25;
    
    // Limit the parallax effect to prevent content from moving too far
    return Math.max(parallaxValue, -200); // Max 200px upward movement
  };

  const parallaxTransform = calculateParallax();

  if (images.length === 0) return null;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Slider Container */}
      <div className="embla absolute inset-0 z-0" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((img, index) => (
          <div
            key={index}
              className="embla__slide flex-[0_0_100%] min-w-0 h-full"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: `url(${img.image})` }}
                role="img"
                aria-label={img.alt || `Hero image ${index + 1}`}
      />
            </div>
        ))}
        </div>
      </div>

      {/* Overlay Gradients - Allow pointer events to pass through to carousel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/35 to-black/25 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />

      {/* Navigation Arrows - Desktop */}
      {images.length > 1 && (
        <>
          <div className="hidden lg:flex absolute top-1/2 left-4 -translate-y-1/2 z-30 pointer-events-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
              data-testid="button-hero-prev"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          <div className="hidden lg:flex absolute top-1/2 right-4 -translate-y-1/2 z-30 pointer-events-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
              data-testid="button-hero-next"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </>
      )}

      {/* Content - Allow pointer events for buttons but not for dragging */}
      <div 
        className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center pointer-events-auto transition-transform duration-75 ease-out"
        style={{ 
          transform: `translateY(${parallaxTransform}px)`,
          willChange: 'transform'
        }}
      >
        {heroSection.label && (
        <div className="inline-flex items-center gap-2 rounded-full border border-silver/30 bg-white/5 backdrop-blur-sm px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-silver-light" />
          <span className="text-sm text-silver-light tracking-wide">
              {heroSection.label}
          </span>
        </div>
        )}

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight whitespace-pre-line">
          {heroSection.mainTitle}
        </h1>

        {heroSection.subtitle && (
        <p className="text-lg sm:text-xl text-silver max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSection.subtitle}
        </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/vehicles">
            <Button
              size="lg"
              className="bg-silver-light text-background font-semibold tracking-wide px-8 gap-2"
              data-testid="button-browse-vehicles"
            >
              Browse Vehicles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 pointer-events-auto">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              data-testid={`button-hero-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        .embla {
          overflow: hidden;
          width: 100%;
          height: 100%;
          touch-action: pan-y pinch-zoom;
        }
        .embla__container {
          display: flex;
          touch-action: pan-x;
          height: 100%;
          will-change: transform;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          position: relative;
          height: 100%;
          touch-action: pan-x;
        }
      `}</style>
    </section>
  );
}
