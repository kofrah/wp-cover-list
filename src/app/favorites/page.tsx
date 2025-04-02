"use client";

import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { useEffect, useState } from "react";
import { NoResult } from "../ui/noResult";
import Pagination from "../ui/pagination";
import { useFavorite } from "../hooks/useFavorite"; // お気に入り（Set）を Context から取得
import { Magazine } from "../lib/definitions";
import { getMagazineDataFromId } from "../lib/clientData"; // ID一覧から雑誌データを取得する関数
import { useSearchParams } from "next/navigation"; // クエリパラメータ（例: ?page=2）を取得
import ClientMagazinesTable from "../ui/client/clientMagazinesTable"; // 雑誌のリスト表示

export default function Page() {
  const { favorites } = useFavorite(); // Contextからお気に入りのID（Set）を取得
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1; // クエリパラメータのpage番号を取得

  // エラー
  const [error, setError] = useState<string | null>(null);
  // 読み込み中
  const [loading, setLoading] = useState(true);
  // 取得済みの雑誌リスト
  const [allMagazines, setAllMagazines] = useState<Magazine[]>([]);
  // 未取得の雑誌ID
  const [missingIds, setMissingIds] = useState<string[]>([]);

  /**
   * useEffect①：
   * favoritesが変化したときに、まだ取得していない雑誌IDがあるか確認する。
   * → 未取得のIDがあれば missingIds にセット（次の useEffect で取得）
   */
  useEffect(() => {
    console.log("useEffect①");
    if (favorites.size === 0) {
      // お気に入りが空のとき：状態を初期化して終了
      if (allMagazines.length > 0) {
        setAllMagazines([]); // 必要なときだけ初期化（無限ループ防止）
      }
      setMissingIds([]);
      setLoading(false);
      return;
    }

    // すでに取得済みの雑誌ID一覧
    const alreadyFetchedIds = new Set(
      allMagazines.map((mag) => String(mag.issue_number))
    );

    // favorites にあるが、まだ取得されていないIDを抽出
    const newMissing = [...favorites].filter(
      (id) => !alreadyFetchedIds.has(id)
    );

    // 未取得のID一覧を更新（空でもOK）
    setMissingIds(newMissing);
  }, [favorites, allMagazines]);

  /**
   * useEffect②：
   * missingIds が更新されたら、それをもとに雑誌データを取得
   */
  useEffect(() => {
    console.log("useEffect②");
    if (missingIds.length === 0) {
      console.log("missingIds.length === 0");
      setLoading(false); // 取得するものがなければ読み込み完了とみなす
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // ID一覧から雑誌データを取得（API呼び出し）
        // お気に入りページに移動した時のみこのブロックに入る想定
        console.log("missingIds", missingIds);
        const response = await getMagazineDataFromId(new Set(missingIds));

        if ("error" in response) {
          throw new Error(String(response.error)); // エラーハンドリング
        }

        // 重複を除外して、取得済みリストに追加
        setAllMagazines((prev) => {
          const newMagazines = response.uniqueSortedMagazines.filter(
            (mag) =>
              !prev.some(
                (existingMag) =>
                  String(existingMag.issue_number) === String(mag.issue_number)
              )
          );
          return [...prev, ...newMagazines];
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "データ取得エラー");
      } finally {
        setLoading(false); // 最後にローディングを終了
      }
    };

    fetchData();
  }, [missingIds]); // missingIds が変わったら再実行される

  /**
   * 表示用の雑誌リストをフィルタリング：
   * → allMagazines の中から、現在の favorites に含まれているものだけ表示
   */
  const magazines = allMagazines.filter((mag) =>
    favorites.has(String(mag.issue_number))
  );

  // 読み込み中で、表示対象もないとき：スケルトン表示
  if (loading && magazines.length === 0) {
    return <InvoicesTableSkeleton />;
  }

  // エラーがあるときはエラー表示
  if (error) {
    console.error(error);
    return <div>雑誌データの取得でエラーが発生しました</div>;
  }

  /**
   * ページネーションのための情報
   */
  const totalHits = magazines.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalHits / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // 表示するページの範囲に切り出し
  const magazinesOnPage: Magazine[] = magazines.slice(start, end);

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
