"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  image: string;
  message: string;
}

// todo: remove mock functionality
const testimonials: Testimonial[] = [
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

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Trusted by discerning buyers across the region
          </p>
        </div>

        <div className="relative">
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-auto min-h-[400px] overflow-hidden bg-black/50 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="max-w-full max-h-full object-contain transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full border-2 border-white/30 overflow-hidden bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {current.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{current.name}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <Quote className="h-12 w-12 text-silver/30 mb-6" />
                <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 italic">
                  "{current.message}"
                </p>
                
                {/* Navigation dots for mobile */}
                <div className="lg:hidden flex items-center justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="border-silver/30"
                    data-testid="button-testimonial-prev"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "w-6 bg-silver-light"
                            : "w-2 bg-silver/30"
                        }`}
                        data-testid={`button-testimonial-dot-${index}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="border-silver/30"
                    data-testid="button-testimonial-next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation for desktop - positioned on image */}
            <div className="hidden lg:flex absolute top-1/2 left-4 -translate-y-1/2 z-20">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="hidden lg:flex absolute top-1/2 right-4 -translate-y-1/2 z-20">
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Dots indicator for desktop */}
            <div className="hidden lg:flex absolute bottom-6 right-6 z-20 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
