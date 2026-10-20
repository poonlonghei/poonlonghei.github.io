import type { Metadata } from "next";
import "@/styles/site.css";
import "@/styles/english.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.chavezpoon.com"),
  title: { default: "Chavez Poon | Ex umbris et imaginibus in veritatem", template: "%s | Chavez Poon" },
  description: "The work and interests of Chavez Poon: Catholic media, writing, liturgical service, and digital projects.",
  icons: { icon: "/assets/favicon/favicon.svg" },
  openGraph: { siteName: "Chavez Poon", type: "website", url: "https://www.chavezpoon.com" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
