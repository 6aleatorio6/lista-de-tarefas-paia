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
  selectedTask: ITask | null;
  onTaskEdit: (task: ITask) => void;
  onTaskRemove: (taskTitle: string) => void;
}

export function ManageTaskTable({
  tasks,
  selectedTask,
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
            const isSelected = selectedTask?.title === task.title;

            return (
              <TableRow
                key={task.title}
                className={isSelected ? "bg-primary/5 border-primary/20" : ""}
              >
                <TableCell className="font-medium">
                  {task.title}
                  {isSelected && (
                    <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                      Editando
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {task.description || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      title="Editar tarefa"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => onTaskEdit(task)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-3 w-3" />
                      {isSelected ? "Editando" : "Editar"}
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
