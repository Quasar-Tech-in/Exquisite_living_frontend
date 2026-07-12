import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExQuisite Living — A sensibility, not a service",
  description: "ExQuisite Living is an intelligence devoted to a single question: what would move you, before you thought to ask for it. By invitation.",
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
