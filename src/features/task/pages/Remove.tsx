import { useTaskStore, taskActions } from "@/shared/hooks/store/useTaskStore";
import { Button } from "@/shadcn/ui/button";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TaskTable } from "../components/TaskTable";

export default function RemoveTaskPage() {
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);

  const handleRemoveTask = (taskTitle: string) => {
    try {
      taskActions.removeTask(taskTitle);
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Remover Tarefas
        </h2>
        <p className="text-sm text-muted-foreground">
          Selecione as tarefas que deseja remover
        </p>
      </div>

      <TaskTable
        tasks={tasks}
        actions={[
          {
            title: "Remover tarefa",
            callback: handleRemoveTask,
            icon: <Trash2Icon className="h-4 w-4" />,
          },
        ]}
      />

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate("/tasks")}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
