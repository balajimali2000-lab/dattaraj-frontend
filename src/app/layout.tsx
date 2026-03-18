import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DattaRaj | Premium Silver Ornaments & Jewelry Heritage",
  description: "Experience the royal heritage of DattaRaj Silver. Handcrafted sterling silver ornaments, temple jewelry, and bespoke masterpieces from the heart of Hupri. Crafting excellence since 2013.",
  keywords: ["DattaRaj Silver", "Hupri Silver", "Sterling Silver Ornaments", "Royal Kada", "Temple Jewelry", "Kolhapur Silver", "Handcrafted Silver", "Silver Jewelry India"],
  icons: {
    icon: "/cropedmain.png",
    apple: "/cropedmain.png",
  }
};
import { Providers } from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white selection:text-black`}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
