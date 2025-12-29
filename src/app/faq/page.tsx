import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getFAQs, getSiteSettings } from "@/lib/sanity/fetch";
import { mapSanityFAQ } from "@/lib/sanity/mappers";
import { generateSiteMetadata } from "@/lib/seo";
import { REVALIDATE_TIME } from "@/lib/revalidate";

export const revalidate = REVALIDATE_TIME;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'FAQ');
}

export default async function FAQ() {
  const faqs = await getFAQs().catch(() => []);
  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Find answers to common questions about buying, selling, and our
            services.
          </p>
        </div>

        <FAQAccordion items={faqs.map(mapSanityFAQ)} />

        <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 mt-12 text-center">
          <MessageCircle className="h-10 w-10 text-silver-light mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Can't find the answer you're looking for? Our team is here to help.
          </p>
          <Link href="/contact">
            <Button className="bg-silver-light text-background font-medium" data-testid="button-contact-us">
              Contact Us
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}



