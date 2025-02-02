import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { tmpFont } from "./ui/fonts";

export const metadata: Metadata = {
  title: "週プロ表紙検索ツール",
  description: "「週刊プロレス」を表紙を飾ったレスラーで検索するツール",
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
        <ThemeProvider attribute="class" defaultTheme="systme" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
