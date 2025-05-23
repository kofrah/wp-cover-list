import { Suspense } from "react";
import DarkModeToggle from "../buttons/darkModeButton";
import FavoriteLinkButton from "../buttons/favoriteLinkButton";
import Search from "../search";
import Title from "../title";
import TitleSkeleton from "../skeletons/titleSkeleton";
import SearchSkeleton from "../skeletons/searchSkeleton";

const PCHeader = () => {
  return (
    <>
      {/* PC用ヘッダー */}
      <div
        className="fixed top-0 z-50 flex w-full justify-between items-center py-1
       bg-orange-600 dark:bg-black backdrop-blur-lg
        border-b border-gray-200 dark:border-none"
      >
        <div className="flex justify-start items-center ml-3">
          <Suspense fallback={<TitleSkeleton />}>
            <Title />
          </Suspense>
        </div>
        <Suspense fallback={<SearchSkeleton />}>
          <Search id="search-pc" />
        </Suspense>
        <div className="flex justify-end items-center mr-3">
          <FavoriteLinkButton />
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
};

export default PCHeader;
