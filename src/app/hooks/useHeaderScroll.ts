import { useEffect, useState } from "react";

// スクロールを制御する
/**
 * @param {number}  activePoint - 表示のポイントを数値で取得
 * @return {boolean} 表示、非表示のbool値を返却する
 */
const useHeaderScroll = (): boolean => {
  const [isHeaderActive, setIsHeaderActive] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 下スクロール時
        setIsHeaderActive(false);
      } else {
        // 上スクロール時
        setIsHeaderActive(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return isHeaderActive;
};

export default useHeaderScroll;
