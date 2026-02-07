import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Surprise Systems | Product-Led Innovation Studio",
  description:
    "A product-led innovation studio working at the intersection of creativity, technology, and business. We solve business problems through behavioral changes.",
  keywords: [
    "innovation",
    "product design",
    "behavioral design",
    "creativity",
    "technology",
    "David Borg",
    "Johan Pihl",
  ],
  openGraph: {
    title: "Surprise Systems | Product-Led Innovation Studio",
    description:
      "A product-led innovation studio working at the intersection of creativity, technology, and business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XJJK0CZSM7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XJJK0CZSM7', {
              anonymize_ip: true
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
