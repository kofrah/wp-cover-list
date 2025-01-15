"use client";
import Search from "./search";
import useHeaderScroll from "../hooks/useHeaderScroll";

const SecondHeader = () => {
  const isHeaderActive = useHeaderScroll();
  const styles = {
    active: "w-full fixed opacty-100 duration-300",
    notActive: "w-full fixed opacity-0 duration-300",
  };
  const style = isHeaderActive ? styles.active : styles.notActive;
  console.log("isHeaderActive", isHeaderActive);
  console.log("style", style);
  return (
    <>
      <div className={style}>
        {/* <div className="w-full sticky top-0 z-30"> */}
        <Search placeholder="選手名を入力" />
      </div>
    </>
  );
};

export default SecondHeader;
