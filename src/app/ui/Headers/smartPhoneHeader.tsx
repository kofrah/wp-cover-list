import DarkModeToggle from "../buttons/darkModeButton";
import SmartPhoneSecondHeader from "./smartPhoneSecondHeader";
import Title from "../title";
import FavoriteLinkButton from "../buttons/favoriteLinkButton";
import { Suspense } from "react";
import TitleSkeleton from "../skeletons/titleSkeleton";

const SmartPhoneHeader = () => {
  return (
    <>
      <div
        className="fixed top-0 flex w-full justify-between items-center
                   pt-[env(safe-area-inset-top)]
                 bg-orange-600 dark:bg-black
                   backdrop-blur-lg"
      >
        <div className="flex justify-start items-center ml-3 mt-1">
          <Suspense fallback={<TitleSkeleton />}>
            <Title />
          </Suspense>
        </div>
        <div className="flex justify-end items-center mr-3">
          <FavoriteLinkButton />
          <DarkModeToggle />
        </div>
        <SmartPhoneSecondHeader />
      </div>
    </>
  );
};

export default SmartPhoneHeader;
