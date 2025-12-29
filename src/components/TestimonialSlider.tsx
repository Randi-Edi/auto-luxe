"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

interface Testimonial {
  id: string;
  name: string;
  image: string;
  message: string;
}

// Fallback testimonials if Sanity data is not available
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Mitchell",
    image: "/img/1.jpg",
    message:
      "Ganegoda International exceeded all my expectations. The team's professionalism and attention to detail made purchasing my dream car an absolute pleasure. Highly recommended!",
  },
  {
    id: "2",
    name: "Sarah Williams",
    image: "/img/2.jpg",
    message:
      "Impeccable service from start to finish. They sourced the exact specification I wanted and handled everything seamlessly. A truly premium experience.",
  },
  {
    id: "3",
    name: "Michael Chen",
    image: "/img/3.jpg",
    message:
      "The transparency and trustworthiness I experienced here is unmatched. They've earned a customer for life. My third purchase and still outstanding.",
  },
];

interface TestimonialSliderProps {
  testimonials?: Testimonial[];
}

export default function TestimonialSlider({ testimonials = fallbackTestimonials }: TestimonialSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 35,
    axis: 'x',
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);

  const current = testimonials[selectedIndex] || testimonials[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground mb-6">
            Trusted by discerning buyers across the region
          </p>
        </div>

        <div className="relative">
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm overflow-hidden">
            {/* View More Button - Fixed Top Right Corner */}
            {testimonials.length > 1 && (
              <div className="absolute top-6 right-6 z-30 pointer-events-auto">
                <Link href="/testimonials">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-silver/30 gap-2 bg-background/80 backdrop-blur-sm relative animate-pulse-ring overflow-visible"
                    data-testid="button-view-more-testimonials"
                  >
                    <span className="relative z-10">View More Client Stories</span>
                    <ArrowRight className="h-4 w-4 relative z-10" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            )}
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="embla__slide flex-[0_0_100%] min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden bg-black/50 flex items-center justify-center">
                <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center p-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain transition-opacity duration-700"
                    style={{ 
                      maxHeight: '85vh',
                      maxWidth: '100%',
                      height: 'auto',
                      width: 'auto'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full border-2 border-white/30 overflow-hidden bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                                {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                              <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 sm:p-12 flex flex-col justify-center min-h-[300px] lg:min-h-0">
                <Quote className="h-12 w-12 text-silver/30 mb-6" />
                <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 italic">
                          "{testimonial.message}"
                </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                
                {/* Navigation dots for mobile */}
            <div className="lg:hidden flex items-center justify-center gap-4 p-6">
                  <Button
                    variant="outline"
                    size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                    className="border-silver/30"
                    data-testid="button-testimonial-prev"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </Button>

                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-2 rounded-full transition-all ${
                      index === selectedIndex
                            ? "w-6 bg-silver-light"
                            : "w-2 bg-silver/30"
                        }`}
                        data-testid={`button-testimonial-dot-${index}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                    className="border-silver/30"
                    data-testid="button-testimonial-next"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
            </div>

            {/* Navigation for desktop - positioned on image */}
            <div className="hidden lg:flex absolute top-1/2 left-4 -translate-y-1/2 z-20">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
                data-testid="button-testimonial-prev"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <div className="hidden lg:flex absolute top-1/2 right-4 -translate-y-1/2 z-20">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
                data-testid="button-testimonial-next"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            {/* Dots indicator for desktop */}
            <div className="hidden lg:flex absolute bottom-6 right-6 z-20 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
          touch-action: pan-x;
        }
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          touch-action: pan-y;
        }
      `}</style>
    </section>
  );
}
