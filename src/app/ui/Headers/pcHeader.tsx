import DarkModeToggle from "../buttons/darkModeButton";
import Search from "../search";
import Title from "../title";

const PCHeader = () => {
  return (
    <>
      {/* PC用ヘッダー */}
      <div
        className="fixed top-0 z-50 flex w-full justify-between items-center py-1
        dark:bg-black backdrop-blur-lg bg-white 
        border-b border-gray-200 dark:border-none"
      >
        <div className="flex justify-start items-center ml-3 mt-1">
          <Title />
        </div>
        <Search placeholder="選手名を入力" />
        <div className="flex justify-end items-center mr-3">
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
};

export default PCHeader;
