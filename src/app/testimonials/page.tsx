import type { Metadata } from "next";
import { getTestimonials, getSiteSettings } from "@/lib/sanity/fetch";
import { mapSanityTestimonial } from "@/lib/sanity/mappers";
import { generateSiteMetadata } from "@/lib/seo";
import TestimonialsClient from "./TestimonialsClient";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Client Stories');
}

export default async function Testimonials() {
  const testimonials = await getTestimonials().catch(() => []);
  const mappedTestimonials = testimonials.map(mapSanityTestimonial);

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Client Stories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our satisfied clients have to say about their experience with us.
            Real stories from real customers who found their perfect vehicle.
          </p>
        </div>

        {mappedTestimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No testimonials available at this time.
            </p>
          </div>
        ) : (
          <TestimonialsClient testimonials={mappedTestimonials} />
        )}
      </div>
    </main>
  );
}

