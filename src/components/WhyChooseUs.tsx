import { Card } from "@/components/ui/card";
import { Shield, Award, DollarSign, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Dealers",
    description:
      "Vetted partners with proven track records ensuring authentic, quality vehicles every time.",
  },
  {
    icon: Award,
    title: "Premium Imports",
    description:
      "Direct access to exclusive international models and limited editions from around the globe.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. Competitive prices with complete cost breakdown upfront.",
  },
  {
    icon: Headphones,
    title: "After-Sales Support",
    description:
      "Dedicated support team available for maintenance, queries, and assistance post-purchase.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of working with a premium dealership committed to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 text-center hover-elevate"
              data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-silver/10 mb-4">
                <feature.icon className="h-7 w-7 text-silver-light" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
