import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Financial Wrapped",
  description: "Your favorite companies' year in review - like Spotify Wrapped, but for stocks",
  openGraph: {
    title: "Financial Wrapped",
    description: "Your favorite companies' year in review - like Spotify Wrapped, but for stocks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Wrapped",
    description: "Your favorite companies' year in review - like Spotify Wrapped, but for stocks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
