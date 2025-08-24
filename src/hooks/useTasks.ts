import { useState, useEffect } from "react";
import { GoogleDriveService, Task } from "../services/googleDrive";
import { useAuthStore } from "@/store/useAuthStore";

export function useTasks() {
  const { accessToken } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const driveService = new GoogleDriveService(accessToken);
    loadTasks(driveService);
  }, [accessToken]);

  const loadTasks = async (driveService: GoogleDriveService) => {
    try {
      setIsLoading(true);
      const loadedTasks = await driveService.getTodaysTasks();
      setTasks(loadedTasks);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (title: string) => {
    if (!accessToken) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const updatedTasks = [...tasks, newTask];
      const driveService = new GoogleDriveService(accessToken);
      await driveService.saveTasks(updatedTasks);
      setTasks(updatedTasks);
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    }
  };

  const toggleTask = async (taskId: string) => {
    if (!accessToken) return;

    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const driveService = new GoogleDriveService(accessToken);
      await driveService.saveTasks(updatedTasks);
      setTasks(updatedTasks);
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    toggleTask,
  };
}
