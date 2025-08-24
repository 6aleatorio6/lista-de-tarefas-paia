import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { StateStorage } from "zustand/middleware";

export class FirebaseStorage implements StateStorage<unknown> {
  getItem = async (name: string) => {
    try {
      const docRef = doc(db, "zustand", name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.state;
      }

      return null;
    } catch (error) {
      console.error("Error getting item from Firestore:", error);
      return null;
    }
  };

  setItem = async (name: string, value: string) => {
    try {
      const docRef = doc(db, "zustand", name);
      await setDoc(docRef, { state: value });
    } catch (error) {
      console.error("Error setting item in Firestore:", error);
    }
  };

  removeItem = async (name: string): Promise<void> => {
    try {
      const docRef = doc(db, "zustand", name);
      await setDoc(docRef, { state: null });
    } catch (error) {
      console.error("Error removing item from Firestore:", error);
    }
  };
}
