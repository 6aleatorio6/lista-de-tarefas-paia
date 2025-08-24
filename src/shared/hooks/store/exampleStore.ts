import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createFirebaseStorage } from "../../services/firebase/storage";

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
      storage: createFirebaseStorage<ExampleStore>(),
    }
  )
);
