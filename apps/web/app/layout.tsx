import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clyyo",
  description: "Event management dashboard for hackathons and conferences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
