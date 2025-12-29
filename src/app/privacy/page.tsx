import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { getSiteSettings, getPrivacyPolicy } from "@/lib/sanity/fetch";
import { generateSiteMetadata } from "@/lib/seo";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { defaultPrivacyPolicyContent } from "@/lib/defaultContent";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings, 'Privacy Policy');
}

export default async function PrivacyPolicy() {
  const siteSettings = await getSiteSettings().catch(() => null);
  const privacyPolicy = await getPrivacyPolicy().catch(() => null);
  const companyName = siteSettings?.title || "Ganegoda International";
  
  const title = privacyPolicy?.title || "Privacy Policy";
  const lastUpdated = privacyPolicy?.lastUpdated 
    ? new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const content = privacyPolicy?.content && privacyPolicy.content.length > 0 
    ? privacyPolicy.content 
    : defaultPrivacyPolicyContent;

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-silver-light/10 mb-4">
            <Shield className="h-8 w-8 text-silver-light" />
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
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

