import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useResetSearch() {
  const [isClicked, setIsClicked] = useState(false);
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    if (isClicked) {
      console.log("Already clicked");
      return;
    }

    setIsClicked(true);

    try {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);

      // クリック防止を一定時間後に解除
      setTimeout(() => setIsClicked(false), 10000);
    } catch (error) {
      console.error("Navigation failed", error);
      setIsClicked(false);
    }
  };

  return { handleReset, isClicked };
}
