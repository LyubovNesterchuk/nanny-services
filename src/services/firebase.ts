import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0Jbjl35ORazfpEC3O_o5qJQ5Phdt0bRU",
  authDomain: "nanny-services-ccd02.firebaseapp.com",
  databaseURL: "https://nanny-services-ccd02-default-rtdb.firebaseio.com",
  projectId: "nanny-services-ccd02",
  storageBucket: "nanny-services-ccd02.appspot.com",
  messagingSenderId: "521391460794",
  appId: "1:521391460794:web:73f920d99edc47c8524d83",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);