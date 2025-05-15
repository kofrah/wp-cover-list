"use client";

import Link from "next/link";
import { useResetSearch } from "../hooks/useResetSearch";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Title() {
  const { handleReset } = useResetSearch(); // リセット処理を取得
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[200px] md:w-[230px] h-[25px]" />;
  }

  let src;
  switch (resolvedTheme) {
    case "light":
      src = "/title_image_light_mode.png";
      break;
    case "dark":
      src = "/title_image_dark_mode.png";
      break;
    default:
      // 来ないはずだが念の為
      src = "/title_image_light_mode.png";
      break;
  }

  return (
    <Link
      href="/?page=1"
      className="text-black dark:text-white cursor-pointer"
      onClick={handleReset}
    >
      <Image
        src={src}
        alt="週プロを表紙で検索"
        width={230}
        height={25}
        sizes="(max-width: 768px) 200px, 230px"
        className="w-[200px] md:w-[230px] h-auto"
        priority={true}
      />
    </Link>
  );
}
