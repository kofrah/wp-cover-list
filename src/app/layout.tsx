import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { FavoriteProvider } from "./context/FavoriteContext";
import Header from "./ui/Headers/header";

export const metadata: Metadata = {
  title: "週プロ表紙検索ツール",
  description: "「週刊プロレス」を表紙を飾ったレスラーの名前で検索するツール",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
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
        className={`font-sans antialiased text-black dark:text-dark_contentText
                  bg-orange-600 dark:bg-black
                    tracking-wide
                    min-h-screen  flex flex-col 
                   `}
      >
        <FavoriteProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="flex-grow bg-light_contentBackGround dark:bg-dark_contentBackGround">
              {children}
            </main>
          </ThemeProvider>
        </FavoriteProvider>
      </body>
    </html>
  );
}
