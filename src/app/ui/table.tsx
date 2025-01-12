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
    <div className="grid grid-cols-4 gap-4">
      {magazines.map((magazine) => (
        <Link
          key={magazine.id}
          href={magazine.detail_url}
          passHref
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <Image
              src={`/sports_pro_wrestler_woman_805_600.png`}
              alt={magazine.detail_url}
              width={200}
              height={300}
            />
            <p className="text-sm text-gray-600 mt-2">
              No.{magazine.issue_number}　
              {formatDateToJapaneseManual(magazine.issue_date)}発売
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
