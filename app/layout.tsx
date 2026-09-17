import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DEFAULT_TITLE } from "@/lib/siteMeta";

const siteDescription =
  "ExQuisite Living is a private intelligence devoted to a single question: what would move you, before you thought to ask for it. By invitation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://exquisite.living"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | ExQuisite Living",
  },
  description: siteDescription,
  alternates: {
    canonical: "https://exquisite.living",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: siteDescription,
    url: "https://exquisite.living",
    siteName: "ExQuisite Living",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ExQuisite Living — Some lives are not arranged. They are composed.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// viewportFit: "cover" lets env(safe-area-inset-*) resolve to real values on
// notched/gesture-bar Android devices, so absolutely-positioned controls can
// pad themselves clear of the OS chrome instead of guessing a fixed offset.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className={`flex min-h-full flex-col overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
