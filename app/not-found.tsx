import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { viaodaLibre, imprima } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Page Not Found | ExQuisite Living",
  description: "The page you are seeking could not be found. Return to ExQuisite Living.",
};

export default function NotFound() {
  return (
    <main className={`relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-center text-white ${imprima.className}`}>
      {/* Dark atmospheric background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#142019]/60 via-[#0a0a0a]/90 to-[#0a0a0a]"
      />

      {/* Brand logo & seal */}
      <div className="relative z-10 mb-8 flex flex-col items-center gap-4">
        <Link href="/" className="transition-transform duration-300 hover:scale-105">
          <Image
            src="/iconlogo_cream.png"
            alt="ExQuisite Living"
            width={80}
            height={80}
            priority
            className="h-14 w-auto drop-shadow-md"
          />
        </Link>
        <span className="text-[10px] font-light tracking-[0.3em] uppercase text-[#E6C19A]">
          404 — Page Not Found
        </span>
      </div>

      {/* Main Headline & Message */}
      <div className="relative z-10 max-w-lg">
        <h1 className={`mb-4 text-3xl font-light leading-tight text-white md:text-4xl ${viaodaLibre.className}`}>
          This path leads to <br />
          <span className="italic text-[#E6C19A]">unseen waters.</span>
        </h1>

        <p className="mb-8 text-xs font-light leading-relaxed text-white/70 md:text-sm">
          The page or resource you requested does not exist or may have moved quietly elsewhere.
        </p>

        {/* Return Button */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs tracking-[0.2em] uppercase text-white backdrop-blur-md transition-all duration-300 hover:border-[#E6C19A] hover:bg-[#E6C19A] hover:text-black ${imprima.className}`}
        >
          <span>← Return to Landing</span>
        </Link>
      </div>

      {/* Copyright Footer */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-light tracking-wider text-white/25">
        © 2026 ExQuisite Living.
      </p>
    </main>
  );
}
