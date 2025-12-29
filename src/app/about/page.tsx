import { Card } from "@/components/ui/card";
import { Car, Globe, Handshake, MessageSquare, Award, Users, TrendingUp } from "lucide-react";

export const revalidate = 3600;

const timeline = [
  { year: "2015", title: "Founded", description: "Ganegoda International was established with a vision to redefine luxury car buying." },
  { year: "2017", title: "Expansion", description: "Expanded our showroom and introduced premium import services." },
  { year: "2020", title: "500+ Sales", description: "Reached milestone of 500 vehicles sold to satisfied clients." },
  { year: "2023", title: "Digital Platform", description: "Launched our online platform for seamless car buying experience." },
  { year: "2024", title: "Excellence Award", description: "Recognized as the top luxury dealership in the region." },
];

const services = [
  {
    icon: Car,
    title: "Vehicle Sales",
    description: "Premium new and pre-owned luxury vehicles from the world's finest brands.",
  },
  {
    icon: Globe,
    title: "Premium Imports",
    description: "Exclusive access to international models and limited editions.",
  },
  {
    icon: Handshake,
    title: "Trade-Ins",
    description: "Competitive offers for your current vehicle towards your new purchase.",
  },
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "Expert guidance to help you find the perfect vehicle for your needs.",
  },
];

const stats = [
  { icon: Car, value: "500+", label: "Vehicles Sold" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Industry Awards" },
  { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
];

export default function About() {
  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Ganegoda International
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We are dedicated to providing an exceptional luxury car buying
            experience. Our commitment to excellence, transparency, and customer
            satisfaction sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 text-center"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <stat.icon className="h-8 w-8 text-silver-light mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <section className="mb-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-silver/20 hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col sm:flex-row items-center gap-4 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                  data-testid={`timeline-${item.year}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-4 inline-block">
                      <div className="text-silver-light font-bold mb-1">{item.year}</div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-silver-light border-4 border-background z-10 hidden sm:block" />
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive automotive solutions tailored to your needs
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.title}
                className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 text-center hover-elevate"
                data-testid={`service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-silver/10 mb-4">
                  <service.icon className="h-7 w-7 text-silver-light" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}



