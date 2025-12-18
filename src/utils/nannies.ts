import {
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
  get,
} from "firebase/database";
import { db } from "../services/firebase";
import type { Nanny } from "../types/nanny";

const PAGE_SIZE = 3;

export const fetchNannies = async (lastKey?: string) => {
  const baseRef = ref(db, "nannies");

  const q = lastKey
    ? query(
        baseRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE)
      )
    : query(baseRef, orderByKey(), limitToFirst(PAGE_SIZE));

  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return { items: [] as Nanny[], lastKey: null };
  }

  const data = snapshot.val();

  const entries = Object.entries(data) as [string, Omit<Nanny, "id">][];

  const items: Nanny[] = entries.map(([id, value]) => ({
    id,
    ...value,
  }));

  const newLastKey = entries[entries.length - 1][0];

  return {
    items,
    lastKey: newLastKey,
  };
};




