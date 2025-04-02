"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // パスを見て、/favoriteならplaceholderを「選手名をお気に入りから検索する」に変更
  const isFavorite = pathname === "/favorites";
  const placeholder = isFavorite ? "お気に入りから検索" : "選手名を入力";

  // `query` を `useState` で管理する
  const urlQuery = searchParams.get("query")?.toString() || "";

  const [searchTerm, setSearchTerm] = useState(urlQuery);

  // URLのクエリパラメータが変更されたら、`searchTerm` を更新する
  useEffect(() => {
    // urlQuery が変わったときのみ searchTerm を更新する
    setSearchTerm((prev) => (prev !== urlQuery ? urlQuery : prev));
  }, [urlQuery]);

  // URLを更新する
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center justify-center bg-orange-600 dark:bg-black px-3 py-2 md:py-1">
      <div className="relative flex w-full max-w-md">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          className="peer block w-full rounded-md bg-gray-100 dark:bg-gray-800 py-1 pl-10 pr-4 
          text-base sm:text-lg text-gray-900 dark:text-gray-200 
          outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 
          focus:ring-2 dark:focus:ring-white dark:focus:border-white"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // inputのvalueをリアルタイムに更新するためだけに使う.handleSearchだけだとuseDebounceの影響で300ms遅れる
            handleSearch(e.target.value); // URLを更新
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-blue-500" />
      </div>
    </div>
  );
}
