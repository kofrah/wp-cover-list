import {
  Aoboshi_One,
  BIZ_UDPGothic,
  Dela_Gothic_One,
  Inter,
  Lusitana,
  Noto_Sans_JP,
  Noto_Serif,
  Noto_Serif_JP,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
});

export const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
});

export const aoboshiOne = Aoboshi_One({
  subsets: ["latin"],
  weight: "400",
});

export const tmpFont = Dela_Gothic_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-serif",
});
