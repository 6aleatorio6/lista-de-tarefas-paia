import { taskRepository } from "@/shared/config/Tasks";
import { ITask } from "@/shared/config/types/tasks";

/**
 * Atualiza os dados de uma tarefa existente
 */
export function updateTask(
  taskTitle: string,
  updates: Partial<Omit<ITask, "title">>
) {
  const task = taskRepository.updateTask(taskTitle, updates);

  return task;
}
