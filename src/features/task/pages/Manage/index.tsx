import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTaskStore, ITask } from "@/shared/hooks/store/useTaskStore";
import { Button } from "@/shadcn/ui/button";
import {
  CreateTaskForm,
  EditTaskDialog,
  DeleteTaskDialog,
  TaskListSection,
} from "./components";

export default function ManageTaskPage() {
  const navigate = useNavigate();
  const tasks = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskToRemove, setTaskToRemove] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Atualiza o formulário quando uma tarefa é selecionada para edição
  const handleTaskEdit = (task: ITask) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Callback para quando uma tarefa é editada
  const handleTaskUpdated = () => {
    // Se a tarefa removida estava sendo editada, fecha o modal
    if (
      selectedTask &&
      !tasks.some((task) => task.title === selectedTask.title)
    ) {
      setSelectedTask(null);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Gerenciar Tarefas
        </h2>
        <p className="text-sm text-muted-foreground">
          Crie novas tarefas ou edite e remova suas tarefas existentes
        </p>
      </div>

      {/* Seção de criação de tarefas */}
      <CreateTaskForm />

      {/* Tabela de tarefas para gerenciamento */}
      <TaskListSection
        tasks={tasks}
        selectedTask={selectedTask}
        onTaskEdit={handleTaskEdit}
        onTaskRemove={(taskTitle: string) => setTaskToRemove(taskTitle)}
      />

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate("/tasks")}>
          Voltar
        </Button>
      </div>

      {/* Modal de edição */}
      <EditTaskDialog
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        selectedTask={selectedTask}
        onTaskUpdated={handleTaskUpdated}
      />

      {/* Dialog de confirmação de remoção */}
      <DeleteTaskDialog
        isOpen={taskToRemove !== null}
        onOpenChange={() => setTaskToRemove(null)}
        taskTitle={taskToRemove}
        onTaskDeleted={handleTaskUpdated}
      />
    </div>
  );
}
