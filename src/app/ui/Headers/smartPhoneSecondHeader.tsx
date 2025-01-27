"use client";
import Search from "../search";
import useHeaderScroll from "../../hooks/useHeaderScroll";

const SmartPhoneSecondHeader = () => {
  const isHeaderActive = useHeaderScroll();
  const styles = {
    base: "w-full fixed top-14 transition-all duration-700 ease-in-out opacity-0 transform  pointer-events-none bg-brue-200 dark:bg-black backdrop-blur-lg",
    active: "w-full fixed opacity-100 translate-y-0 pointer-events-auto",
  };

  const style = `${styles.base} ${isHeaderActive ? styles.active : ""}`;
  console.log("isHeaderActive", isHeaderActive);
  console.log("style", style);
  return (
    <>
      <div className={style}>
        <Search placeholder="選手名を入力" />
      </div>
    </>
  );
};

export default SmartPhoneSecondHeader;
