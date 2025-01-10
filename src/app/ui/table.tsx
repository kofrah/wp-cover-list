import Image from "next/image";
import { getMagazineData } from "@/app/lib/data";
import { Magazine } from "../lib/definitions";

export default async function MagazinesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // 雑誌のデータを取得
  const response = await getMagazineData(query);
  if ("error" in response) {
    console.log(response.error);
    return <div>person_idの取得でエラーが発生しました</div>;
  }
  const magazines: Magazine[] = response.uniqueSortedMagazines;

  // magazinesのデータを表示
  // gridで表示 1行に4つ
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {magazines.map((magazine) => (
          <div key={magazine.id} className="bg-white p-4 rounded-lg shadow-md">
            <Image
              // publicディレクトリにある画像を表示
              src={`/sports_pro_wrestler_woman_805_600.png`}
              alt={magazine.detail_url}
              width={200}
              height={300}
            />
            <p className="text-sm text-gray-600 mt-2">{magazine.issue_date}</p>
          </div>
        ))}
      </div>
    </>
  );
}
