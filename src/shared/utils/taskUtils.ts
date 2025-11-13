import { ITask } from "../hooks/store/useTaskStore";

export type ITaskStored = Omit<ITask, "id">;

/**
 * Mapeia o índice como ID e filtra tarefas removidas
 */
export function getActiveTasks(tasks: ITaskStored[]): ITask[] {
  return tasks
    .map((task, index) => ({
      ...task,
      id: index,
    }))
    .filter((task) => !task.isRemoved);
}

/**
 * Mapeia apenas o índice como ID (sem filtrar)
 */
export function mapTasksWithId(tasks: ITaskStored[]): ITask[] {
  return tasks.map((task, index) => ({
    ...task,
    id: index,
  }));
}
