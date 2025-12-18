import { get, ref } from "firebase/database";
import { db } from "./firebase";
import type { Nanny } from "../types/nanny";

export async function getNannyById(id: string): Promise<Nanny> {
  const snapshot = await get(ref(db, `nannies/${id}`));

  if (!snapshot.exists()) {
    throw new Error("Nanny not found");
  }

  return {
    id,
    ...snapshot.val(),
  };
}