import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://vexioapp.com"),
  title: {
    default: "VexioApp — Building Digital Futures",
    template: "%s | VexioApp",
  },
  description:
    "VexioApp is an IT services company specializing in web development, mobile apps, cloud & DevOps, and real-time solutions. We craft scalable, production-grade software.",
  keywords: [
    "web development",
    "mobile app development",
    "MERN stack",
    "React Native",
    "IT services",
    "Node.js",
    "AWS",
    "VexioApp",
    "software development company",
    "full stack development",
    "React Native developer",
    "Next.js agency",
  ],
  authors: [{ name: "Abhishek Pundir", url: "https://vexioapp.com" }],
  creator: "VexioApp",
  publisher: "VexioApp",
  openGraph: {
    title: "VexioApp — Building Digital Futures",
    description:
      "We craft scalable web and mobile applications with cutting-edge technology. From concept to deployment, we deliver solutions that drive results.",
    url: "https://vexioapp.com",
    siteName: "VexioApp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VexioApp — Building Digital Futures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VexioApp — Building Digital Futures",
    description:
      "We craft scalable web and mobile applications with cutting-edge technology.",
    images: ["/og-image.png"],
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
    canonical: "https://vexioapp.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
