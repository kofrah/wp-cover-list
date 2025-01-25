"use client";
import Search from "../search";
import useHeaderScroll from "../../hooks/useHeaderScroll";

const SmartPhoneSecondHeader = () => {
  const isHeaderActive = useHeaderScroll();
  const styles = {
    active: "w-full fixed top-14 duration-300",
    notActive: "w-full fixed hidden duration-300",
  };
  const style = isHeaderActive ? styles.active : styles.notActive;
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
