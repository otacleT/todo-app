import { UniqueIdentifier } from "@dnd-kit/core";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";

export const addUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const setUser = async (uid: UniqueIdentifier) => {
  await setDoc(
    doc(db, "users", String(uid)),
    {
      title: "勉強する",
      date: "2022-07-23",
      color: "#303030",
    },
    { merge: true },
  );
};
