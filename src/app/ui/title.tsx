"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Title() {
  const [isClicked, setIsClicked] = useState(false); // クリック状態を管理
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (isClicked) {
      console.log("Already clicked");
      return; // すでにクリックされている場合は何もしない
    }

    setIsClicked(true); // クリック状態を有効にする

    try {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);

      // 一定時間後にクリック状態を解除
      setTimeout(() => setIsClicked(false), 10000); // 3秒後に解除
    } catch (error) {
      console.error("Navigation failed", error);
      setIsClicked(false); // エラー発生時にクリック解除
    }
  };

  return (
    <span className="text-black dark:text-white" onClick={handleClick}>
      「週プロ」表紙レスラー検索ツール
    </span>
  );
}
