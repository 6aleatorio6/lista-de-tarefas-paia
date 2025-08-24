import { Auth } from "@/shared/utils/Auth";
import { asyncStorageZustand } from "@/shared/utils/storageZustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  title: string;
  completionLog: {
    date: `${number}/${number}/${number}`;
    isCompleted: boolean;
  }[];
};

interface TaskStore {
  tasks: Record<string, Task>;
}

export const useTaskStore = create<TaskStore>()(
  persist(() => ({ tasks: {} }), {
    name: "task-store",
    storage: asyncStorageZustand(),
    skipHydration: true,
  })
);

Auth.onStateChanged((user) => {
  if (user) {
    useTaskStore.persist.rehydrate();
  } else {
    useTaskStore.setState({ tasks: {} });
  }
});

//

export const taskActions = {
  refresh: () => {
    useTaskStore.persist.rehydrate();
  },

  addTask: (newTask: Task) => {
    useTaskStore.setState((state) => {
      if (state.tasks[newTask.title]) {
        throw new Error(`Task with title "${newTask.title}" already exists.`);
      }
      return {
        tasks: { ...state.tasks, [newTask.title]: newTask },
      };
    });
  },

  removeTask: (taskTitle: string) => {
    useTaskStore.setState((state) => {
      if (!state.tasks[taskTitle]) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }

      return { ...state.tasks, [taskTitle]: undefined };
    });
  },

  updateTask: (taskTitle: string, updates: Partial<Task>) => {
    useTaskStore.setState((state) => {
      if (!state.tasks[taskTitle]) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }
      return {
        tasks: {
          ...state.tasks,
          [taskTitle]: { ...state.tasks[taskTitle], ...updates },
        },
      };
    });
  },

  markTaskCompletedForDay: (
    taskTitle: string,
    date: `${number}/${number}/${number}`
  ) => {
    useTaskStore.setState((state) => {
      const task = state.tasks[taskTitle];
      if (!task)
        throw new Error(`Task with title "${taskTitle}" does not exist.`);

      const alreadyCompleted = task.completionLog.some((c) => c.date === date);
      if (alreadyCompleted) {
        throw new Error(
          `Task "${taskTitle}" is already marked completed for ${date}.`
        );
      }

      return {
        tasks: {
          ...state.tasks,
          [taskTitle]: {
            ...task,
            completionLog: [...task.completionLog, { date, isCompleted: true }],
          },
        },
      };
    });
  },
};
