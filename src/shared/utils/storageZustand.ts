import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { PersistStorage, StorageValue } from "zustand/middleware/persist";

class FirebaseStorageClass<S> implements PersistStorage<S, Promise<void>> {
  private getDocRef(itemName: string) {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("User not authenticated");

    return doc(collection(db, "users", uid, "zustand"), itemName);
  }

  // wrapper genérico
  private async safe<R>(fn: () => Promise<R>) {
    try {
      return await fn();
    } catch (error) {
      console.error("FirebaseStorage error:", error);
      throw error;
    }
  }

  getItem = (itemName: string) =>
    this.safe(async () => {
      const docSnap = await getDoc(this.getDocRef(itemName));
      return docSnap.exists() ? docSnap.data()?.state : null;
    });

  setItem = (itemName: string, value: StorageValue<S>) =>
    this.safe(() => setDoc(this.getDocRef(itemName), { state: value }));

  removeItem = (itemName: string) =>
    this.safe(() => setDoc(this.getDocRef(itemName), { state: null }));
}

export const asyncStorageZustand = () => new FirebaseStorageClass();
