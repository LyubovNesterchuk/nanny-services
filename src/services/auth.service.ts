import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => signOut(auth);