import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function FavoriteLinkButton() {
  return (
    <Link
      href="/favorites?page=1"
      className="flex justify-center items-center w-12 h-12 rounded-lg p-2 pt-3 
       hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
    >
      <BookmarkIconOutline className="w-6 h-6" />
    </Link>
  );
}
