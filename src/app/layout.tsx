import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { generateSiteMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings().catch(() => null);
  return generateSiteMetadata(siteSettings);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings().catch(() => null);
  const { generateOrganizationStructuredData } = await import('@/lib/seo');
  const organizationData = generateOrganizationStructuredData(siteSettings);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </head>
      <body className={inter.variable}>
        <Providers>
          <div className="min-h-screen bg-background flex flex-col">
            <Header logo={siteSettings?.logo} phone={siteSettings?.phone} />
            <div className="flex-1">
              {children}
            </div>
            <Footer 
              logo={siteSettings?.logo}
              phone={siteSettings?.phone}
              email={siteSettings?.email}
              address={siteSettings?.address}
              footerHeading={siteSettings?.footerHeading}
              footerDescription={siteSettings?.footerDescription}
              socialLinks={siteSettings?.socialLinks}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}

