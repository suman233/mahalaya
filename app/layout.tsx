import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050814",
};

export const metadata: Metadata = {
  title: "মহালয়া — The Awakening of Maa Durga | Cinematic 3D Experience",
  description:
    "An immersive cinematic 3D tribute to Mahalaya — the sacred dawn marking the beginning of Devi Paksha and the divine invocation of Maa Durga in Bengali culture. Featuring 3D temple sanctum, Birendra Krishna Bhadra soundscapes, Tarpan rituals, Kumartuli heritage, and Kolkata cultural map.",
  keywords: [
    "Mahalaya",
    "Durga Puja",
    "Maa Durga",
    "Kolkata",
    "Mahishasura Mardini",
    "Birendra Krishna Bhadra",
    "Tarpan",
    "Devi Paksha",
    "Ganges Dawn",
    "Kumartuli",
    "Bengali Culture",
    "Akashvani Kolkata",
  ],
  authors: [{ name: "Bengal Cultural Heritage & Interactive Arts" }],
  openGraph: {
    title: "মহালয়া — The Awakening of Maa Durga | Cinematic 3D Experience",
    description:
      "Witness the dawn of Devi Paksha on the banks of the Ganges. An award-winning 3D cinematic interactive journey celebrating Mahalaya.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn-IN" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050814] text-[#fbf8f0] antialiased selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

