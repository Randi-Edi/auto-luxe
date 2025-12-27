import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  _id,
  title,
  description,
  "logo": logo.asset->url,
  phone,
  whatsapp,
  email,
  address,
  locationPlusCode,
  businessHours,
  footerHeading,
  footerDescription,
  seoSettings {
    metaTitle,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url,
    ogTitle,
    ogDescription,
    twitterCard,
    twitterSite,
    siteUrl,
    canonicalUrl
  },
  socialLinks[] | order(order asc, _createdAt desc) {
    platform,
    url,
    label,
    order
  }
}`

// Hero Section Settings
export const heroSectionQuery = groq`*[_type == "heroSection"][0] {
  _id,
  label,
  mainTitle,
  subtitle
}`

// Hero Images
export const heroImagesQuery = groq`*[_type == "heroImage"] | order(order asc, _createdAt desc) {
  _id,
  "image": image.asset->url,
  order,
  alt
}`

// Vehicle queries
export const vehiclesQuery = groq`*[_type == "vehicle"] | order(_createdAt desc) {
  _id,
  id,
  name,
  "slug": slug.current,
  price,
  "mainImage": mainImage.asset->url,
  "images": images[].asset->url,
  brand,
  model,
  year,
  mileage,
  engine,
  fuel,
  transmission,
  driveType,
  condition,
  color,
  status,
  description,
  features,
  featured,
  popular,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url
  }
}`

export const vehicleByIdOrSlugQuery = groq`*[_type == "vehicle" && (id == $identifier || _id == $identifier || slug.current == $identifier)][0] {
  _id,
  id,
  name,
  "slug": slug.current,
  price,
  "mainImage": mainImage.asset->url,
  "images": images[].asset->url,
  brand,
  model,
  year,
  mileage,
  engine,
  fuel,
  transmission,
  driveType,
  condition,
  color,
  status,
  description,
  features,
  featured,
  popular,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url
  }
}`

export const reservedVehiclesQuery = groq`*[_type == "vehicle" && status == "reserved"] | order(_createdAt desc) {
  _id,
  id,
  name,
  "slug": slug.current,
  price,
  "mainImage": mainImage.asset->url,
  brand,
  model,
  year,
  mileage,
  fuel,
  transmission,
  status
}`

export const featuredVehiclesQuery = groq`*[_type == "vehicle" && featured == true] | order(_createdAt desc) {
  _id,
  id,
  name,
  "slug": slug.current,
  price,
  "mainImage": mainImage.asset->url,
  brand,
  model,
  year,
  mileage,
  fuel,
  transmission,
  status
}`

export const popularVehiclesQuery = groq`*[_type == "vehicle" && popular == true] | order(_createdAt desc) {
  _id,
  id,
  name,
  "slug": slug.current,
  price,
  "mainImage": mainImage.asset->url,
  brand,
  model,
  year,
  mileage,
  fuel,
  transmission,
  status
}`

// Testimonial queries
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  name,
  "image": image.asset->url,
  message,
  order
}`

// Testimonial query for home page - top 3 most recent
export const testimonialsLimitQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) [0...3] {
  _id,
  name,
  "image": image.asset->url,
  message,
  order
}`

// FAQ queries
export const faqsQuery = groq`*[_type == "faq"] | order(order asc, _createdAt desc) {
  _id,
  question,
  answer,
  order
}`

// Pre-order queries
export const preOrdersQuery = groq`*[_type == "preOrder"] | order(_createdAt desc) {
  _id,
  id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  expectedPrice,
  expectedArrival,
  slotsAvailable,
  specifications,
  deliveryDuration,
  warrantyCoverage,
  personalLCImport,
  nonPersonalLCImport,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url
  }
}`

export const preOrderByIdQuery = groq`*[_type == "preOrder" && (id == $identifier || _id == $identifier || slug.current == $identifier)][0] {
  _id,
  id,
  name,
  "slug": slug.current,
  "image": image.asset->url,
  expectedPrice,
  expectedArrival,
  slotsAvailable,
  specifications,
  deliveryDuration,
  warrantyCoverage,
  personalLCImport,
  nonPersonalLCImport,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url
  }
}`

// Features query
export const featuresQuery = groq`*[_type == "feature"] | order(order asc, _createdAt desc) {
  _id,
  title,
  description,
  icon,
  order
}`

