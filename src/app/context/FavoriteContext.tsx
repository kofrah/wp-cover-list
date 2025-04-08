"use client";

import { createContext, useReducer, useEffect } from "react";

// お気に入りの状態を管理するReducer
const favoriteReducer = (
  state: Set<string>,
  action: { type: string; id: string }
) => {
  switch (action.type) {
    case "ADD":
      return new Set([...state, action.id]);
    case "REMOVE":
      const newState = new Set(state);
      newState.delete(action.id);
      return newState;
    default:
      return state;
  }
};

// Context作成
export const FavoriteContext = createContext<
  { favorites: Set<string>; toggleFavorite: (id: string) => void } | undefined
>(undefined);

// Providerコンポーネント
export const FavoriteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, dispatch] = useReducer(favoriteReducer, new Set<string>());

  // 初回レンダリング時に localStorage から取得
  useEffect(() => {
    const storedFavorites: string[] = JSON.parse(
      localStorage.getItem("favoriteMagazines") || "[]"
    );
    storedFavorites.forEach((id) => {
      dispatch({ type: "ADD", id });
    });
  }, []);

  // 状態を更新する関数
  const toggleFavorite = (id: string) => {
    dispatch({ type: favorites.has(id) ? "REMOVE" : "ADD", id });

    const updatedFavorites = favorites.has(id)
      ? [...favorites].filter((fav) => fav !== id)
      : [...favorites, id];

    localStorage.setItem("favoriteMagazines", JSON.stringify(updatedFavorites));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
