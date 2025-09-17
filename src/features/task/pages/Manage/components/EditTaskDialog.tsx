import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { useEffect } from "react";

const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface EditTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTask: ITask | null;
  onTaskUpdated?: () => void;
}

export function EditTaskDialog({
  isOpen,
  onOpenChange,
  selectedTask,
  onTaskUpdated,
}: EditTaskDialogProps) {
  const { tasks } = useTaskStore();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "" },
  });

  // Atualiza o formulário quando uma tarefa é selecionada
  useEffect(() => {
    if (selectedTask) {
      form.reset({
        title: selectedTask.title,
        description: selectedTask.description || "",
      });
    }
  }, [selectedTask, form]);

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
        if (
          tasks.some((task) => task.title === data.title && !task.isRemoved)
        ) {
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
      onTaskUpdated?.();
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
    onOpenChange(false);
    form.reset({ title: "", description: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-base">
            Editando:{" "}
            <span className="text-primary break-words">
              {selectedTask?.title}
            </span>
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
                    <Input placeholder="Digite o título da tarefa" {...field} />
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
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4">
              <Button type="submit" className="w-full sm:w-auto">
                Salvar Alterações
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
