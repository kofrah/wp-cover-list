"use client";

import { useResetSearch } from "../hooks/useResetSearch";

export default function Title() {
  const { handleReset } = useResetSearch(); // リセット処理を取得

  return (
    <div className="md:text-xl">
      <span
        className="text-black dark:text-white cursor-pointer"
        onClick={handleReset}
      >
        「週プロ」表紙レスラー検索ツール
      </span>
    </div>
  );
}
