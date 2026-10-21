import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import { kanjiGlyphs } from "@/components/data";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

/* The kanji face is requested for exactly the glyphs on the page, a few KB instead of megabytes. */
const kanjiHref = `https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@800&display=swap&text=${encodeURIComponent(kanjiGlyphs)}`;

export const metadata: Metadata = {
  title: "Kurenai Comics: visionary, creator-owned comics",
  description:
    "Fourteen creator-owned comic series, drawn by hand and printed in one crimson. Read Scarlet Shogun #1 free, or join the Red Pass for every issue.",
};

export const viewport: Viewport = {
  themeColor: "#c41d33",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={kanjiHref} />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
