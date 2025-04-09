import { Suspense } from "react";
import FavoriteComponent from "../ui/favorite/favorite";

export default function Page() {
  // JSXレンダリング部（一覧 + ページネーション）
  return (
    <Suspense>
      <FavoriteComponent />
    </Suspense>
  );
}
