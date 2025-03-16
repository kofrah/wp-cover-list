"use client";

import { createClient as createBrowserClient } from "@/app/utils/supabase/client";
import { Magazine } from "./definitions";

/**
 * 雑誌IDに一致する雑誌データを取得
 * @param idSet 選手名
 * @returns 雑誌データ
 */
export async function getMagazineDataFromId(idSet: Set<string>): Promise<
  | {
      uniqueSortedMagazines: Magazine[];
    }
  | { error: Error }
> {
  if (idSet.size === 0) {
    return { uniqueSortedMagazines: [] };
  }

  // Supabaseクライアントを作成
  const supabase = createBrowserClient();

  // idSetを配列に変換
  const idArray = Array.from(idSet);

  // idに基づいて雑誌データを取得
  const { data, error } = await supabase
    .from("magazines")
    .select("*")
    .in("issue_number", idArray); // idのリストでフィルタリング

  if (error || !data) {
    console.error("Error fetching magazines", error);
    return { error };
  }

  // `Magazine` 型に適合させる
  const formattedData: Magazine[] = data.map((magazine) => ({
    id: magazine.id,
    issue_number: String(magazine.issue_number ?? ""), // number | null → string
    issue_date: magazine.issue_date ?? "", // null の場合は空文字
    release_date: magazine.release_date ?? "", // null の場合は空文字
    image_url: magazine.image_url ?? "", // null の場合は空文字
    detail_url: magazine.detail_url ?? "", // null の場合は空文字
  }));

  // 重複を取り除き、issue_date で降順ソート
  const uniqueSortedMagazines: Magazine[] = Array.from(
    new Map(formattedData.map((magazine) => [magazine.id, magazine])).values()
  ).sort(
    (a, b) =>
      new Date(b.issue_date || "").getTime() -
      new Date(a.issue_date || "").getTime()
  ); // issue_date で降順ソート

  return { uniqueSortedMagazines };
}
