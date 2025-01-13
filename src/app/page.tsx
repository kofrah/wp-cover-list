import Search from "@/app/ui/search";
import Table from "@/app/ui/table";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Pagination from "./ui/pagination";
import { getMagazineData } from "./lib/data";
import { Magazine } from "./lib/definitions";
import { NoResult } from "./ui/noResult";
import SortButton from "./ui/buttons";

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
    <div className="w-full">
      <div className="flex w-full items-center justify-between mt-4 px-4 py-2">
        <h1 className={`${lusitana.className} text-2xl`}>
          週刊プロレス表紙検索ツール
        </h1>
      </div>
      {/* 言語選択とダークモード切り替え */}
      <div className="flex w-full justify-end px-4 py-2 gap-4">
        <div>
          <button>日本語</button>
          <button>English</button>
        </div>
        <div>
          <button>ダークモード</button>
        </div>
      </div>
      <div className="px-5">
        <div className="mt-5 flex items-center justify-center gap-4 px-4">
          <Search placeholder="選手名を入力" />
        </div>
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <div className="text-lg mt-5 flex w-full justify-center">
            <p>検索結果：{totalHits}件</p>
          </div>
          <div>{totalHits === 0 && <NoResult />}</div>
        </Suspense>
        {/* ソートボタン */}
        {/* 新しい順と古い順のラジオボタン*/}
        <SortButton />
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <Table magazines={magazinesOnPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
