import DarkModeToggle from "./buttons/darkModeButton";
import Title from "./title";

const Header = () => {
  return (
    <div
      className="sticky top-0 z-50 flex w-full justify-between items-center py-1
     dark:bg-black backdrop-blur-lg bg-white"
    >
      <div className="flex justify-start items-center ml-3 mt-1">
        <Title />
      </div>
      <div className="flex justify-end items-center mr-3">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Header;
