"use client";

import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { useEffect, useState } from "react";
import { NoResult } from "../ui/noResult";
import Pagination from "../ui/pagination";
import { useFavorite } from "../hooks/useFavorite";
import { Magazine } from "../lib/definitions";
import { getMagazineDataFromId } from "../lib/clientData";
import { useSearchParams } from "next/navigation";
import ClientMagazinesTable from "../ui/client/clientMagazinesTable";

export default function Page() {
  const { favorites } = useFavorite();
  const searchParams = useSearchParams();

  // クエリパラメータの取得
  const currentPage = Number(searchParams.get("page")) || 1;

  // 雑誌データの状態管理
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.size === 0) {
      setMagazines([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getMagazineDataFromId(favorites);
        console.log(response);
        if ("error" in response) {
          throw new Error(String(response.error));
        }
        setMagazines(response.uniqueSortedMagazines);
      } catch (err) {
        setError(err instanceof Error ? err.message : "データ取得エラー");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [favorites]);

  if (loading || magazines == undefined) {
    return <InvoicesTableSkeleton />;
  }

  if (error) {
    console.error(error);
    return <div>雑誌データの取得でエラーが発生しました</div>;
  }

  const totalHits = magazines ? magazines.length : 0;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalHits / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const magazinesOnPage: Magazine[] = magazines
    ? magazines.slice(start, end)
    : [];

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
