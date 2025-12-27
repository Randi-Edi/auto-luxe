"use client"

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Cog,
  CheckCircle2,
  Palette,
  Car,
  Hash,
  Zap,
  Check,
  Shield,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import VehicleCard, { type Vehicle, type VehicleStatus } from "@/components/VehicleCard";
import VehicleQuickView from "@/components/VehicleQuickView";
import { formatLKRPrice } from "@/lib/utils";
import type { SanityVehicle, SiteSettings } from "@/lib/sanity/fetch";
import { getWebPImageUrl } from "@/lib/sanity/fetch";

// BMW 520d images
const bmw520Img1 = "/attached_assets/bmw 520/587696355_17897336799358785_4107318543107151809_n.jpg";
const bmw520Img2 = "/attached_assets/bmw 520/587784502_17897336790358785_2137194063975737135_n.jpg";
const bmw520Img3 = "/attached_assets/bmw 520/587482278_17897336811358785_3306999039710423867_n.jpg";
const bmw520Img4 = "/attached_assets/bmw 520/587526678_17897336823358785_115106508505143036_n.jpg";
const bmw520Img5 = "/attached_assets/bmw 520/587269174_17897336835358785_337059854361721955_n.jpg";
const bmw520Img6 = "/attached_assets/bmw 520/587289213_17897336745358785_639032221655728907_n.jpg";
const bmw520Img7 = "/attached_assets/bmw 520/583372529_17897336847358785_2892935155945060738_n.jpg";

// BMW X1 images
const bmwx1Img1 = "/attached_assets/bmw x1/588643803_17897103972358785_8451583355893606700_n.jpg";
const bmwx1Img2 = "/attached_assets/bmw x1/590805737_17897103927358785_1428913955565683864_n.jpg";
const bmwx1Img3 = "/attached_assets/bmw x1/587736899_17897103936358785_5125329280501645134_n.jpg";
const bmwx1Img4 = "/attached_assets/bmw x1/587532286_17897103945358785_7191245372845849751_n.jpg";
const bmwx1Img5 = "/attached_assets/bmw x1/587709073_17897103903358785_2090016341811296491_n.jpg";
const bmwx1Img6 = "/attached_assets/bmw x1/586685431_17897103963358785_1492980192427629308_n.jpg";
const bmwx1Img7 = "/attached_assets/bmw x1/586693378_17897103954358785_3409910725318712106_n.jpg";

// Honda Civic Blue images
const civicBlueImg1 = "/attached_assets/civic blue/589024052_17897699316358785_5286289233685487724_n.jpg";
const civicBlueImg2 = "/attached_assets/civic blue/589029318_17897699346358785_3174029806230671571_n.jpg";
const civicBlueImg3 = "/attached_assets/civic blue/587397200_17897699355358785_2860668314763354146_n.jpg";
const civicBlueImg4 = "/attached_assets/civic blue/588693464_17897699364358785_824906651347750478_n.jpg";
const civicBlueImg5 = "/attached_assets/civic blue/586658177_17897699307358785_8464347707954246422_n.jpg";
const civicBlueImg6 = "/attached_assets/civic blue/586662971_17897699331358785_8964949317185758948_n.jpg";
const civicBlueImg7 = "/attached_assets/civic blue/586648425_17897699334358785_8079320902656927061_n.jpg";
const civicBlueImg8 = "/attached_assets/civic blue/582621021_17897699373358785_6837085664507725986_n.jpg";

// Honda Civic images
const civic1Img1 = "/attached_assets/civic 1/590941900_17896921617358785_7108838582922432010_n.jpg";
const civic1Img2 = "/attached_assets/civic 1/589905012_17896921662358785_8556536656215800480_n.jpg";
const civic1Img3 = "/attached_assets/civic 1/590471462_17896921608358785_5149885348244078978_n.jpg";
const civic1Img4 = "/attached_assets/civic 1/589572254_17896921635358785_4749735933401085487_n.jpg";
const civic1Img5 = "/attached_assets/civic 1/589842571_17896921626358785_2663499070135081046_n.jpg";
const civic1Img6 = "/attached_assets/civic 1/589277658_17896921644358785_6675299247215251962_n.jpg";
const civic1Img7 = "/attached_assets/civic 1/587692594_17896921596358785_2437517119616989800_n.jpg";
const civic1Img8 = "/attached_assets/civic 1/587784786_17896921653358785_3047903948927233338_n.jpg";

// Honda City images
const hondaCityImg1 = "/attached_assets/honda city/588650776_17897700795358785_1331596431631181195_n.jpg";
const hondaCityImg2 = "/attached_assets/honda city/588003787_17897700831358785_5748966227820155848_n.jpg";
const hondaCityImg3 = "/attached_assets/honda city/587269253_17897700840358785_1397499229604696570_n.jpg";
const hondaCityImg4 = "/attached_assets/honda city/587504997_17897700804358785_2070649042313841372_n.jpg";
const hondaCityImg5 = "/attached_assets/honda city/587812907_17897700813358785_8002316546722454848_n.jpg";
const hondaCityImg6 = "/attached_assets/honda city/582425362_17897700852358785_1253765072500358700_n.jpg";
const hondaCityImg7 = "/attached_assets/honda city/584935876_17897700822358785_8643955748794081647_n.jpg";
const hondaCityImg8 = "/attached_assets/honda city/586680240_17897700774358785_3582335393338178036_n.jpg";

// Suzuki Swift images
const swiftImg1 = "/attached_assets/swift/589070700_17897578743358785_7473685017664571608_n.jpg";
const swiftImg2 = "/attached_assets/swift/587466900_17897578698358785_7819426585963599361_n.jpg";
const swiftImg3 = "/attached_assets/swift/587549065_17897578734358785_5514846744748162847_n.jpg";
const swiftImg4 = "/attached_assets/swift/588761244_17897578752358785_714571199367342998_n.jpg";
const swiftImg5 = "/attached_assets/swift/587291720_17897578716358785_8157638521378417557_n.jpg";
const swiftImg6 = "/attached_assets/swift/587433025_17897578689358785_1372673311826865124_n.jpg";
const swiftImg7 = "/attached_assets/swift/586671434_17897578677358785_4769592023165144079_n.jpg";
const swiftImg8 = "/attached_assets/swift/586671438_17897578725358785_1624682145549150516_n.jpg";

// Honda Vezel images
const vezelImg1 = "/attached_assets/vezel/590909875_17897840340358785_7490299254087544074_n.jpg";
const vezelImg2 = "/attached_assets/vezel/588164486_17897840331358785_740935442716552620_n.jpg";
const vezelImg3 = "/attached_assets/vezel/586717937_17897840364358785_3341107576596442477_n.jpg";
const vezelImg4 = "/attached_assets/vezel/586708966_17897840367358785_6111148903954959717_n.jpg";
const vezelImg5 = "/attached_assets/vezel/586652433_17897840421358785_7470974154199820629_n.jpg";
const vezelImg6 = "/attached_assets/vezel/586652433_17897840388358785_6496418977159818525_n.jpg";

const statusConfig: Record<VehicleStatus, { label: string; className: string }> = {
  new: { label: "Available", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  used: { label: "Available", className: "bg-black/70 text-white border-white/40 backdrop-blur-md shadow-lg" },
  reserved: { label: "Reserved", className: "bg-amber-900/80 text-amber-50 border-amber-400/50 backdrop-blur-md shadow-lg" },
  sold: { label: "Sold", className: "bg-slate-900/80 text-slate-200 border-slate-400/50 backdrop-blur-md shadow-lg" },
};

interface VehicleDetails {
  brand: string;
  model: string;
  engine: string;
  driveType: string;
  color: string;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  condition?: string;
}

const vehicleDetailsMap: Record<string, VehicleDetails> = {
  "f1": {
    brand: "BMW",
    model: "520d",
    engine: "2.0L Turbo Diesel I4",
    driveType: "RWD",
    color: "Mineral Grey Metallic",
    vin: "WBA5A5C50ED******",
    description: `Experience luxury and performance in this exceptional BMW 520d. This premium sedan combines elegant design with impressive fuel efficiency and powerful performance.

The 2.0-liter turbocharged diesel engine delivers excellent torque and fuel economy, making it perfect for both city driving and long journeys. The 8-speed automatic transmission ensures smooth gear changes, while the rear-wheel-drive system provides a dynamic driving experience.

Inside, you'll find a sophisticated interior featuring premium leather upholstery, heated seats, BMW's iDrive infotainment system with a large touchscreen display, and advanced driver assistance systems. The spacious cabin offers exceptional comfort for all passengers.

This vehicle has been meticulously maintained and comes with a comprehensive service history. It represents an excellent opportunity to own a premium German sedan that combines luxury, performance, and efficiency.`,
    features: [
      "BMW iDrive Infotainment System",
      "Navigation System",
      "Leather Upholstery",
      "Heated Front Seats",
      "Parking Sensors",
      "Rear View Camera",
      "LED Headlights",
      "Cruise Control",
      "Bluetooth Connectivity",
      "USB Ports",
      "Climate Control",
      "Keyless Entry",
    ],
    images: [bmw520Img1, bmw520Img2, bmw520Img3, bmw520Img4, bmw520Img5, bmw520Img6, bmw520Img7],
  },
  "f2": {
    brand: "BMW",
    model: "X1",
    engine: "2.0L Turbo Petrol I4",
    driveType: "FWD",
    color: "Alpine White",
    vin: "WBAFR9C50DD******",
    description: `Discover the perfect blend of versatility and luxury in this BMW X1. This compact SUV offers exceptional practicality without compromising on style or performance.

The 2.0-liter turbocharged petrol engine provides responsive acceleration and smooth power delivery. The 8-speed automatic transmission ensures seamless gear changes, while the front-wheel-drive system offers excellent traction and fuel efficiency.

The interior features premium materials, comfortable seating for five, and BMW's latest infotainment system with smartphone integration. The flexible cargo space makes it perfect for daily commutes and weekend adventures alike.

This well-maintained vehicle comes with a complete service history and represents an excellent value in the premium compact SUV segment.`,
    features: [
      "BMW iDrive System",
      "Apple CarPlay & Android Auto",
      "Panoramic Sunroof",
      "Leather Seats",
      "Parking Assistant",
      "Rear View Camera",
      "LED Daytime Running Lights",
      "Cruise Control",
      "Bluetooth Audio",
      "USB Charging Ports",
      "Dual Zone Climate Control",
      "Keyless Start",
    ],
    images: [bmwx1Img1, bmwx1Img2, bmwx1Img3, bmwx1Img4, bmwx1Img5, bmwx1Img6, bmwx1Img7],
  },
  "f3": {
    brand: "Honda",
    model: "Civic",
    engine: "1.5L Turbo Petrol I4",
    driveType: "FWD",
    color: "Aegean Blue Metallic",
    vin: "19XFC2F59ME******",
    description: `Experience the perfect combination of style, performance, and reliability in this stunning Honda Civic. This sporty sedan delivers an engaging driving experience with excellent fuel economy.

The 1.5-liter turbocharged petrol engine provides impressive power and torque, making every drive exciting. The CVT automatic transmission ensures smooth acceleration and optimal fuel efficiency. The front-wheel-drive system offers excellent handling and stability.

Inside, you'll find a modern interior with comfortable seating, Honda's intuitive infotainment system, and advanced safety features. The spacious cabin and generous trunk space make it perfect for families and daily use.

This well-maintained vehicle comes with a complete service history and represents excellent value in the compact sedan segment.`,
    features: [
      "Honda Sensing Safety Suite",
      "Apple CarPlay & Android Auto",
      "7-inch Touchscreen Display",
      "Honda LaneWatch",
      "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "Road Departure Mitigation",
      "LED Headlights",
      "Push Button Start",
      "Remote Engine Start",
      "Dual Zone Climate Control",
      "Heated Front Seats",
    ],
    images: [civicBlueImg1, civicBlueImg2, civicBlueImg3, civicBlueImg4, civicBlueImg5, civicBlueImg6, civicBlueImg7, civicBlueImg8],
  },
  "f4": {
    brand: "Honda",
    model: "Vezel",
    engine: "1.5L Hybrid I4",
    driveType: "FWD",
    color: "Platinum White Pearl",
    vin: "JHMZD1F50KC******",
    description: `Discover exceptional fuel efficiency and versatility in this Honda Vezel hybrid. This compact SUV combines the best of both worlds with its efficient hybrid powertrain and practical design.

The 1.5-liter hybrid engine delivers excellent fuel economy while providing smooth and responsive performance. The e-CVT transmission ensures seamless power delivery, and the front-wheel-drive system offers excellent traction and efficiency.

The interior features modern design with comfortable seating, Honda's infotainment system, and advanced safety technologies. The flexible cargo space and versatile seating make it perfect for urban driving and weekend getaways.

This well-maintained hybrid vehicle comes with a complete service history and represents an excellent choice for eco-conscious drivers seeking reliability and efficiency.`,
    features: [
      "Honda Sensing Safety Suite",
      "Apple CarPlay & Android Auto",
      "7-inch Display Audio",
      "Honda LaneWatch",
      "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "Lane Keeping Assist",
      "LED Headlights",
      "Push Button Start",
      "Smart Entry System",
      "Climate Control",
      "Rear View Camera",
    ],
    images: [vezelImg1, vezelImg2, vezelImg3, vezelImg4, vezelImg5, vezelImg6],
  },
  "p1": {
    brand: "Honda",
    model: "Civic",
    engine: "1.5L Turbo Petrol I4",
    driveType: "FWD",
    color: "Rallye Red",
    vin: "19XFC2F59ME******",
    description: `Experience the perfect combination of style, performance, and reliability in this stunning Honda Civic. This sporty sedan delivers an engaging driving experience with excellent fuel economy.

The 1.5-liter turbocharged petrol engine provides impressive power and torque, making every drive exciting. The CVT automatic transmission ensures smooth acceleration and optimal fuel efficiency. The front-wheel-drive system offers excellent handling and stability.

Inside, you'll find a modern interior with comfortable seating, Honda's intuitive infotainment system, and advanced safety features. The spacious cabin and generous trunk space make it perfect for families and daily use.

This well-maintained vehicle comes with a complete service history and represents excellent value in the compact sedan segment.`,
    features: [
      "Honda Sensing Safety Suite",
      "Apple CarPlay & Android Auto",
      "7-inch Touchscreen Display",
      "Honda LaneWatch",
      "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "Road Departure Mitigation",
      "LED Headlights",
      "Push Button Start",
      "Remote Engine Start",
      "Dual Zone Climate Control",
      "Heated Front Seats",
    ],
    images: [civic1Img1, civic1Img2, civic1Img3, civic1Img4, civic1Img5, civic1Img6, civic1Img7, civic1Img8],
  },
  "p2": {
    brand: "Honda",
    model: "City",
    engine: "1.5L Petrol I4",
    driveType: "FWD",
    color: "Platinum White Pearl",
    vin: "19XFC2F59ME******",
    description: `Discover exceptional value and reliability in this Honda City. This compact sedan offers excellent fuel economy, comfortable ride, and modern features at an affordable price point.

The 1.5-liter petrol engine delivers smooth and efficient performance, perfect for city driving and highway cruising. The CVT automatic transmission ensures seamless gear changes and optimal fuel efficiency. The front-wheel-drive system provides excellent traction and stability.

The interior features comfortable seating, Honda's infotainment system with smartphone connectivity, and practical storage solutions. The spacious cabin and generous trunk space make it ideal for daily commuting and family use.

This well-maintained vehicle comes with a complete service history and represents excellent value in the compact sedan segment.`,
    features: [
      "Honda Sensing Safety Suite",
      "Apple CarPlay & Android Auto",
      "8-inch Touchscreen",
      "Rear View Camera",
      "Lane Watch Camera",
      "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "LED Headlights",
      "Push Button Start",
      "Smart Entry System",
      "Climate Control",
      "USB Ports",
    ],
    images: [hondaCityImg1, hondaCityImg2, hondaCityImg3, hondaCityImg4, hondaCityImg5, hondaCityImg6, hondaCityImg7, hondaCityImg8],
  },
  "p3": {
    brand: "Suzuki",
    model: "Swift",
    engine: "1.2L Petrol I4",
    driveType: "FWD",
    color: "Pearl Metallic White",
    vin: "JS2TC1A50K2******",
    description: `Experience fun and efficient driving in this Suzuki Swift. This compact hatchback offers excellent fuel economy, nimble handling, and modern features in a stylish package.

The 1.2-liter petrol engine delivers peppy performance with exceptional fuel efficiency, making it perfect for city driving. The CVT automatic transmission ensures smooth acceleration and optimal fuel economy. The front-wheel-drive system provides excellent maneuverability.

The interior features comfortable seating, modern infotainment system with smartphone connectivity, and practical storage solutions. The compact size makes it perfect for urban environments while still offering adequate space for passengers and cargo.

This well-maintained vehicle comes with a complete service history and represents excellent value in the compact hatchback segment.`,
    features: [
      "Apple CarPlay & Android Auto",
      "7-inch Touchscreen Display",
      "Rear View Camera",
      "Keyless Entry",
      "Push Button Start",
      "Bluetooth Connectivity",
      "USB Ports",
      "Climate Control",
      "Power Windows",
      "Power Steering",
      "ABS Brakes",
      "Dual Airbags",
    ],
    images: [swiftImg1, swiftImg2, swiftImg3, swiftImg4, swiftImg5, swiftImg6, swiftImg7, swiftImg8],
  },
  "p4": {
    brand: "Honda",
    model: "Civic",
    engine: "1.5L Turbo Petrol I4",
    driveType: "FWD",
    color: "Aegean Blue Metallic",
    vin: "19XFC2F59ME******",
    description: `Experience the perfect combination of style, performance, and reliability in this stunning Honda Civic. This sporty sedan delivers an engaging driving experience with excellent fuel economy.

The 1.5-liter turbocharged petrol engine provides impressive power and torque, making every drive exciting. The CVT automatic transmission ensures smooth acceleration and optimal fuel efficiency. The front-wheel-drive system offers excellent handling and stability.

Inside, you'll find a modern interior with comfortable seating, Honda's intuitive infotainment system, and advanced safety features. The spacious cabin and generous trunk space make it perfect for families and daily use.

This well-maintained vehicle comes with a complete service history and represents excellent value in the compact sedan segment.`,
  features: [
      "Honda Sensing Safety Suite",
      "Apple CarPlay & Android Auto",
      "7-inch Touchscreen Display",
      "Honda LaneWatch",
    "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "Road Departure Mitigation",
      "LED Headlights",
      "Push Button Start",
      "Remote Engine Start",
      "Dual Zone Climate Control",
      "Heated Front Seats",
    ],
    images: [civicBlueImg1, civicBlueImg2, civicBlueImg3, civicBlueImg4, civicBlueImg5, civicBlueImg6, civicBlueImg7, civicBlueImg8],
  },
  "r1": {
    brand: "BMW",
    model: "520d",
    engine: "2.0L Turbo Diesel I4",
    driveType: "RWD",
    color: "Mineral Grey Metallic",
    vin: "WBA5A5C50ED******",
    description: `Experience luxury and performance in this exceptional BMW 520d. This premium sedan combines elegant design with impressive fuel efficiency and powerful performance.

The 2.0-liter turbocharged diesel engine delivers excellent torque and fuel economy, making it perfect for both city driving and long journeys. The 8-speed automatic transmission ensures smooth gear changes, while the rear-wheel-drive system provides a dynamic driving experience.

Inside, you'll find a sophisticated interior featuring premium leather upholstery, heated seats, BMW's iDrive infotainment system with a large touchscreen display, and advanced driver assistance systems. The spacious cabin offers exceptional comfort for all passengers.

This vehicle has been meticulously maintained and comes with a comprehensive service history. It represents an excellent opportunity to own a premium German sedan that combines luxury, performance, and efficiency.`,
    features: [
      "BMW iDrive Infotainment System",
      "Navigation System",
      "Leather Upholstery",
      "Heated Front Seats",
      "Parking Sensors",
      "Rear View Camera",
      "LED Headlights",
      "Cruise Control",
      "Bluetooth Connectivity",
      "USB Ports",
      "Climate Control",
      "Keyless Entry",
    ],
    images: [bmw520Img1, bmw520Img2, bmw520Img3, bmw520Img4, bmw520Img5, bmw520Img6, bmw520Img7],
  },
  "r2": {
    brand: "BMW",
    model: "X1",
    engine: "2.0L Turbo Petrol I4",
    driveType: "FWD",
    color: "Alpine White",
    vin: "WBAFR9C50DD******",
    description: `Discover the perfect blend of versatility and luxury in this BMW X1. This compact SUV offers exceptional practicality without compromising on style or performance.

The 2.0-liter turbocharged petrol engine provides responsive acceleration and smooth power delivery. The 8-speed automatic transmission ensures seamless gear changes, while the front-wheel-drive system offers excellent traction and fuel efficiency.

The interior features premium materials, comfortable seating for five, and BMW's latest infotainment system with smartphone integration. The flexible cargo space makes it perfect for daily commutes and weekend adventures alike.

This well-maintained vehicle comes with a complete service history and represents an excellent value in the premium compact SUV segment.`,
    features: [
      "BMW iDrive System",
      "Apple CarPlay & Android Auto",
    "Panoramic Sunroof",
      "Leather Seats",
      "Parking Assistant",
      "Rear View Camera",
      "LED Daytime Running Lights",
      "Cruise Control",
      "Bluetooth Audio",
      "USB Charging Ports",
      "Dual Zone Climate Control",
      "Keyless Start",
    ],
    images: [bmwx1Img1, bmwx1Img2, bmwx1Img3, bmwx1Img4, bmwx1Img5, bmwx1Img6, bmwx1Img7],
  },
  "r3": {
    brand: "Honda",
    model: "Vezel",
    engine: "1.5L Hybrid I4",
    driveType: "FWD",
    color: "Platinum White Pearl",
    vin: "JHMZD1F50KC******",
    description: `Discover exceptional fuel efficiency and versatility in this Honda Vezel hybrid. This compact SUV combines the best of both worlds with its efficient hybrid powertrain and practical design.

The 1.5-liter hybrid engine delivers excellent fuel economy while providing smooth and responsive performance. The e-CVT transmission ensures seamless power delivery, and the front-wheel-drive system offers excellent traction and efficiency.

The interior features modern design with comfortable seating, Honda's infotainment system, and advanced safety technologies. The flexible cargo space and versatile seating make it perfect for urban driving and weekend getaways.

This well-maintained hybrid vehicle comes with a complete service history and represents an excellent choice for eco-conscious drivers seeking reliability and efficiency.`,
    features: [
      "Honda Sensing Safety Suite",
    "Apple CarPlay & Android Auto",
      "7-inch Display Audio",
      "Honda LaneWatch",
      "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "Lane Keeping Assist",
      "LED Headlights",
      "Push Button Start",
      "Smart Entry System",
      "Climate Control",
      "Rear View Camera",
    ],
    images: [vezelImg1, vezelImg2, vezelImg3, vezelImg4, vezelImg5, vezelImg6],
  },
};

const allVehicles: Vehicle[] = [
  { id: "f1", name: "BMW 520d", price: 12500000, image: bmw520Img1, year: 2020, mileage: 35000, fuel: "Diesel", transmission: "Auto", status: "used" },
  { id: "f2", name: "BMW X1", price: 11500000, image: bmwx1Img1, year: 2019, mileage: 42000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "f3", name: "Honda Civic Blue", price: 8500000, image: civicBlueImg1, year: 2021, mileage: 28000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "f4", name: "Honda Vezel", price: 10500000, image: vezelImg1, year: 2020, mileage: 38000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "p1", name: "Honda Civic", price: 8500000, image: civic1Img1, year: 2021, mileage: 25000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "p2", name: "Honda City", price: 7500000, image: hondaCityImg1, year: 2020, mileage: 32000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "p3", name: "Suzuki Swift", price: 5500000, image: swiftImg1, year: 2019, mileage: 45000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "p4", name: "Honda Civic Blue", price: 8500000, image: civicBlueImg1, year: 2021, mileage: 28000, fuel: "Petrol", transmission: "Auto", status: "used" },
  { id: "r1", name: "BMW 520d", price: 12500000, image: bmw520Img1, year: 2020, mileage: 35000, fuel: "Diesel", transmission: "Auto", status: "reserved" },
  { id: "r2", name: "BMW X1", price: 11500000, image: bmwx1Img1, year: 2019, mileage: 42000, fuel: "Petrol", transmission: "Auto", status: "reserved" },
  { id: "r3", name: "Honda Vezel", price: 10500000, image: vezelImg1, year: 2020, mileage: 38000, fuel: "Petrol", transmission: "Auto", status: "reserved" },
];

interface VehicleSingleClientProps {
  vehicleId: string;
  vehicleData?: SanityVehicle | null;
  similarVehicles?: SanityVehicle[];
  siteSettings?: SiteSettings | null;
}

export default function VehicleSingleClient({ vehicleId, vehicleData, similarVehicles = [], siteSettings }: VehicleSingleClientProps) {
  // Use Sanity data if provided, otherwise fall back to static data
  let vehicle: Vehicle;
  let vehicleDetails: VehicleDetails;

  if (vehicleData) {
    // Use Sanity data
    vehicle = {
      id: vehicleData.id || vehicleData._id,
      name: vehicleData.name,
      price: vehicleData.price,
      image: getWebPImageUrl(vehicleData.mainImage, 800, 600) || "/placeholder-car.jpg",
      year: vehicleData.year,
      mileage: vehicleData.mileage,
      fuel: vehicleData.fuel,
      transmission: vehicleData.transmission,
      status: vehicleData.status,
    };
    vehicleDetails = {
      brand: vehicleData.brand || "",
      model: vehicleData.model || "",
      engine: vehicleData.engine || "",
      driveType: vehicleData.driveType || "",
      color: vehicleData.color || "",
      vin: "", // VIN not in schema, can be added later if needed
      description: vehicleData.description || "",
      features: vehicleData.features || [],
      condition: vehicleData.condition || (vehicleData.status === "new" ? "new" : "used"),
      images: vehicleData.images && vehicleData.images.length > 0 
        ? vehicleData.images.map(img => getWebPImageUrl(img, 1200, 800))
        : [getWebPImageUrl(vehicleData.mainImage, 1200, 800) || "/placeholder-car.jpg"],
    } as VehicleDetails;
  } else {
    // Fallback to static data
    vehicle = allVehicles.find((v) => v.id === vehicleId) || allVehicles[0];
    vehicleDetails = vehicleDetailsMap[vehicle.id] || vehicleDetailsMap["f1"];
  }

  const vehicleImages = vehicleDetails.images.length > 0 ? vehicleDetails.images : [vehicle.image];
  
  // Main image carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Thumbnail carousel
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !thumbApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, thumbApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !thumbApi) return;
    emblaApi.on("select", () => {
      const selected = emblaApi.selectedScrollSnap();
      thumbApi.scrollTo(selected);
    });
  }, [emblaApi, thumbApi]);

  // Ensure status exists and is valid, default to 'used' if not
  const vehicleStatus = vehicle.status || 'used'
  const status = statusConfig[vehicleStatus] || statusConfig.used
  const isSold = vehicleStatus === "sold";

  // Get phone and WhatsApp numbers from site settings
  const phoneNumber = siteSettings?.phone || '+1234567890';
  const whatsappNumber = siteSettings?.whatsapp || '1234567890';
  
  // Format phone number for tel: link (remove any non-digit characters except +)
  const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // Format WhatsApp number (remove any non-digit characters)
  const formattedWhatsApp = whatsappNumber.replace(/\D/g, '');

  // Get vehicle slug for URL construction
  const vehicleSlug = vehicleData 
    ? (typeof vehicleData.slug === 'string' 
        ? vehicleData.slug 
        : vehicleData.slug?.current || vehicleData.id || vehicleData._id)
    : vehicleId;

  // Get site URL from settings
  const siteUrl = siteSettings?.seoSettings?.siteUrl || 
                 siteSettings?.seoSettings?.canonicalUrl || 
                 (typeof window !== 'undefined' ? window.location.origin : 'https://www.example.com');
  
  // Construct vehicle page URL
  const vehicleUrl = `${siteUrl}/vehicles/${vehicleSlug}`;

  // Create well-structured message
  const message = `*Vehicle Purchase Inquiry*

*Vehicle:* ${vehicle.year} ${vehicle.name}
*Brand:* ${vehicleDetails.brand}
*Price:* ${formatLKRPrice(vehicle.price)}
*Mileage:* ${vehicle.mileage.toLocaleString()} km
*Fuel Type:* ${vehicle.fuel}
*Transmission:* ${vehicle.transmission}
*Color:* ${vehicleDetails.color || 'N/A'}

Hi! I'm interested in purchasing this vehicle. Please provide more details.

View details: ${vehicleUrl}

Quick Response Appreciated!`;

  // Encode message properly for WhatsApp URL
  const whatsappMessage = encodeURIComponent(message);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const specs = [
    { icon: Car, label: "Brand", value: vehicleDetails.brand },
    { icon: Car, label: "Model", value: vehicleDetails.model },
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Gauge, label: "Mileage", value: `${vehicle.mileage.toLocaleString()} km` },
    { icon: Cog, label: "Engine", value: vehicleDetails.engine },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuel },
    { icon: Settings2, label: "Transmission", value: vehicle.transmission },
    { icon: Zap, label: "Drive Type", value: vehicleDetails.driveType },
    { icon: CheckCircle2, label: "Condition", value: (vehicleDetails.condition ?? (vehicle.status === "new" ? "New" : "Pre-Owned")) },
    { icon: Palette, label: "Color", value: vehicleDetails.color },
    { icon: Hash, label: "VIN", value: vehicleDetails.vin },
  ];

  const visibleSpecs = showAllSpecs ? specs : specs.slice(0, 6);

  // Map similar vehicles from Sanity data
  const mappedSimilarVehicles = vehicleData && similarVehicles.length > 0
    ? similarVehicles.map((v) => ({
        id: v.id || v._id,
        name: v.name || 'Unnamed Vehicle',
        price: v.price || 0,
        image: getWebPImageUrl(v.mainImage, 800, 600) || "/placeholder-car.jpg",
        year: v.year || new Date().getFullYear(),
        mileage: v.mileage || 0,
        fuel: v.fuel || 'N/A',
        transmission: v.transmission || 'N/A',
        status: (v.status || 'used') as VehicleStatus, // Ensure status is valid
      }))
    : allVehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [vehicleId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        if (emblaApi) emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        if (emblaApi) emblaApi.scrollNext();
      }
    };

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, vehicleImages.length, emblaApi]);

  // Add Embla styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .embla {
        overflow: hidden;
      }
      .embla__container {
        display: flex;
        touch-action: pan-y pinch-zoom;
      }
      .embla__slide {
        flex: 0 0 100%;
        min-width: 0;
      }
      .embla-thumbs {
        overflow: hidden;
      }
      .embla-thumbs__container {
        display: flex;
        touch-action: pan-y pinch-zoom;
      }
      .embla-thumbs__slide {
        flex: 0 0 auto;
        min-width: 0;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <main className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
            Home
          </Link>
          <span>/</span>
          <Link href="/vehicles" className="hover:text-foreground transition-colors" data-testid="breadcrumb-vehicles">
            Vehicles
          </Link>
          <span>/</span>
          <span className="text-foreground">{vehicle.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {vehicleImages.map((img, index) => (
                    <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                      <div className="relative aspect-video group cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                        <img
                          src={img}
                          alt={`${vehicle.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        
                        {index === 0 && (
                          <div className="absolute top-3 left-3 z-20">
                            <Badge variant="outline" className={`${status.className} border font-semibold px-2 py-1 text-sm`}>
                              {status.label}
                            </Badge>
                          </div>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollPrev();
                          }}
                          disabled={!canScrollPrev}
                          data-testid="button-image-prev"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollNext();
                          }}
                          disabled={!canScrollNext}
                          data-testid="button-image-next"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="embla-thumbs overflow-hidden" ref={thumbRef}>
              <div className="embla-thumbs__container flex gap-2">
                {vehicleImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => onThumbClick(index)}
                    className={`embla-thumbs__slide shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                      index === selectedIndex ? "border-silver-light" : "border-transparent opacity-60"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                    aria-label={`View image ${index + 1} of ${vehicle.name}`}
                  >
                    <img 
                      src={img} 
                      alt={`${vehicle.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>

            <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {visibleSpecs.map((spec) => (
                  <div key={spec.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-silver/10 shrink-0">
                      <spec.icon className="h-4 w-4 text-silver" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{spec.label}</div>
                      <div className="text-sm font-medium text-foreground">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              {specs.length > 6 && (
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-silver-light"
                  onClick={() => setShowAllSpecs(!showAllSpecs)}
                  data-testid="button-toggle-specs"
                  aria-label={showAllSpecs ? "Show fewer specifications" : "Show all specifications"}
                >
                  {showAllSpecs ? (
                    <>Show Less <ChevronUp className="h-4 w-4 ml-1" aria-hidden="true" /></>
                  ) : (
                    <>Show All Specifications <ChevronDown className="h-4 w-4 ml-1" aria-hidden="true" /></>
                  )}
                </Button>
              )}
            </Card>

            <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Description</h2>
              <div className="prose prose-invert prose-sm max-w-none">
                {vehicleDetails.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </Card>

            <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicleDetails.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 lg:sticky lg:top-20">
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                {vehicle.name}
              </h1>
              <p className="text-muted-foreground mb-4">{vehicle.year}</p>

              <div className="text-3xl font-bold text-silver-light mb-6">
                {formatLKRPrice(vehicle.price)}
              </div>

              <div className="space-y-3 mb-6">
                <Button
                  variant="outline"
                  className={`w-full border-silver/30 gap-2 relative overflow-visible ${!isSold ? 'animate-pulse-ring' : ''}`}
                  onClick={() => window.open(`tel:${formattedPhone}`)}
                  disabled={isSold}
                  data-testid="button-call"
                >
                  <Phone className="h-4 w-4 relative z-10" aria-hidden="true" />
                  <span className="relative z-10">Call Us</span>
                </Button>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2"
                  onClick={() => window.open(`https://wa.me/${formattedWhatsApp}?text=${whatsappMessage}`, "_blank")}
                  disabled={isSold}
                  data-testid="button-whatsapp"
                >
                  <SiWhatsapp className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </Button>
              </div>

              <Separator className="bg-silver/20 mb-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-silver" />
                  <span>No hidden charges. Transparent pricing.</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4 text-silver" />
                  <span>Financing options available</span>
                </div>
              </div>
            </Card>

            <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
              <h3 className="font-semibold text-foreground mb-3">Need Financing?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We partner with leading financial institutions to offer competitive rates.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-silver/30" data-testid="button-financing">
                  Inquire About Financing
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {mappedSimilarVehicles.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mappedSimilarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} onQuickView={setQuickViewVehicle} />
              ))}
            </div>
          </section>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-silver/20 lg:hidden z-40">
          <div className="flex gap-3 max-w-lg mx-auto">
            <Button
              variant="outline"
              className="flex-1 border-silver/30 gap-2"
              onClick={() => window.open(`tel:${formattedPhone}`)}
              disabled={isSold}
              aria-label="Call us about this vehicle"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 gap-2"
              onClick={() => window.open(`https://wa.me/${formattedWhatsApp}?text=${whatsappMessage}`, "_blank")}
              disabled={isSold}
              aria-label="Contact us on WhatsApp about this vehicle"
            >
              <SiWhatsapp className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </Button>
          </div>
        </div>

        <VehicleQuickView
          vehicle={quickViewVehicle}
          open={!!quickViewVehicle}
          onOpenChange={(open) => !open && setQuickViewVehicle(null)}
          siteSettings={siteSettings}
        />

        {/* Lightbox */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={vehicleImages[selectedIndex]}
              alt={vehicle.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              loading="eager"
              decoding="async"
            />

              {/* Previous button - styled like testimonial slider */}
              {vehicleImages.length > 1 && (
                <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollPrev();
                    }}
                    disabled={!canScrollPrev}
                    className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
                    data-testid="button-lightbox-prev"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              )}

              {/* Next button - styled like testimonial slider */}
              {vehicleImages.length > 1 && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollNext();
                    }}
                    disabled={!canScrollNext}
                    className="border-white/30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm h-12 w-12 rounded-full"
                    data-testid="button-lightbox-next"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              )}

              {/* Dots indicator */}
              {vehicleImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {vehicleImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        onThumbClick(index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === selectedIndex
                          ? "w-6 bg-white"
                          : "w-2 bg-white/40 hover:bg-white/60"
                      }`}
                      data-testid={`button-lightbox-dot-${index}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

