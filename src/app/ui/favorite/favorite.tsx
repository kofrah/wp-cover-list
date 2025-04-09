"use client";

import { TableSkeleton } from "@/app/ui/skeletons/tableSkeleton";
import { useEffect, useState } from "react";
import { NoResult } from "../noResult";
import Pagination from "../pagination";
import { useFavorite } from "../../hooks/useFavorite"; // お気に入り（Set）を Context から取得
import { Magazine } from "../../lib/definitions";
import { getMagazineDataFromId } from "../../lib/clientData"; // ID一覧から雑誌データを取得する関数
import { useSearchParams } from "next/navigation"; // クエリパラメータ（例: ?page=2）を取得
import ClientMagazinesTable from "../client/clientMagazinesTable"; // 雑誌のリスト表示

export default function FavoriteComponent() {
  const { favorites } = useFavorite(); // Contextからお気に入りのID（Set）を取得
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // クエリパラメータのpage番号を取得

  // エラー
  const [error, setError] = useState<string | null>(null);
  // 取得済みの雑誌リスト
  const [fetchedMagazines, setFetchedMagazines] = useState<Magazine[]>([]);
  // fetch実行されたか
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  /**
   * useEffect：
   * お気に入りContextをもとに雑誌データを取得
   */
  useEffect(() => {
    console.log("useEffect");
    if (hasFetchedOnce) {
      // お気に入り削除時はAPI呼び出しをしない
      console.log("hasFetchedOnce: true");
      return;
    }

    // ID一覧から雑誌データを取得（API呼び出し）
    const fetchData = async () => {
      try {
        const response = await getMagazineDataFromId(favorites);
        console.log("response", response);
        if ("error" in response) {
          throw new Error(String(response.error));
        }
        // 取得済みリストに追加
        setFetchedMagazines(response.uniqueSortedMagazines);
        setTimeout(() => {
          setHasFetchedOnce(true);
        }, 700);
      } catch (err) {
        setError(err instanceof Error ? err.message : "データ取得エラー");
      }
    };
    fetchData();
  }, [favorites, hasFetchedOnce]);

  /**
   * 表示用の雑誌リストをフィルタリング：
   * → fetchedMagazines の中から、現在の favorites に含まれているものだけ表示
   */
  const favoriteMagazines = fetchedMagazines.filter((mag) =>
    favorites.has(String(mag.issue_number))
  );

  if (!hasFetchedOnce) {
    return <TableSkeleton />;
  }

  // エラーがあるときはエラー表示
  if (error) {
    console.error(error);
    return <div>雑誌データの取得でエラーが発生しました</div>;
  }

  // ページネーションのための情報
  const totalHits = favoriteMagazines.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalHits / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // 表示するページの範囲に切り出し
  const magazinesOnPage: Magazine[] = favoriteMagazines.slice(start, end);

  // JSXレンダリング部（一覧 + ページネーション）
  return (
    <div className="w-full px-4 pt-28 md:pt-16">
      <div className="px-2 mb:px-4">
        <div className="text-lg">
          {favorites.size ? (
            <p className="text-center">
              お気に入りの件数：
              <span className="font-bold">{favorites.size}件</span>
            </p>
          ) : (
            <NoResult attention="お気に入りはありませんでした" />
          )}

          <div className="pt-4">
            <ClientMagazinesTable magazines={magazinesOnPage} />
          </div>
          <div className="mt-5 mb-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
