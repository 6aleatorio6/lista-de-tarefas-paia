import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

export abstract class Auth {
  static async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  }

  static async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  static onStateChanged = (eventCallback: (user: User | null) => void) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      eventCallback(user);
    });

    return unsubscribe;
  };
}
