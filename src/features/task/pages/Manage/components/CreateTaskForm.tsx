import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/shadcn/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";

const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface CreateTaskFormProps {
  onTaskCreated?: () => void;
}

export function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      taskActions.addTask({
        title: data.title,
        description: data.description,
      });

      form.reset({ title: "", description: "" });
      onTaskCreated?.();
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      form.setError("title", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Erro ao criar tarefa",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Tarefa</CardTitle>
      </CardHeader>
      <CardContent>
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
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Criar Tarefa</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
