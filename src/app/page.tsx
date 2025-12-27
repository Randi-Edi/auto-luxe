import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import FeaturedListings from "@/components/FeaturedListings";
import BrandLogos from "@/components/BrandLogos";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import {
  getHeroSection,
  getHeroImages,
  getReservedVehicles,
  getPopularVehicles,
  getFeaturedVehicles,
  getTestimonialsLimit,
  getFeatures,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { 
  mapHeroSection,
  mapHeroImage,
  mapSanityVehicleToVehicle, 
  mapSanityTestimonial, 
  mapSanityFeature 
} from "@/lib/sanity/mappers";
import { generateSiteMetadata } from "@/lib/seo";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Home');
}

export default async function Home() {
  // Fetch data from Sanity at build time
  const [heroSection, heroImages, reservedVehicles, popularVehicles, featuredVehicles, testimonials, features] = await Promise.all([
    getHeroSection().catch(() => null),
    getHeroImages().catch(() => []),
    getReservedVehicles().catch(() => []),
    getPopularVehicles().catch(() => []),
    getFeaturedVehicles().catch(() => []),
    getTestimonialsLimit(3).catch(() => []), // Fetch only top 3 most recent testimonials for home page
    getFeatures().catch(() => []),
  ]);

  return (
    <main>
      <Hero 
        section={mapHeroSection(heroSection)} 
        images={heroImages.map(mapHeroImage)} 
      />
      {testimonials.length > 0 && (
        <TestimonialSlider testimonials={testimonials.map(mapSanityTestimonial)} />
      )}
      {reservedVehicles.length > 0 && (
        <FeaturedListings
          title="Reserved Listings"
          subtitle="These exclusive vehicles have been reserved by our clients"
          vehicles={reservedVehicles.map(mapSanityVehicleToVehicle)}
          showViewAll={false}
          gridCols="lg:grid-cols-3"
        />
      )}
      {featuredVehicles.length > 0 && (
        <FeaturedListings vehicles={featuredVehicles.map(mapSanityVehicleToVehicle)} />
      )}
      {popularVehicles.length > 0 && (
      <FeaturedListings
        title="Popular Listings"
        subtitle="Most viewed vehicles this month"
          vehicles={popularVehicles.map(mapSanityVehicleToVehicle)}
      />
      )}
      <BrandLogos />
      {features.length > 0 && (
        <WhyChooseUs features={features.map(mapSanityFeature)} />
      )}
      <Newsletter />
    </main>
  );
}



