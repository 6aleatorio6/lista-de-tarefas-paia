import { IDateStringYMD } from "@/shared/utils/todayFormatted";
import { taskRepository } from "@/shared/config/Tasks";

/**
 * Obtém todas as tarefas concluídas em uma data específica
 */
export async function getCompletedTasksOnDate(date: IDateStringYMD) {
  const completedLog = await taskRepository.getCompletedLog({
    dateFrom: date,
    dateTo: date,
  });

  return completedLog[date] || [];
}
