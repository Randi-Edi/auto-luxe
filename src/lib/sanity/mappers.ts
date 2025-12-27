import type { Vehicle, VehicleStatus } from "@/components/VehicleCard";
import type { 
  SanityVehicle, 
  SanityTestimonial, 
  SanityFAQ, 
  SanityPreOrder, 
  HeroSection,
  HeroImage,
  SanityFeature 
} from "./fetch";
import { getWebPImageUrl } from "./fetch";

export function mapSanityVehicleToVehicle(sanityVehicle: SanityVehicle): Vehicle {
  // Ensure status is valid, default to 'used' if invalid or missing
  const validStatuses: VehicleStatus[] = ['new', 'used', 'reserved', 'sold']
  const status = validStatuses.includes(sanityVehicle.status as VehicleStatus) 
    ? (sanityVehicle.status as VehicleStatus)
    : 'used'
  
  // Handle slug - it can be an object with current property or a string
  // The query returns "slug": slug.current which should be a string
  let slug: string | undefined;
  if (typeof sanityVehicle.slug === 'string') {
    slug = sanityVehicle.slug;
  } else if (sanityVehicle.slug && typeof sanityVehicle.slug === 'object' && 'current' in sanityVehicle.slug) {
    slug = sanityVehicle.slug.current;
  }
  
  // If slug is missing or empty, log a warning (but don't break the app)
  if (!slug || slug.trim() === '') {
    console.warn(`⚠️ Vehicle "${sanityVehicle.name}" (ID: ${sanityVehicle.id || sanityVehicle._id}) is missing a slug. Please regenerate the slug in Sanity Studio.`);
  }
  
  return {
    id: sanityVehicle.id || sanityVehicle._id,
    slug: slug || undefined, // Include slug for SEO-friendly URLs, fallback to undefined
    name: sanityVehicle.name || 'Unnamed Vehicle',
    price: sanityVehicle.price || 0,
    image: getWebPImageUrl(sanityVehicle.mainImage, 800, 600) || "/placeholder-car.jpg",
    year: sanityVehicle.year || new Date().getFullYear(),
    mileage: sanityVehicle.mileage || 0,
    fuel: sanityVehicle.fuel || 'N/A',
    transmission: sanityVehicle.transmission || 'N/A',
    status,
    brand: sanityVehicle.brand || undefined, // Include brand for filtering
  };
}

export function mapSanityTestimonial(sanityTestimonial: SanityTestimonial) {
  return {
    id: sanityTestimonial._id,
    name: sanityTestimonial.name,
    // Use WebP format but maintain original size (no width/height parameters)
    image: getWebPImageUrl(sanityTestimonial.image) || "/placeholder-person.jpg",
    message: sanityTestimonial.message,
  };
}

export function mapSanityFAQ(sanityFAQ: SanityFAQ) {
  return {
    question: sanityFAQ.question,
    answer: sanityFAQ.answer,
  };
}

export function mapSanityPreOrder(sanityPreOrder: SanityPreOrder) {
  return {
    id: sanityPreOrder.id || sanityPreOrder._id,
    name: sanityPreOrder.name,
    expectedPrice: sanityPreOrder.expectedPrice,
    image: getWebPImageUrl(sanityPreOrder.image, 800, 600) || "/placeholder-car.jpg",
    expectedArrival: sanityPreOrder.expectedArrival,
    slotsAvailable: sanityPreOrder.slotsAvailable,
    specifications: sanityPreOrder.specifications || [],
    deliveryDuration: sanityPreOrder.deliveryDuration,
    warrantyCoverage: sanityPreOrder.warrantyCoverage,
    personalLCImport: sanityPreOrder.personalLCImport,
    nonPersonalLCImport: sanityPreOrder.nonPersonalLCImport,
  };
}

export function mapSanityFeature(sanityFeature: SanityFeature) {
  return {
    title: sanityFeature.title,
    description: sanityFeature.description,
    icon: sanityFeature.icon,
  };
}

export function mapHeroSection(section: HeroSection | null) {
  if (!section) return null;
  return {
    label: section.label,
    mainTitle: section.mainTitle,
    subtitle: section.subtitle,
  };
}

export function mapHeroImage(image: HeroImage) {
  return {
    image: getWebPImageUrl(image.image, 1920, 1080),
    alt: image.alt || 'Hero image',
  };
}

