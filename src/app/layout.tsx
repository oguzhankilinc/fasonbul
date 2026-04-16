import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";

const GA_ADS_ID = "AW-18087640209";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fasonbul.com"),
  title: {
    default: "FasonBul - Türkiye'nin Fason Üretim Platformu | Fason İş İlanları",
    template: "%s | FasonBul",
  },
  description:
    "Türkiye'nin en kapsamlı fason iş ilanları platformu. Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el işi sektörlerinde fason üretici ve iş sahiplerini buluşturuyoruz. Komisyon yok, aracı yok, sonsuza kadar ücretsiz.",
  keywords: [
    "fason",
    "fason iş ilanları",
    "fason üretim",
    "fason üretici",
    "fason iş",
    "fason atölye",
    "fason imalat",
    "fason üretim talepleri",
    "otomotiv fason",
    "mobilya fason",
    "tekstil fason",
    "kimya fason",
    "baskı fason",
    "paketleme fason",
    "el işi fason",
  ],
  authors: [{ name: "FasonBul" }, { name: "OSTHINKS YAZILIM A.Ş." }],
  creator: "OSTHINKS YAZILIM A.Ş.",
  publisher: "FasonBul",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://fasonbul.com",
    siteName: "FasonBul",
    title: "FasonBul - Türkiye'nin Fason Üretim Platformu",
    description:
      "Fason iş ilanları verin veya arayın. 7 sektörde fason üretici ve iş sahiplerini buluşturuyoruz. Komisyon yok, aracı yok!",
    images: [
      {
        url: "/logo/fasonbul-logo.png",
        width: 1200,
        height: 630,
        alt: "FasonBul - Fason Üretimin Adresi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FasonBul - Türkiye'nin Fason Üretim Platformu",
    description:
      "Fason iş ilanları verin veya arayın. 7 sektörde fason üretici ve iş sahiplerini buluşturuyoruz.",
    images: ["/logo/fasonbul-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fasonbul.com",
  },
  verification: {
    // Add Google verification when available
    // google: "your-google-verification-code",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Organization Schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FasonBul",
    alternateName: "Fason Bul",
    url: "https://fasonbul.com",
    logo: "https://fasonbul.com/logo/fasonbul-logo.png",
    description: "Türkiye'nin fason üretim platformu. Fason iş sahipleri ile fason üreticileri buluşturuyoruz.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@fasonbul.com",
      contactType: "customer service",
      availableLanguage: "Turkish",
    },
  };

  // Website Schema for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FasonBul",
    url: "https://fasonbul.com",
    description: "Türkiye'nin fason üretim platformu",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fasonbul.com/ilanlar?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <Header user={user} />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google Ads Global Site Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
