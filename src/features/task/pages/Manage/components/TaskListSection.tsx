import { ITask } from "@/shared/hooks/store/useTaskStore";
import { ManageTaskTable } from "./ManageTaskTable";

interface TaskListSectionProps {
  tasks: ITask[];
  selectedTask: ITask | null;
  onTaskEdit: (task: ITask) => void;
  onTaskRemove: (taskTitle: string) => void;
}

export function TaskListSection({
  tasks,
  onTaskEdit,
  onTaskRemove,
}: TaskListSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Suas tarefas:</h3>
      <ManageTaskTable
        tasks={tasks}
        onTaskEdit={onTaskEdit}
        onTaskRemove={onTaskRemove}
      />
    </div>
  );
}
