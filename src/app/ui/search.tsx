"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  // 検索ロジック
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

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
    <div className="flex items-center justify-center bg-blue-200 dark:bg-black px-3 py-2 md:py-1">
      <div className="relative flex w-full max-w-md">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          className="peer block w-full  rounded-md bg-gray-100 dark:bg-gray-800 py-2 pl-10 pr-4 text-sm 
        text-gray-900 dark:text-gray-200 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        dark:focus:ring-white dark:focus:border-white"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-blue-500" />
      </div>
    </div>
  );
}
