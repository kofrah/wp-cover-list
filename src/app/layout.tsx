import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { tmpFont } from "./ui/fonts";
import { FavoriteProvider } from "./context/FavoriteContext";
import Header from "./ui/Headers/header";
// import { Suspense } from "react";

export const metadata: Metadata = {
  title: "週プロ表紙検索ツール",
  description: "「週刊プロレス」を表紙を飾ったレスラーの名前で検索するツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Hydrationの警告を抑制する
    <html lang="en" className="" suppressHydrationWarning>
      <body
        className={`${tmpFont.className} antialiased 
        text-black dark:text-dark_contentText
        bg-light_contentBackGround
        dark:bg-dark_contentBackGround
        tracking-wide
        `}
      >
        <FavoriteProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
          </ThemeProvider>
        </FavoriteProvider>
      </body>
    </html>
  );
}
