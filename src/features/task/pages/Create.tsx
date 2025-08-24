import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { taskActions } from "@/shared/hooks/store/useTaskStore";
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

const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function CreateTaskPage() {
  const navigate = useNavigate();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      // Create a new task using the taskActions from useTask.ts
      taskActions.addTask({
        title: data.title,
        completionLog: [],
      });

      navigate("/tasks");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      // You might want to display this error to the user
      form.setError("title", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Erro ao criar tarefa",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Nova Tarefa</h2>
        <p className="text-sm text-muted-foreground">
          Crie uma nova tarefa preenchendo os campos abaixo
        </p>
      </div>

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

          <div className="flex gap-4 pt-4">
            <Button type="submit">Criar Tarefa</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/tasks")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
