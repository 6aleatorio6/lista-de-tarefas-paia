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
import { Edit, Trash2 } from "lucide-react";

interface ManageTaskTableProps {
  tasks: ITask[];
  onTaskEdit: (task: ITask) => void;
  onTaskRemove: (taskTitle: string) => void;
}

export function ManageTaskTable({
  tasks,
  onTaskEdit,
  onTaskRemove,
}: ManageTaskTableProps) {
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
            <TableHead className="w-[20%]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            return (
              <TableRow key={task.title}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {task.description
                    ? task.description.slice(0, 40) +
                      (task.description.length > 40 ? "..." : "")
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      title="Editar tarefa"
                      variant={"outline"}
                      size="sm"
                      onClick={() => onTaskEdit(task)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-3 w-3" />
                      {"Editar"}
                    </Button>
                    <Button
                      title="Remover tarefa"
                      variant="outline"
                      size="sm"
                      onClick={() => onTaskRemove(task.title)}
                      className="hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remover
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
