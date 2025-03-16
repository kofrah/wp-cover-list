"use client";

import { useFavorite } from "@/app/hooks/useFavorite";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

export default function FavoriteButton({ magazineId }: { magazineId: string }) {
  const { favorites, toggleFavorite } = useFavorite();
  const isFavorite = favorites.has(magazineId);
  console.log("isFavorite,magazineId", magazineId, isFavorite);

  return (
    <button
      className={`pr-4 ml-auto text-xl ${
        isFavorite ? "text-orange-600 dark:text-white" : "text-gray-400"
      } transition-colors duration-200`}
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(magazineId);
      }}
    >
      {isFavorite ? (
        <BookmarkIconSolid className="w-6 h-6" />
      ) : (
        <BookmarkIconOutline className="w-6 h-6" />
      )}
    </button>
  );
}
