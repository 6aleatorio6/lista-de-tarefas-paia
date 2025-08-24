import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { Auth } from "../utils/Auth";

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = Auth.onStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
