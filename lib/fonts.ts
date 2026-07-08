import localFont from "next/font/local";
import { Imprima } from "next/font/google";

export const viaodaLibre = localFont({
  src: "../public/fonts/ViaodaLibre-Regular.ttf",
  variable: "--font-viaoda",
});

export const imprima = Imprima({
  weight: "400",
  subsets: ["latin"],
});
