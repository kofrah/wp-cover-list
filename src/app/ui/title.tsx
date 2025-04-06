"use client";

import Link from "next/link";
import { useResetSearch } from "../hooks/useResetSearch";

export default function Title() {
  const { handleReset } = useResetSearch(); // リセット処理を取得

  return (
    <div className="md:text-xl">
      <Link
        href="/?page=1"
        className="text-black dark:text-white cursor-pointer"
        onClick={handleReset}
      >
        「週プロ」表紙レスラー検索ツール
      </Link>
    </div>
  );
}
