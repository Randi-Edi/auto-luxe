"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CalendarDays,
  AlertCircle,
  Shield,
  FileText,
  TrendingUp,
  CheckCircle2,
  Truck,
  CreditCard,
  Building2,
  Users,
  Package,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { SanityPreOrder, SiteSettings } from "@/lib/sanity/fetch";
import { getWebPImageUrl } from "@/lib/sanity/fetch";

const porscheImage = "/attached_assets/generated_images/white_porsche_featured_listing.png";
const bmwImage = "/attached_assets/generated_images/silver_bmw_featured_car.png";
const ferrariImage = "/attached_assets/generated_images/red_ferrari_listing_image.png";

interface PreOrderVehicle {
  id: string;
  name: string;
  expectedPrice: string;
  image: string;
  expectedArrival: string;
  slotsAvailable: number;
  features: string[];
  deliveryDuration: string;
  personalLC: {
    available: boolean;
    description: string;
    benefits: string[];
  };
  nonPersonalLC: {
    available: boolean;
    description: string;
    benefits: string[];
  };
  warranty: {
    duration: string;
    coverage: string[];
    terms: string;
  };
  financing: {
    available: boolean;
    loanToValue: string;
    maxTenure: string;
    interestRate: string;
    features: string[];
  };
}

const preOrderVehicles: Record<string, PreOrderVehicle> = {
  po1: {
    id: "po1",
    name: "Porsche 911 GT3 RS",
    expectedPrice: "From LKR 67,500,000",
    image: porscheImage,
    expectedArrival: "Q2 2025",
    slotsAvailable: 3,
    features: ["4.0L Flat-6", "525 HP", "Track-focused suspension"],
    deliveryDuration: "8-12 weeks from order confirmation",
    personalLC: {
      available: true,
      description: "Personal Letter of Credit (LC) allows individuals to import vehicles for personal use with simplified documentation.",
      benefits: [
        "Simplified import process for personal use",
        "Lower documentation requirements",
        "Faster processing time (2-3 weeks)",
        "Direct ownership transfer",
        "Suitable for first-time importers",
      ],
    },
    nonPersonalLC: {
      available: true,
      description: "Non-Personal LC is ideal for businesses, companies, or commercial vehicle imports with comprehensive documentation.",
      benefits: [
        "Suitable for commercial/business use",
        "Tax benefits for registered businesses",
        "Bulk import options available",
        "Corporate financing options",
        "Dedicated account manager support",
      ],
    },
    warranty: {
      duration: "2 years or 50,000 km (whichever comes first)",
      coverage: [
        "Engine and transmission",
        "Electrical systems",
        "Air conditioning",
        "Manufacturing defects",
        "Roadside assistance",
        "Free service for first 10,000 km",
      ],
      terms: "Warranty is valid from date of delivery and covers all manufacturing defects. Regular maintenance must be performed at authorized service centers.",
    },
    financing: {
      available: true,
      loanToValue: "Up to 60% of vehicle value",
      maxTenure: "7 years",
      interestRate: "Competitive rates starting from 12% p.a.",
      features: [
        "Flexible repayment options",
        "No hidden charges",
        "Quick approval process (24-48 hours)",
        "Pre-approval available",
        "Partnership with leading banks",
        "Special rates for pre-orders",
      ],
    },
  },
  po2: {
    id: "po2",
    name: "BMW XM Label Red",
    expectedPrice: "From LKR 55,500,000",
    image: bmwImage,
    expectedArrival: "Q1 2025",
    slotsAvailable: 5,
    features: ["Hybrid V8", "738 HP", "M Carbon exterior"],
    deliveryDuration: "6-10 weeks from order confirmation",
    personalLC: {
      available: true,
      description: "Personal Letter of Credit (LC) allows individuals to import vehicles for personal use with simplified documentation.",
      benefits: [
        "Simplified import process for personal use",
        "Lower documentation requirements",
        "Faster processing time (2-3 weeks)",
        "Direct ownership transfer",
        "Suitable for first-time importers",
      ],
    },
    nonPersonalLC: {
      available: true,
      description: "Non-Personal LC is ideal for businesses, companies, or commercial vehicle imports with comprehensive documentation.",
      benefits: [
        "Suitable for commercial/business use",
        "Tax benefits for registered businesses",
        "Bulk import options available",
        "Corporate financing options",
        "Dedicated account manager support",
      ],
    },
    warranty: {
      duration: "3 years or 100,000 km (whichever comes first)",
      coverage: [
        "Engine and transmission",
        "Hybrid battery system",
        "Electrical systems",
        "Air conditioning",
        "Manufacturing defects",
        "Roadside assistance",
        "Free service for first 15,000 km",
      ],
      terms: "Warranty is valid from date of delivery and covers all manufacturing defects. Regular maintenance must be performed at authorized service centers.",
    },
    financing: {
      available: true,
      loanToValue: "Up to 60% of vehicle value",
      maxTenure: "7 years",
      interestRate: "Competitive rates starting from 12% p.a.",
      features: [
        "Flexible repayment options",
        "No hidden charges",
        "Quick approval process (24-48 hours)",
        "Pre-approval available",
        "Partnership with leading banks",
        "Special rates for pre-orders",
      ],
    },
  },
  po3: {
    id: "po3",
    name: "Ferrari SF90 XX Stradale",
    expectedPrice: "From LKR 195,000,000",
    image: ferrariImage,
    expectedArrival: "Q3 2025",
    slotsAvailable: 1,
    features: ["V8 Hybrid", "1,016 HP", "Active aero package"],
    deliveryDuration: "12-16 weeks from order confirmation",
    personalLC: {
      available: true,
      description: "Personal Letter of Credit (LC) allows individuals to import vehicles for personal use with simplified documentation.",
      benefits: [
        "Simplified import process for personal use",
        "Lower documentation requirements",
        "Faster processing time (2-3 weeks)",
        "Direct ownership transfer",
        "Suitable for first-time importers",
      ],
    },
    nonPersonalLC: {
      available: true,
      description: "Non-Personal LC is ideal for businesses, companies, or commercial vehicle imports with comprehensive documentation.",
      benefits: [
        "Suitable for commercial/business use",
        "Tax benefits for registered businesses",
        "Bulk import options available",
        "Corporate financing options",
        "Dedicated account manager support",
      ],
    },
    warranty: {
      duration: "3 years unlimited mileage",
      coverage: [
        "Engine and transmission",
        "Hybrid system",
        "Electrical systems",
        "Carbon fiber components",
        "Manufacturing defects",
        "24/7 concierge service",
        "Free service for first 20,000 km",
        "Track day support",
      ],
      terms: "Comprehensive warranty coverage including track use. Regular maintenance must be performed at authorized Ferrari service centers.",
    },
    financing: {
      available: true,
      loanToValue: "Up to 60% of vehicle value",
      maxTenure: "7 years",
      interestRate: "Competitive rates starting from 12% p.a.",
      features: [
        "Flexible repayment options",
        "No hidden charges",
        "Quick approval process (24-48 hours)",
        "Pre-approval available",
        "Partnership with leading banks",
        "Special rates for pre-orders",
        "Exclusive financing for luxury vehicles",
      ],
    },
  },
};

interface PreOrderDetailClientProps {
  vehicleId: string;
  preOrderData?: SanityPreOrder | null;
  siteSettings?: SiteSettings | null;
}

export default function PreOrderDetailClient({ vehicleId, preOrderData, siteSettings }: PreOrderDetailClientProps) {
  // Use Sanity data if provided, otherwise fall back to static data
  let vehicle: PreOrderVehicle | null = null;
  
  if (preOrderData) {
    // Map Sanity data to component format
    vehicle = {
      id: preOrderData.id || preOrderData._id,
      name: preOrderData.name,
      expectedPrice: preOrderData.expectedPrice,
      image: getWebPImageUrl(preOrderData.image, 1200, 800) || "/placeholder-car.jpg",
      expectedArrival: preOrderData.expectedArrival,
      slotsAvailable: preOrderData.slotsAvailable,
      features: preOrderData.specifications || [],
      deliveryDuration: preOrderData.deliveryDuration?.body || "8-12 weeks from order confirmation",
      personalLC: {
        available: !!preOrderData.personalLCImport,
        description: preOrderData.personalLCImport?.body || "Personal Letter of Credit (LC) allows individuals to import vehicles for personal use with simplified documentation.",
        benefits: preOrderData.personalLCImport?.items || [],
      },
      nonPersonalLC: {
        available: !!preOrderData.nonPersonalLCImport,
        description: preOrderData.nonPersonalLCImport?.body || "Non-Personal LC is ideal for businesses, companies, or commercial vehicle imports with comprehensive documentation.",
        benefits: preOrderData.nonPersonalLCImport?.items || [],
      },
      warranty: {
        duration: preOrderData.warrantyCoverage?.title || "2 years or 50,000 km",
        coverage: preOrderData.warrantyCoverage?.items || [],
        terms: preOrderData.warrantyCoverage?.body || "Warranty is valid from date of delivery and covers all manufacturing defects.",
      },
      financing: {
        available: true,
        loanToValue: "Up to 60% of vehicle value",
        maxTenure: "7 years",
        interestRate: "Competitive rates starting from 12% p.a.",
        features: [
          "Flexible repayment options",
          "No hidden charges",
          "Quick approval process (24-48 hours)",
        ],
      },
    };
  } else {
    // Fallback to static data
    vehicle = vehicleId ? preOrderVehicles[vehicleId] : null;
  }

  useEffect(() => {
    // Scroll to top when component mounts or vehicle changes
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      const mainElement = document.getElementById('preorder-detail-main');
      if (mainElement) {
        mainElement.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };
    
    scrollToTop();
    const timeoutId = setTimeout(scrollToTop, 10);
    
    return () => clearTimeout(timeoutId);
  }, [vehicleId]);

  if (!vehicle) {
    return (
      <main id="preorder-detail-main" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-20">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Pre-Order Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The pre-order you're looking for doesn't exist.
            </p>
            <Link href="/pre-orders">
              <Button className="bg-silver-light text-background">
                Back to Pre-Orders
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="preorder-detail-main" className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/pre-orders" className="hover:text-foreground transition-colors">
            Pre-Orders
          </Link>
          <span>/</span>
          <span className="text-foreground">{vehicle.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full aspect-video object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="outline" className="bg-amber-900/80 text-amber-50 border-amber-400/50 backdrop-blur-md shadow-lg font-semibold px-2 py-1 text-sm">
                <Clock className="h-3 w-3 mr-1" />
                Pre-Order
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {vehicle.name}
              </h1>
              <p className="text-2xl font-bold text-silver-light mb-4">
                {vehicle.expectedPrice}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>Expected: {vehicle.expectedArrival}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>{vehicle.slotsAvailable} slots left</span>
              </div>
            </div>

            <ul className="space-y-2">
              {vehicle.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-silver-light" />
                  {feature}
                </li>
              ))}
            </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <Link href="/contact" className="flex-1">
                 <Button
                   className="w-full bg-silver-light text-background font-medium"
                 >
                   <MessageCircle className="h-4 w-4 mr-2" />
                   Reserve Now
                 </Button>
               </Link>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const phoneNumber = siteSettings?.phone || '+1234567890';
                  const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
                  window.open(`tel:${formattedPhone}`, '_self');
                }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-black"
                onClick={() => {
                  const whatsappNumber = siteSettings?.whatsapp || '1234567890';
                  const formattedWhatsApp = whatsappNumber.replace(/\D/g, '');
                  
                  // Get site URL from settings
                  const siteUrl = siteSettings?.seoSettings?.siteUrl || 
                                 siteSettings?.seoSettings?.canonicalUrl || 
                                 (typeof window !== 'undefined' ? window.location.origin : 'https://www.example.com');
                  
                  // Construct pre-order page URL
                  const preOrderUrl = `${siteUrl}/pre-orders/${vehicleId}`;
                  
                  // Create well-structured message
                  const message = `*Pre-Order Inquiry*

*Vehicle:* ${vehicle.name}
*Expected Price:* ${vehicle.expectedPrice}
*Expected Arrival:* ${vehicle.expectedArrival}
*Slots Available:* ${vehicle.slotsAvailable}

Hi! I'm interested in pre-ordering this vehicle. Please provide more details.

View details: ${preOrderUrl}

Quick Response Appreciated!`;
                  
                  // Encode message properly for WhatsApp URL
                  const whatsappMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/${formattedWhatsApp}?text=${whatsappMessage}`, '_blank');
                }}
              >
                <SiWhatsapp className="h-4 w-4 mr-2 text-black" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Delivery Duration */}
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-silver-light/10">
                <Truck className="h-6 w-6 text-silver-light" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Delivery Duration
                </h3>
                <p className="text-muted-foreground mb-3">
                  {vehicle.deliveryDuration}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-silver-light mt-1.5 flex-shrink-0" />
                    <span>Order confirmation and deposit payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-silver-light mt-1.5 flex-shrink-0" />
                    <span>Vehicle sourcing and procurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-silver-light mt-1.5 flex-shrink-0" />
                    <span>Shipping and customs clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-silver-light mt-1.5 flex-shrink-0" />
                    <span>Final inspection and delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Warranty */}
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-silver-light/10">
                <Shield className="h-6 w-6 text-silver-light" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Warranty Coverage
                </h3>
                <p className="text-sm font-medium text-silver-light mb-2">
                  {vehicle.warranty.duration}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {vehicle.warranty.terms}
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {vehicle.warranty.coverage.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-silver-light mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* LC Import Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Personal LC */}
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-silver-light/10">
                <Users className="h-6 w-6 text-silver-light" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Personal LC Import
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {vehicle.personalLC.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {vehicle.personalLC.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-silver-light mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Non-Personal LC */}
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-silver-light/10">
                <Building2 className="h-6 w-6 text-silver-light" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Non-Personal LC Import
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {vehicle.nonPersonalLC.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {vehicle.nonPersonalLC.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-silver-light mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Financing Options */}
        <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-silver-light/10">
              <CreditCard className="h-6 w-6 text-silver-light" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Lease & Loan Arrangement
              </h3>
              {vehicle.financing.available ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-background/50">
                      <p className="text-xs text-muted-foreground mb-1">Loan-to-Value</p>
                      <p className="text-lg font-semibold text-foreground">{vehicle.financing.loanToValue}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50">
                      <p className="text-xs text-muted-foreground mb-1">Max Tenure</p>
                      <p className="text-lg font-semibold text-foreground">{vehicle.financing.maxTenure}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50">
                      <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                      <p className="text-lg font-semibold text-foreground">{vehicle.financing.interestRate}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {vehicle.financing.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-silver-light mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-muted-foreground mb-2">
                      <strong>Note:</strong> Loan-to-Value (LTV) ratios are subject to Central Bank of Sri Lanka regulations. 
                      Maximum LTV is 60% for motor cars, SUVs, and vans as per current regulations.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Financing options available upon request. Please contact us for details.</p>
              )}
            </div>
          </div>
        </Card>

        {/* Additional Services */}
        <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-silver-light/10">
              <Package className="h-6 w-6 text-silver-light" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Additional Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-silver-light" />
                    Documentation Support
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete assistance with import documentation, LC processing, and customs clearance.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-silver-light" />
                    Vehicle Registration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    End-to-end registration support including number plate allocation and insurance setup.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-silver-light" />
                    Extended Warranty
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Optional extended warranty plans available for additional peace of mind.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-silver-light" />
                    Delivery & Setup
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Door-to-door delivery service with initial setup and orientation included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

