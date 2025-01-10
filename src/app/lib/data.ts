// "use server";

import { createClient } from "@/app/utils/supabase/server";

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

// 名前に一致するpersonIdを取得
export async function getPersonIdByName(
  name: string
): Promise<{ data: { id: number }[] } | { error: Error }> {
  console.log("name", name);
  // Supabaseクライアントを作成
  const supabase = await createClient();

  // nameに一致するperson_idを取得
  const { data, error } = await supabase
    .from("persons")
    .select("id")
    .or(`name_jp.ilike.%${name}%,name_en.ilike.%${name}%`); // 大文字・小文字を区別しない部分一致

  if (error) {
    console.log("Error fetching person", error);
    return { error };
  }

  return { data };
}

export async function getMagazinesByPersonId(personId: number) {
  // Supabaseクライアントを作成
  const supabase = createClient();

  // personIdに一致するmagazineを取得
  const { data, error } = await (
    await supabase
  )
    .from("magazines")
    .select(
      `
          id,
          title,
          issue_number,
          issue_date,
          persons: magazine_persons (person_id)
      `
    )
    .in("persons.person_id", [personId]);

  if (error) {
    console.log("Error fetching magazines", error);
    return { error };
  }

  return { data };
}
