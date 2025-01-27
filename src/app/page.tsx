import Search from "@/app/ui/search";
import Table from "@/app/ui/table";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Pagination from "./ui/pagination";
import { getMagazineData } from "./lib/data";
import { Magazine } from "./lib/definitions";
import { NoResult } from "./ui/noResult";
import SortButton from "./ui/buttons/sortButton";
import Header from "./ui/Headers/header";
import SmartPhoneSecondHeader from "./ui/Headers/smartPhoneSecondHeader";

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
  console.log("test:Page", query, currentPage, totalHits, totalPages);
  // 表示するページ
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const magazinesOnPage = magazines.slice(start, end);

  return (
    <>
      <Header />
      <div className="w-full px-4 pt-28 md:pt-16">
        <div className="px-2 mb:px-4">
          {/* 言語選択とダークモード切り替え */}
          <div className="text-lg">
            <Suspense fallback={<InvoicesTableSkeleton />}>
              <div>
                {query === "" ? (
                  <p className="text-center">
                    全ての表紙：<span className="font-bold">{totalHits}件</span>
                  </p>
                ) : totalHits === 0 ? (
                  <NoResult query={query} />
                ) : (
                  <p className="text-center">
                    <span className="font-bold">"{query}"</span>の検索結果：
                    <span className="font-bold">{totalHits}件</span>
                  </p>
                )}
              </div>
            </Suspense>
            {/* ソートボタン */}
            {/* 新しい順と古い順のラジオボタン*/}
            {/* <SortButton /> */}
            <Suspense
              key={query + currentPage}
              fallback={<InvoicesTableSkeleton />}
            >
              <div className="pt-4">
                <Table magazines={magazinesOnPage} />
              </div>
            </Suspense>
            <div className="mt-5 mb-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
