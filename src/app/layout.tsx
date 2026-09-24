import type { Metadata, Viewport } from "next";
import { Gloock, Manrope, Reem_Kufi } from "next/font/google";
import { Providers } from "@/components/site/providers";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { faqs, site } from "@/lib/content";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", weight: "400", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const reemKufi = Reem_Kufi({ variable: "--font-reem-kufi", subsets: ["arabic"], display: "swap", preload: false });

const description =
  "Ruhi IT Hub is a Lahore studio designing and building mobile apps for Muslim life, including Qalbify and Ayyami. No ads inside worship, no data sold.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Ruhi IT Hub · Mobile apps for Muslim life, built in Lahore",
  description,
  openGraph: {
    title: "Ruhi IT Hub · Mobile apps for Muslim life",
    description,
    url: site.url,
    siteName: "Ruhi IT Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Ruhi IT Hub", description },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ea",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ruhi IT Hub",
    url: site.url,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", postalCode: "54000", addressCountry: "PK" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gloock.variable} ${manrope.variable} ${reemKufi.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-transform duration-200 focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
        <SmoothScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
