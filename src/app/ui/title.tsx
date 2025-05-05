"use client";

import Link from "next/link";
import { useResetSearch } from "../hooks/useResetSearch";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Title() {
  const { handleReset } = useResetSearch(); // リセット処理を取得
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const imageSrc = isDark
    ? "/title_image_dark_mode.png"
    : "/title_image_light_mode.png";

  return (
    <Link
      href="/?page=1"
      className="text-black dark:text-white cursor-pointer"
      onClick={handleReset}
    >
      <Image
        src={imageSrc}
        alt="週プロを表紙で検索"
        width={230}
        height={25}
        sizes="(max-width: 768px) 200px, 230px"
        className="w-[200px] md:w-[230px] h-auto"
      />
    </Link>
  );
}
