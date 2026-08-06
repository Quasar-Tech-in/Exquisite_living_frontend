import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExQuisite Living — A sensibility, not a service",
  description: "ExQuisite Living is an intelligence devoted to a single question: what would move you, before you thought to ask for it. By invitation.",
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
