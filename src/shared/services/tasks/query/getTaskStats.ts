import { IDateStringYMD } from "@/shared/utils/todayFormatted";
import { taskRepository } from "@/shared/config/Tasks";

/**
 * Obtém estatísticas das tarefas
 */
export async function getTaskStats(): Promise<{
  totalTasks: number;
  completedToday: number;
  completionRate: number;
}> {
  const tasks = await taskRepository.findTasks();
  const totalTasks = tasks.length;

  const today = new Date().toISOString().split("T")[0] as IDateStringYMD;
  const completedLog = await taskRepository.getCompletedLog({
    dateFrom: today,
    dateTo: today,
  });

  const completedToday = completedLog[today]?.length || 0;
  const completionRate =
    totalTasks > 0 ? (completedToday / totalTasks) * 100 : 0;

  return {
    totalTasks,
    completedToday,
    completionRate: Math.round(completionRate * 100) / 100,
  };
}
