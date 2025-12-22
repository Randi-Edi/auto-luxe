import Hero from "@/components/Hero";
import TestimonialSlider from "@/components/TestimonialSlider";
import FeaturedListings from "@/components/FeaturedListings";
import BrandLogos from "@/components/BrandLogos";
import WhyChooseUs from "@/components/WhyChooseUs";
import Newsletter from "@/components/Newsletter";
import type { Vehicle } from "@/components/VehicleCard";

// todo: remove mock functionality
const reservedVehicles: Vehicle[] = [
  {
    id: "r1",
    name: "BMW 520d",
    price: 12500000, // LKR - 2018+ vehicle
    image: "/attached_assets/bmw 520/587696355_17897336799358785_4107318543107151809_n.jpg",
    year: 2020,
    mileage: 35000,
    fuel: "Diesel",
    transmission: "Auto",
    status: "reserved",
  },
  {
    id: "r2",
    name: "BMW X1",
    price: 11500000, // LKR - 2018+ vehicle
    image: "/attached_assets/bmw x1/588643803_17897103972358785_8451583355893606700_n.jpg",
    year: 2019,
    mileage: 42000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "reserved",
  },
  {
    id: "r3",
    name: "Honda Vezel",
    price: 10500000, // LKR - 2018+ vehicle
    image: "/attached_assets/vezel/590909875_17897840340358785_7490299254087544074_n.jpg",
    year: 2020,
    mileage: 38000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "reserved",
  },
];

const popularVehicles: Vehicle[] = [
  {
    id: "p1",
    name: "Honda Civic",
    price: 8500000, // LKR - 2018+ vehicle
    image: "/attached_assets/civic 1/590941900_17896921617358785_7108838582922432010_n.jpg",
    year: 2021,
    mileage: 25000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "p2",
    name: "Honda City",
    price: 7500000, // LKR - 2018+ vehicle
    image: "/attached_assets/honda city/588650776_17897700795358785_1331596431631181195_n.jpg",
    year: 2020,
    mileage: 32000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "p3",
    name: "Suzuki Swift",
    price: 5500000, // LKR - 2018+ vehicle
    image: "/attached_assets/swift/589070700_17897578743358785_7473685017664571608_n.jpg",
    year: 2019,
    mileage: 45000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
  {
    id: "p4",
    name: "Honda Civic Blue",
    price: 8500000, // LKR - 2018+ vehicle
    image: "/attached_assets/civic blue/589024052_17897699316358785_5286289233685487724_n.jpg",
    year: 2021,
    mileage: 28000,
    fuel: "Petrol",
    transmission: "Auto",
    status: "used",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <TestimonialSlider />
      <FeaturedListings
        title="Reserved Listings"
        subtitle="These exclusive vehicles have been reserved by our clients"
        vehicles={reservedVehicles}
        showViewAll={false}
        gridCols="lg:grid-cols-3"
      />
      <FeaturedListings />
      <FeaturedListings
        title="Popular Listings"
        subtitle="Most viewed vehicles this month"
        vehicles={popularVehicles}
      />
      <BrandLogos />
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}



