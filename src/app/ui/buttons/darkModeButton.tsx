"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffectはクライアントでしか実行されないため、これで安全にUIを表示できる。
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    // マウントされる前のスケルトン
    return (
      <div className="flex justify-center items-center w-12 h-12 rounded-lg p-2 ">
        <div className="w-6 h-6"></div>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="flex justify-center items-center w-12 h-12 rounded-lg p-2 
       hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
    >
      {resolvedTheme === "light" ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;
