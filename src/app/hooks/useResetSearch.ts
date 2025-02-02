import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useResetSearch() {
  const [isClicked, setIsClicked] = useState(false);
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentParams = useSearchParams();

  const handleReset = () => {
    // pageが1かつqueryがない場合はなにもしない
    if (currentParams.get("page") === "1" && !currentParams.get("query")) {
      console.log("Already reset");
      return;
    }

    if (isClicked) {
      console.log("Already clicked");
      return;
    }

    setIsClicked(true);

    try {
      console.log("Reset search excute");
      const params = new URLSearchParams();
      params.set("page", "1");
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);

      // クリック防止を一定時間後に解除
      setTimeout(() => setIsClicked(false), 1000);
    } catch (error) {
      console.error("Navigation failed", error);
      setIsClicked(false);
    }
  };

  return { handleReset, isClicked };
}
