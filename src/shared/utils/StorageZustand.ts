import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export abstract class FirebaseStorage {
  getItem = async (name: string) => {
    try {
      const docRef = doc(db, "zustand", name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return { state: data.state };
      }
      return null;
    } catch (error) {
      console.error("Error getting item from Firestore:", error);
      return null;
    }
  };

  static setItem = async (name: string, value: { state: unknown }) => {
    try {
      const docRef = doc(db, "zustand", name);
      await setDoc(docRef, value);
    } catch (error) {
      console.error("Error setting item in Firestore:", error);
    }
  };

  static removeItem = async (name: string): Promise<void> => {
    try {
      const docRef = doc(db, "zustand", name);
      await setDoc(docRef, { state: null });
    } catch (error) {
      console.error("Error removing item from Firestore:", error);
    }
  };
}
