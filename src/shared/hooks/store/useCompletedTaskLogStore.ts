import { Auth } from "@/shared/utils/Auth";
import { asyncStorageZustand } from "@/shared/utils/storageZustand";
import { IDateStringYMD } from "@/shared/utils/todayFormatted";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// record<data, os IDs das tasks completadas>
export type ICompletedTaskLogState = Record<IDateStringYMD, number[]>;

export const useCompletedTaskLogStore = create<ICompletedTaskLogState>()(
  persist<ICompletedTaskLogState>(() => ({}), {
    name: "completed-task-log-store",
    storage: asyncStorageZustand(),
    skipHydration: true,
  })
);

Auth.onStateChanged((user) => {
  if (user) {
    useCompletedTaskLogStore.persist.rehydrate();
  } else {
    useCompletedTaskLogStore.persist.clearStorage();
  }
});

// ------------

export const completedTaskLogActions = {
  refresh: () => {
    useCompletedTaskLogStore.persist.rehydrate();
  },

  markTaskCompleted: (taskId: number, date: IDateStringYMD) => {
    useCompletedTaskLogStore.setState((state) => {
      const dayLogs = state[date] || [];

      // Verifica se a task já foi completada hoje
      if (dayLogs.includes(taskId)) {
        return state; // Não adiciona duplicata
      }

      return {
        ...state,
        [date]: [...dayLogs, taskId],
      };
    });
  },

  unmarkTaskCompleted: (taskId: number, date: IDateStringYMD) => {
    useCompletedTaskLogStore.setState((state) => {
      const dayLogs = state[date] || [];
      const filteredLogs = dayLogs.filter((id) => id !== taskId);

      if (filteredLogs.length === 0) {
        // Remove a entrada do dia se não houver mais logs
        const newState = { ...state };
        delete newState[date];
        return newState;
      }

      return {
        ...state,
        [date]: filteredLogs,
      };
    });
  },
};
