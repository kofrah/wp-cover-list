"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, themes, setTheme } = useTheme();

  // useEffectはクライアントでしか実行されないため、これで安全にUIを表示できる。
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    console.log("test:handleToggle", resolvedTheme);
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    // マウントされる前のスケルトン
    return (
      <div className="flex justify-center items-center w-12 h-12 rounded-lg border p-2 dark:border-gray-500">
        <div className="w-6 h-6"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-end items-center dark:bg-gray-800">
      <button
        onClick={handleToggle}
        className="flex justify-center items-center w-12 h-12 rounded-lg p-2 border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
      >
        {resolvedTheme === "light" ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
