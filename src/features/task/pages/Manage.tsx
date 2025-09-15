import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import {
  taskActions,
  useTaskStore,
  ITask,
} from "@/shared/hooks/store/useTaskStore";
import { Button } from "@/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";

import { ManageTaskTable } from "../components/ManageTaskTable";

const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function ManageTaskPage() {
  const navigate = useNavigate();
  const tasks = useTaskStore((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [taskToRemove, setTaskToRemove] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "" },
  });

  // Atualiza o formulário quando uma tarefa é selecionada para edição
  const handleTaskEdit = (task: ITask) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
    form.reset({
      title: task.title,
      description: task.description || "",
    });
  };

  // Confirma remoção da tarefa
  const handleConfirmRemove = () => {
    if (taskToRemove) {
      try {
        taskActions.removeTask(taskToRemove);
        // Se a tarefa removida estava sendo editada, fecha o modal
        if (selectedTask?.title === taskToRemove) {
          handleCancel();
        }
      } catch (error) {
        console.error("Erro ao remover tarefa:", error);
      }
      setTaskToRemove(null);
    }
  };

  const onSubmit = async (data: TaskFormValues) => {
    if (!selectedTask) {
      form.setError("title", {
        type: "manual",
        message: "Selecione uma tarefa para editar",
      });
      return;
    }

    try {
      // Se o título mudou, precisamos remover a tarefa antiga e criar uma nova
      if (data.title !== selectedTask.title) {
        // Verifica se já existe uma tarefa com o novo título
        if (tasks.some((task) => task.title === data.title)) {
          form.setError("title", {
            type: "manual",
            message: "Já existe uma tarefa com este título",
          });
          return;
        }

        // Remove a tarefa antiga e cria uma nova
        taskActions.removeTask(selectedTask.title);
        taskActions.addTask({
          title: data.title,
          description: data.description,
        });
      } else {
        // Se apenas a descrição mudou, usa updateTask
        taskActions.updateTask(selectedTask.title, {
          description: data.description,
        });
      }

      handleCancel();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      form.setError("title", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Erro ao editar tarefa",
      });
    }
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
    form.reset({ title: "", description: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Gerenciar Tarefas
        </h2>
        <p className="text-sm text-muted-foreground">
          Edite ou remova suas tarefas existentes
        </p>
      </div>

      {/* Tabela de tarefas para gerenciamento */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Suas tarefas:</h3>
        <ManageTaskTable
          tasks={tasks}
          selectedTask={selectedTask}
          onTaskEdit={handleTaskEdit}
          onTaskRemove={(taskTitle: string) => setTaskToRemove(taskTitle)}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate("/tasks")}>
          Voltar
        </Button>
      </div>

      {/* Modal de edição */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Editando:{" "}
              <span className="text-primary">{selectedTask?.title}</span>
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o título da tarefa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição da tarefa"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-4">
                <Button type="submit">Salvar Alterações</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de remoção */}
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
