import Image from "next/image";
import { Magazine } from "../lib/definitions";
import { formatDateToJapaneseManual } from "../lib/utils";
import Link from "next/link";
import FavoriteButton from "./buttons/favoriteButton";

export default function MagazinesTable({
  magazines,
}: {
  magazines: Magazine[];
}) {
  // gridで表示 1行に4つ
  return (
    // レスポンシブ対応　スマートフォンの場合は1行に2つ
    // 余白を適切に設定
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6">
      {magazines.map((magazine) => (
        <div
          key={String(magazine.id)}
          className="
          p-1 rounded-sm dark:shadow-gray-700
          hover:shadow-lg dark:hover:shadow-gray-600 transition-shadow 
          duration-300 flex flex-col"
        >
          <Link
            key={magazine.id}
            href={magazine.detail_url}
            passHref
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="flex justify-center items-center cursor-pointer  border-black">
              <Image
                src={`/sampleCover3.png`}
                alt={magazine.detail_url}
                width={600}
                height={800}
              />
            </div>
          </Link>

          <div className="mt-1 flex justify-between items-center">
            <div>
              <p className="text-black dark:text-white text-base font-bold">
                No.{magazine.issue_number}
              </p>
              <p className="text-light_table_item_explanation dark:text-dark_table_item_explanation text-xs md:text-sm">
                {formatDateToJapaneseManual(magazine.issue_date)}発売
              </p>
            </div>
            <FavoriteButton magazineId={String(magazine.issue_number)} />
          </div>
        </div>
      ))}
    </div>
  );
}
