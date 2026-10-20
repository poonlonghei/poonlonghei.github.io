import type { Metadata } from "next";
import "../assets/css/portfolio.css";

export const metadata: Metadata = {
  title: "Web Design Portfolio | Chavez Poon",
  description: "Selected website design and development projects by Chavez Poon.",
  metadataBase: new URL("https://www.chavezpoon.com"),
  openGraph: {
    title: "Web Design Portfolio | Chavez Poon",
    description: "Selected website design and development projects by Chavez Poon.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
