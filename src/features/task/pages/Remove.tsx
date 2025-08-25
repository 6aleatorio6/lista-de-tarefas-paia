import { useTaskStore, taskActions } from "@/shared/hooks/store/useTaskStore";
import { Button } from "@/shadcn/ui/button";
import { useNavigate } from "react-router-dom";
import { TaskListTable } from "../components/TaskListTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shadcn/ui/alert-dialog";
import { useState } from "react";

export default function RemoveTaskPage() {
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const [taskToRemove, setTaskToRemove] = useState<string | null>(null);

  const handleConfirmRemove = () => {
    if (taskToRemove) {
      try {
        taskActions.removeTask(taskToRemove);
      } catch (error) {
        console.error("Erro ao remover tarefa:", error);
      }
      setTaskToRemove(null);
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

      <TaskListTable
        tasks={tasks}
        onRemove={(taskTitle) => setTaskToRemove(taskTitle)}
      />

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate("/tasks")}>
          Voltar
        </Button>
      </div>

      <AlertDialog
        open={taskToRemove !== null}
        onOpenChange={() => setTaskToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover tarefa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover a tarefa "{taskToRemove}"? Esta
              ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirmRemove}
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
