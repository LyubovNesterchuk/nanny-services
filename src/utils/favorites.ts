// import type { Nanny } from "../types/nanny";

// const STORAGE_KEY = "favorites";

// export function getFavorites(): Nanny[] {
//   try {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
//   } catch {
//     return [];
//   }
// }

// export function isFavorite(nannyName: string): boolean {
//   const favorites = getFavorites();
//   return favorites.some(item => item.name === nannyName);
// }

// export function toggleFavorite(nanny: Nanny): boolean {
//   const favorites = getFavorites();
//   const exists = favorites.some(item => item.name === nanny.name);

//   const updatedFavorites = exists
//     ? favorites.filter(item => item.name !== nanny.name)
//     : [...favorites, nanny];

//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify(updatedFavorites)
//   );

//   return !exists;
// }


import { ref, get, set, remove } from "firebase/database";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export const isFavorite = async (nannyId: string): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) return false;

  const favRef = ref(db, `users/${user.uid}/favorites/${nannyId}`);
  const snapshot = await get(favRef);

  return snapshot.exists();
};

export const toggleFavorite = async (nannyId: string): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authorized");

  const favRef = ref(db, `users/${user.uid}/favorites/${nannyId}`);
  const snapshot = await get(favRef);

  if (snapshot.exists()) {
    await remove(favRef);
    return false;
  } else {
    await set(favRef, true);
    return true;
  }
};