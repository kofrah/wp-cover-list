import { createClient } from "@/app/utils/supabase/server";
import { Magazine } from "./definitions";

// 全ての雑誌を取得
export const getAllMagazines = async () => {
  try {
    // Supabaseクライアントを作成
    const supabase = await createClient();
    // const supabase = createClient();

    // 全てのmagazineを取得
    const { data, error } = await supabase.from("magazines").select(
      `
        id,
        issue_number,
        issue_date,
        persons: magazine_persons!magazine_id (
            person: person_id!inner (
                name_jp,
                name_en
            )
        )
      `
    );

    if (error) {
      console.error("Error fetching magazines:", error);
      return { error };
    }

    return { data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: err };
  }
};

/**
 * 選手名に一致する雑誌データを取得
 * @param name 選手名
 * @returns 雑誌データ
 */
export async function getMagazineData(name: string): Promise<
  | {
      uniqueSortedMagazines: Magazine[];
    }
  | { error: Error }
> {
  // Supabaseクライアントを作成
  const supabase = await createClient();

  // nameに一致するperson_idを取得
  const { data, error } = await supabase
    .from("persons")
    .select(
      `
      magazine_persons:magazine_persons (
        magazines:magazines (*)
      )
      `
    )
    .or(`name_jp.ilike.%${name}%,name_en.ilike.%${name}%`); // 大文字・小文字を区別しない部分一致

  if (error) {
    console.log("Error fetching person", error);
    return { error };
  }

  // データ構造の調整 (ネストされたデータをフラット化する)
  const magazines = data
    .flatMap((person) => person.magazine_persons.map((mp) => mp.magazines))
    .flat();

  // 重複を取り除き、issue_dateでソート
  const uniqueSortedMagazines: Magazine[] = Array.from(
    new Map(
      magazines.map((magazine) => [magazine.id, magazine]) // idで重複を排除
    ).values()
  ).sort(
    (a, b) =>
      new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
  ); // issue_dateで降順ソート

  return { uniqueSortedMagazines };
}
