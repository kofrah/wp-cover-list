"use client";
import Search from "../search";
import useHeaderScroll from "../../hooks/useHeaderScroll";
import { Suspense } from "react";
import SearchSkeleton from "../skeletons/searchSkeleton";

const SmartPhoneSecondHeader = () => {
  const isHeaderActive = useHeaderScroll();
  const styles = {
    base: "w-full fixed top-12 transition-all duration-700 ease-in-out opacity-0 transform  pointer-events-none bg-orange-600 dark:bg-black backdrop-blur-lg",
    active: "w-full fixed opacity-100 translate-y-0 pointer-events-auto",
  };

  const style = `${styles.base} ${isHeaderActive ? styles.active : ""}`;
  return (
    <>
      <div className={style}>
        <Suspense fallback={<SearchSkeleton />}>
          <Search id="search-mobile" />
        </Suspense>
      </div>
    </>
  );
};

export default SmartPhoneSecondHeader;
