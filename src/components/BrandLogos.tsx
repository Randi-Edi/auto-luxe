import { SiMercedes, SiBmw, SiPorsche, SiFerrari, SiAudi, SiTesla, SiBentley, SiLamborghini, SiToyota, SiHonda } from "react-icons/si";

const brands = [
  { name: "Mercedes-Benz", icon: SiMercedes },
  { name: "BMW", icon: SiBmw },
  { name: "Porsche", icon: SiPorsche },
  { name: "Ferrari", icon: SiFerrari },
  { name: "Audi", icon: SiAudi },
  { name: "Tesla", icon: SiTesla },
  { name: "Bentley", icon: SiBentley },
  { name: "Lamborghini", icon: SiLamborghini },
  { name: "Toyota", icon: SiToyota },
  { name: "Honda", icon: SiHonda },
];

export default function BrandLogos() {
  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
          Premium Brands We Deal
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Authorized partners for the world's finest automobiles
        </p>

        <div className="relative overflow-hidden">
          <div className="flex gap-12 sm:gap-16 brand-scroll">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="group flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
                data-testid={`brand-${brand.name.toLowerCase().replace("-", "")}-${index}`}
              >
                <brand.icon className="h-10 w-10 sm:h-12 sm:w-12 text-silver/60 transition-all duration-300 group-hover:text-silver-light group-hover:scale-110" />
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
