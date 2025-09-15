import { taskRepository } from "@/shared/config/Tasks";

/**
 * Remove uma tarefa da lista e limpa todas as referências nos logs
 */
export async function removeTask(taskTitle: string) {
  await taskRepository.deleteTask(taskTitle);
  await taskRepository.removeTaskFromLogs(taskTitle);
}
