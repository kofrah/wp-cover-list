import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchSkeleton() {
  return (
    <div className="flex items-center justify-center bg-orange-600 dark:bg-black px-3 py-2 md:py-1">
      <div className="relative flex w-full max-w-md">
        <label htmlFor="searchSkeleton" className="sr-only">
          Search
        </label>
        <input
          id="searchSkeleton"
          className="peer block w-full rounded-md bg-gray-100 dark:bg-gray-800 py-1 pl-10 pr-4 
          text-base sm:text-lg text-gray-900 dark:text-gray-200 
          outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 
          focus:ring-2 dark:focus:ring-white dark:focus:border-white"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-blue-500" />
      </div>
    </div>
  );
}
