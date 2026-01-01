import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Globe, Handshake, Award, MapPin } from "lucide-react";
import { getAboutPage } from "@/lib/sanity/fetch";
import { generateSiteMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/sanity/fetch";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import Image from "next/image";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'About Us');
}

export default async function About() {
  const aboutPage = await getAboutPage().catch(() => null);
  const siteSettings = await getSiteSettings().catch(() => null);

  // Fallback content if Sanity data is not available
  const defaultContent = {
    title: "ABOUT US: GANEGODA INTERNATIONAL (PVT) LTD",
    subtitle: "DRIVING DREAMS INTO REALITY",
    intro: "Welcome to Ganegoda International (Pvt) Ltd, a premier vehicle dealership in Sri Lanka dedicated to providing high-quality automotive solutions. As a core subsidiary of Ganegoda Holdings, we pride ourselves on being a trusted bridge between global automotive excellence and the local driving community.",
    directorName: "Director, Ganegoda International (Pvt) Ltd",
    directorMessage: [
      {
        _type: "block",
        _key: "director-msg",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "director-msg-span",
            text: '"At Ganegoda International, our philosophy is simple: we don\'t just move vehicles; we move people toward their aspirations.\n\nWhen we founded this company under the Ganegoda Holdings umbrella, our goal was to bring a new level of transparency and quality to the Sri Lankan automotive market. Whether you are importing your first luxury sedan or trading a trusted local vehicle, we treat every transaction with the same \'attention to detail\' that defines our group.\n\nWe are committed to steady growth, fueled by the trust our clients place in us every day. Thank you for choosing us to help drive your dreams into reality."',
            marks: [],
          },
        ],
      },
    ],
    whoWeAre: [
      {
        _type: "block",
        _key: "who-we-are",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "who-we-are-span",
            text: "At Ganegoda International, we understand that a vehicle is more than just a mode of transport; it is a significant life investment. With years of expertise in the Sri Lankan motor industry, we have established ourselves as a reliable name in both the importation and local sale of motor vehicles.",
            marks: [],
          },
        ],
      },
    ],
    coreOperations: {
      title: "OUR CORE OPERATIONS",
      intro: "We specialize in sourcing and delivering top-tier vehicles that meet the diverse needs of our clientele.",
      operations: [
        {
          title: "Premium Imports",
          description: "Navigating global markets to bring the latest automotive technology and world-class brands to Sri Lanka.",
        },
        {
          title: "Local Sales & Purchases",
          description: "Facilitating a seamless marketplace for high-quality local vehicles with guaranteed transparency.",
        },
        {
          title: "The Ganegoda Synergy",
          description: "Through our sister company, Lasa's Auto Hub Modifications, we offer our clients access to nearly five years of award-winning workmanship for those looking to customize their drive.",
        },
      ],
    },
    whyChooseUs: {
      title: "WHY CHOOSE US?",
      points: [
        {
          title: "Quality",
          description: "Every vehicle is hand-picked and inspected for performance and safety.",
        },
        {
          title: "Integrity",
          description: "Honest pricing and clear documentation for every import and local sale.",
        },
        {
          title: "Legacy",
          description: "Backed by the steady growth and reputation of Ganegoda Holdings.",
        },
      ],
    },
    visitShowroom: {
      title: "VISIT OUR SHOWROOM",
      description: "Experience the Ganegoda difference today. Whether you are looking for a brand-new import or a reliable local vehicle, our team is ready to assist you.",
      tagline: "Ganegoda International (Pvt) Ltd Driving Dreams into Reality.",
    },
  };

  // Merge Sanity data with defaults, ensuring all nested structures exist
  const content = {
    title: aboutPage?.title || defaultContent.title,
    subtitle: aboutPage?.subtitle || defaultContent.subtitle,
    intro: aboutPage?.intro || defaultContent.intro,
    directorName: aboutPage?.directorName || defaultContent.directorName,
    directorMessage: aboutPage?.directorMessage || defaultContent.directorMessage,
    whoWeAre: aboutPage?.whoWeAre || defaultContent.whoWeAre,
    coreOperations: {
      title: aboutPage?.coreOperations?.title || defaultContent.coreOperations.title,
      intro: aboutPage?.coreOperations?.intro || defaultContent.coreOperations.intro,
      operations: aboutPage?.coreOperations?.operations || defaultContent.coreOperations.operations,
    },
    whyChooseUs: {
      title: aboutPage?.whyChooseUs?.title || defaultContent.whyChooseUs.title,
      points: aboutPage?.whyChooseUs?.points || defaultContent.whyChooseUs.points,
    },
    visitShowroom: {
      title: aboutPage?.visitShowroom?.title || defaultContent.visitShowroom.title,
      description: aboutPage?.visitShowroom?.description || defaultContent.visitShowroom.description,
      tagline: aboutPage?.visitShowroom?.tagline || defaultContent.visitShowroom.tagline,
    },
  };
  const directorImage = aboutPage?.directorImage || "/img/1.jpg"; // Fallback image

  const operationIcons = [Globe, Handshake, Award];

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl sm:text-2xl text-silver-light font-medium mb-8 tracking-wide italic">
            {content.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* Director's Message Section */}
        <section className="mb-20">
          <Card className="border-silver/20 bg-card/40 backdrop-blur-sm p-8 sm:p-12 lg:p-16 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-silver/5 to-transparent pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Director Message */}
              <div className="order-1 lg:order-1 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                    A MESSAGE FROM OUR DIRECTOR
                  </h2>
                  <div className="w-20 h-1 bg-silver-light mb-6" />
                </div>
                <div className="prose prose-invert max-w-none">
                  <PortableTextRenderer content={content.directorMessage} />
                </div>
                <div className="pt-4 border-t border-silver/20">
                  <p className="text-silver-light font-medium text-lg">
                    — {content.directorName}
                  </p>
                </div>
              </div>

              {/* Director Image */}
              <div className="order-2 lg:order-2">
                <div className="relative w-full aspect-[4/5] max-w-lg lg:max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={directorImage}
                    alt="Director"
                    fill
                    className="object-cover object-right"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Who We Are Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              WHO WE ARE
            </h2>
            <div className="w-24 h-1 bg-silver-light mx-auto mb-6" />
          </div>
          <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-8 sm:p-12">
            <PortableTextRenderer content={content.whoWeAre} />
          </Card>
        </section>

        {/* Core Operations Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {content.coreOperations?.title || "OUR CORE OPERATIONS"}
            </h2>
            <div className="w-24 h-1 bg-silver-light mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {content.coreOperations?.intro || ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {(content.coreOperations?.operations || []).map((operation, index) => {
              const Icon = operationIcons[index] || Globe;
              return (
                <Card
                  key={operation.title}
                  className="border-silver/20 bg-card/30 backdrop-blur-sm p-8 hover:bg-card/40 transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-silver/10 mb-6 group-hover:bg-silver-light/20 transition-colors">
                    <Icon className="h-8 w-8 text-silver-light" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {operation.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {operation.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {content.whyChooseUs?.title || "WHY CHOOSE US?"}
            </h2>
            <div className="w-24 h-1 bg-silver-light mx-auto mb-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(content.whyChooseUs?.points || []).map((point) => (
              <Card
                key={point.title}
                className="border-silver/20 bg-card/30 backdrop-blur-sm p-8 hover:bg-card/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-silver-light mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Visit Showroom Section */}
        <section className="mb-12">
          <Card className="border-silver/20 bg-gradient-to-br from-silver/10 to-card/30 backdrop-blur-sm p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-silver/5 via-transparent to-silver/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-silver-light/20 mb-6">
                <MapPin className="h-8 w-8 text-silver-light" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                {content.visitShowroom?.title || "VISIT OUR SHOWROOM"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                {content.visitShowroom?.description || ""}
              </p>
              <p className="text-xl font-semibold text-silver-light italic">
                {content.visitShowroom?.tagline || ""}
              </p>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
