import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { FavoriteProvider } from "./context/FavoriteContext";
import Header from "./ui/Headers/header";
import SpTwitterShareButton from "./ui/shareButtons/smartPhone/spTwitterShareButton";
import SpLineShareButton from "./ui/shareButtons/smartPhone/spLineShareButton";
import { Suspense } from "react";
import SpShareButtonSkeleton from "./ui/skeletons/spShareButtonSkeleton";

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
            <div className="fixed bottom-4 right-4 flex flex-col md:flex-row gap-3 z-50">
              <Suspense fallback={<SpShareButtonSkeleton />}>
                <SpTwitterShareButton />
              </Suspense>
              <Suspense fallback={<SpShareButtonSkeleton />}>
                <SpLineShareButton />
              </Suspense>
            </div>
          </ThemeProvider>
        </FavoriteProvider>
      </body>
    </html>
  );
}
