import Table from "@/app/ui/table";
import { TableSkeleton } from "@/app/ui/skeletons/tableSkeleton";
import { Suspense } from "react";
import Pagination from "./ui/pagination";
import { getMagazineData } from "./lib/data";
import { Magazine } from "./lib/definitions";
import { NoResult } from "./ui/noResult";
import SpTwitterShareButton from "./ui/shareButtons/smartPhone/spTwitterShareButton";
import SpLineShareButton from "./ui/shareButtons/smartPhone/spLineShareButton";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // 雑誌のデータを取得
  const response = await getMagazineData(query);
  if ("error" in response) {
    console.log(response.error);
    return <div>雑誌データの取得でエラーが発生しました</div>;
  }
  const magazines: Magazine[] = response.uniqueSortedMagazines;
  const totalHits = magazines.length;

  // 1ページに表示する件数
  const itemsPerPage = 12;
  // 合計ページ数
  const totalPages = Math.ceil(totalHits / itemsPerPage);
  // 表示するページ
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const magazinesOnPage = magazines.slice(start, end);

  return (
    <>
      <Suspense fallback={<TableSkeleton />}>
        <div className="w-full px-4 pt-32 md:pt-16">
          <div className="pt-2 px-2 mb:px-4">
            {/* 言語選択とダークモード切り替え */}
            <div className="text-lg">
              <div className="relative w-full flex items-center">
                <div className="absolute left-0 flex gap-2">
                  {/* 空スペースを確保 or 左に何か置きたい場合 */}
                </div>

                <div className="mx-auto text-center">
                  {query === "" ? (
                    <p>
                      全ての表紙：
                      <span className="font-bold">{totalHits}件</span>
                    </p>
                  ) : totalHits === 0 ? (
                    <NoResult
                      attention={`${query}を含む検索結果はありませんでした。`}
                    />
                  ) : (
                    <p>
                      <span className="font-bold">&quot;{query}&quot;</span>
                      の検索結果：
                      <span className="font-bold">{totalHits}件</span>
                    </p>
                  )}
                </div>

                <div className="absolute right-0 flex items-center gap-2">
                  <SpTwitterShareButton />
                  <SpLineShareButton />
                </div>
              </div>

              <div className="pt-4">
                <Table magazines={magazinesOnPage} />
              </div>
              <div className="mt-5 mb-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
