import Image from "next/image";
import { Magazine } from "../lib/definitions";
import { formatDateToJapaneseManual } from "../lib/utils";
import Link from "next/link";

export default async function MagazinesTable({
  magazines,
}: {
  magazines: Magazine[];
}) {
  // gridで表示 1行に4つ
  return (
    // レスポンシブ対応　スマートフォンの場合は1行に2つ
    // 余白を適切に設定
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {magazines.map((magazine) => (
        <Link
          key={magazine.id}
          href={magazine.detail_url}
          passHref
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md dark:shadow-gray-700 cursor-pointer hover:shadow-lg dark:hover:shadow-gray-600 transition-shadow duration-300 flex flex-col">
            <div className="flex justify-center items-center">
              <Image
                src={`/sports_pro_wrestler_woman_805_600.png`}
                alt={magazine.detail_url}
                width={200}
                height={300}
              />
            </div>
            <span className="text-gray-600 mt-2">
              <p className="text-sm dark:text-gray-300">
                No.{magazine.issue_number}
              </p>
              <p className="text-xs dark:text-gray-300">
                {formatDateToJapaneseManual(magazine.issue_date)}発売
              </p>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
