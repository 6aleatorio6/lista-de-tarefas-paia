import { Auth } from "@/shared/utils/Auth";
import { asyncStorageZustand } from "@/shared/utils/storageZustand";
import { IDateStringYMD } from "@/shared/utils/todayFormatted";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ITask = {
  title: string;
  description?: string;
};

export type ICompletionLog = Record<IDateStringYMD, string[]>;

// -------

interface TaskStore {
  tasks: ITask[];
  completionLog: ICompletionLog;
}

export const useTaskStore = create<TaskStore>()(
  persist<TaskStore>(() => ({ tasks: [], completionLog: {} }), {
    name: "task-store",
    storage: asyncStorageZustand(),
    skipHydration: true,
  })
);

Auth.onStateChanged((user) => {
  if (user) {
    useTaskStore.persist.rehydrate();
  } else {
    useTaskStore.persist.clearStorage();
  }
});

// ------------

export const taskActions = {
  refresh: () => {
    useTaskStore.persist.rehydrate();
  },

  addTask: (newTask: ITask) => {
    useTaskStore.setState((state) => {
      if (state.tasks.find((task) => task.title === newTask.title)) {
        throw new Error(`Task with title "${newTask.title}" already exists.`);
      }

      return {
        tasks: [...state.tasks, newTask],
      };
    });
  },

  removeTask: (taskTitle: string) => {
    useTaskStore.setState((state) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.title === taskTitle
      );

      if (taskIndex === -1) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }

      const updatedTasks = [...state.tasks];
      updatedTasks.splice(taskIndex, 1);

      // Remove também todas as referências nos logs de conclusão
      const updatedCompletionLog: ICompletionLog = {};

      for (const [date, titles] of Object.entries(state.completionLog)) {
        const filteredTitles = titles.filter((title) => title !== taskTitle);
        if (filteredTitles.length > 0) {
          updatedCompletionLog[date as IDateStringYMD] = filteredTitles;
        }
      }

      return {
        tasks: updatedTasks,
        completionLog: updatedCompletionLog,
      };
    });
  },

  updateTask: (taskTitle: string, updates: Partial<Omit<ITask, "title">>) => {
    useTaskStore.setState((state) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.title === taskTitle
      );

      if (taskIndex === -1) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }

      const updatedTasks = [...state.tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        ...updates,
      };

      return {
        tasks: updatedTasks,
      };
    });
  },

  markTaskCompleted: (taskTitle: string, date: IDateStringYMD) => {
    useTaskStore.setState((state) => {
      const task = state.tasks.find((t) => t.title === taskTitle);
      if (!task) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }

      const dayLogs = state.completionLog[date] || [];

      return {
        completionLog: {
          ...state.completionLog,
          [date]: [...dayLogs, taskTitle],
        },
      };
    });
  },
};
