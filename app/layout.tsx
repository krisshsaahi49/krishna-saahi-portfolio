import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krishna Saahi Yavana | SDET Portfolio",
  description:
    "Portfolio for Krishna Saahi Yavana, an SDET specializing in UI, API, database, mobile, cloud, and AI/ML testing automation.",
  openGraph: {
    title: "Krishna Saahi Yavana | SDET Portfolio",
    description:
      "Automation engineer with 7+ years of experience across Selenium, Playwright, Rest Assured, Java, JavaScript, Python, AWS, Kubernetes, and DevOps pipelines.",
    type: "website"
  }
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
