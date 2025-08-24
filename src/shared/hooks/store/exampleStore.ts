/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseStorage } from "@/shared/utils/StorageZustand";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ExampleStore {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    }),
    {
      name: "example-store",
      storage: createJSONStorage(FirebaseStorage as any),
    }
  )
);
