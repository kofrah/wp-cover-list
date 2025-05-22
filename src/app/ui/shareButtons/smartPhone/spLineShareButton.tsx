"use client";

import { useSearchParams } from "next/navigation";
import SpShareButtonBase from "./spShareButtonBase";

export default function SpLineShareButton() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  const params = useSearchParams();
  const page = params.get("page") || "1";
  const query = params.get("query") || "";

  const shareText =
    query === ""
      ? `週刊プロレスを表紙を飾った選手で検索！\n#週プロ検索\n${baseUrl}/?page=${page}`
      : `週刊プロレスの表紙を\n${query}で検索！\n#週プロ検索\n${baseUrl}/?page=${page}/query=${query}`;
  const lineUrl = `https://line.me/R/msg/text/?`;
  const shareUrl = `${lineUrl}${encodeURIComponent(shareText)}`;

  return (
    <SpShareButtonBase
      href={shareUrl}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 34"
          width="25"
          height="25"
          fill="white"
          className="drop-shadow-sm"
        >
          <path
            transform="translate(0, 2)"
            d="M18 0C8 0 0 6.5 0 14.5C0 19.2 3 23.2 7.4 25.8L5.5 30.8C5.2 31.6 6.1 32.3 6.8 31.8L13.6 27.2C15 27.4 16.5 27.5 18 27.5C28 27.5 36 21 36 13C36 5.5 28 0 18 0Z"
          />
        </svg>
      }
      bgColor="bg-green-500"
    />
  );
}
