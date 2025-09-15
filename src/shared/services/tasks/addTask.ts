import { taskRepository } from "@/shared/config/Tasks";
import { ITask } from "@/shared/config/types/tasks";

/**
 * Adiciona uma nova tarefa à lista
 */
export async function addTask(newTask: ITask) {
  await taskRepository.createTask(newTask);
}
