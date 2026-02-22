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
  title: "Pundir Tech — Building Digital Futures",
  description:
    "Pundir Tech is an IT services company specializing in web development, mobile apps, cloud & DevOps, and real-time solutions. We craft scalable, production-grade software.",
  keywords: [
    "web development",
    "mobile app development",
    "MERN stack",
    "React Native",
    "IT services",
    "Node.js",
    "AWS",
    "Pundir Tech",
  ],
  openGraph: {
    title: "Pundir Tech — Building Digital Futures",
    description:
      "We craft scalable web and mobile applications with cutting-edge technology.",
    type: "website",
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
