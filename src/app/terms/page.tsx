import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Scale } from "lucide-react";
import { getSiteSettings, getTermsOfService } from "@/lib/sanity/fetch";
import { generateSiteMetadata } from "@/lib/seo";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { defaultTermsOfServiceContent } from "@/lib/defaultContent";
import { REVALIDATE_TIME } from "@/lib/revalidate";

export const revalidate = REVALIDATE_TIME;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Terms of Service');
}

export default async function TermsOfService() {
  const siteSettings = await getSiteSettings().catch(() => null);
  const termsOfService = await getTermsOfService().catch(() => null);
  const companyName = siteSettings?.title || "Ganegoda International";
  
  const title = termsOfService?.title || "Terms of Service";
  const lastUpdated = termsOfService?.lastUpdated 
    ? new Date(termsOfService.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const content = termsOfService?.content && termsOfService.content.length > 0 
    ? termsOfService.content 
    : defaultTermsOfServiceContent;

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-silver-light/10 mb-4">
            <Scale className="h-8 w-8 text-silver-light" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-8 sm:p-10">
          <div className="space-y-8">
            <PortableTextRenderer content={content} />

            <section className="mt-12 pt-8 border-t border-silver/20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-background/50 border border-silver/20 rounded-lg p-6 space-y-2">
                <p className="text-foreground font-semibold">{companyName}</p>
                {siteSettings?.address && (
                  <p className="text-muted-foreground">{siteSettings.address}</p>
                )}
                {siteSettings?.phone && (
                  <p className="text-muted-foreground">Phone: {siteSettings.phone}</p>
                )}
                {siteSettings?.email && (
                  <p className="text-muted-foreground">Email: {siteSettings.email}</p>
                )}
              </div>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}

