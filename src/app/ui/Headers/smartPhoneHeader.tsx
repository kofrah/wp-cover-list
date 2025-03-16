import DarkModeToggle from "../buttons/darkModeButton";
import SmartPhoneSecondHeader from "./smartPhoneSecondHeader";
import Title from "../title";
import FavoriteLinkButton from "../buttons/favoriteLinkButton";

const SmartPhoneHeader = () => {
  return (
    <>
      <div
        className="fixed top-0 flex w-full justify-between items-center py-1 
        bg-orange-600 #F26F2F dark:bg-black
        backdrop-blur-lg"
      >
        <div className="flex justify-start items-center ml-3 mt-1">
          <Title />
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
