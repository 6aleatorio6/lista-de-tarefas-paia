import { Auth } from "@/shared/utils/Auth";
import { asyncStorageZustand } from "@/shared/utils/storageZustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ITask = {
  title: string;
  description?: string;
  isRemoved?: boolean;
  id: number;
};

type ITaskStored = Omit<ITask, "id">;

export const useTaskStore = create<{ tasks: ITaskStored[] }>()(
  persist<{ tasks: ITaskStored[] }>(() => ({ tasks: [] }), {
    name: "task-store-2",
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

  addTask: (newTask: Omit<ITask, "id">) => {
    useTaskStore.setState((taskState) => {
      if (taskState.tasks.find((task) => task.title === newTask.title)) {
        throw new Error(`Task with title "${newTask.title}" already exists.`);
      }

      return { tasks: [...taskState.tasks, newTask] };
    });
  },

  removeTask: (taskTitle: string) => {
    useTaskStore.setState((taskState) => {
      const taskIndex = taskState.tasks.findIndex(
        (task) => task.title === taskTitle
      );

      if (taskIndex === -1) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }

      const updatedTasks = [...taskState.tasks];

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        isRemoved: true,
      };

      return { tasks: updatedTasks };
    });
  },

  updateTask: (taskTitle: string, updates: Partial<Omit<ITask, "id">>) => {
    useTaskStore.setState((taskState) => {
      const taskIndex = taskState.tasks.findIndex(
        (task) => task.title === taskTitle
      );

      if (taskIndex === -1) {
        throw new Error(`Task with title "${taskTitle}" does not exist.`);
      }

      const updatedTasks = [...taskState.tasks];

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        ...updates,
        title: updates.title || updatedTasks[taskIndex]!.title,
      };

      return { tasks: updatedTasks };
    });
  },
};
