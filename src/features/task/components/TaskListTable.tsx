import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { ITask } from "@/shared/hooks/store/useTaskStore";
import { Button } from "@/shadcn/ui/button";

interface TaskListTableProps {
  tasks: ITask[];
  onRemove: (taskTitle: string) => void;
}

export function TaskListTable({ tasks, onRemove }: TaskListTableProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhuma tarefa cadastrada.
      </p>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[15%]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.title}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="text-muted-foreground">
                {task.description || "-"}
              </TableCell>
              <TableCell>
                <Button
                  title="Remover tarefa"
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(task.title)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  ×
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
