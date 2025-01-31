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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6">
      {magazines.map((magazine) => (
        <Link
          key={magazine.id}
          href={magazine.detail_url}
          passHref
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="
          p-1 rounded-sm dark:shadow-gray-700 cursor-pointer 
          hover:shadow-lg dark:hover:shadow-gray-600 transition-shadow 
          duration-300 flex flex-col"
          >
            <div className="flex justify-center items-center border-black">
              <Image
                src={`/sampleCover3.png`}
                alt={magazine.detail_url}
                width={600}
                height={800}
              />
            </div>
            <span className="text-black dark:text-white mt-1">
              <p className="text-base text-bold">#{magazine.issue_number}</p>
              <p className="text-xs md:text-sm">
                {formatDateToJapaneseManual(magazine.issue_date)}発売
              </p>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
