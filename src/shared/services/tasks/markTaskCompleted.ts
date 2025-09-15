import { taskRepository } from "@/shared/config/Tasks";
import { IDateStringYMD } from "@/shared/utils/todayFormatted";

export async function markTaskCompleted(taskTitle: string) {
  await taskRepository.markTaskCompleted(
    taskTitle,
    new Date().toISOString().split("T")[0] as IDateStringYMD
  );

  const task = await taskRepository.findTasks({ title: taskTitle });
  const completionLog = await taskRepository.getCompletedLog({ taskTitle });

  return { task, completionLog: completionLog };
}
