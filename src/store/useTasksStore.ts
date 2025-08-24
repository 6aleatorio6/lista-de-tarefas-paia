import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string; // ISO string
}

interface TasksState {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      setTasks: (tasks) => set({ tasks }),
    }),
    {
      name: "tasks-storage",
    }
  )
);
