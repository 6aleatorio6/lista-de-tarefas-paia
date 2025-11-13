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
import { useMemo } from "react";

interface PendingTaskTableProps {
  tasks: ITask[];
  completedTaskIds: number[];
  onComplete: (taskId: number) => void;
}

export function PendingTaskTable({
  tasks,
  completedTaskIds,
  onComplete,
}: PendingTaskTableProps) {
  const pendingTasks = useMemo(() => {
    return tasks
      .filter((task) => !task.isRemoved)
      .filter((task) => !completedTaskIds.includes(task.id));
  }, [tasks, completedTaskIds]);

  if (pendingTasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center pb-7 pt-10">
        Nenhuma tarefa pendente para hoje! 🎉
      </p>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Título</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[15%]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingTasks.map((task) => (
            <TableRow key={`${task.title}-${task.id}`}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700">
                  Pendente
                </span>
              </TableCell>
              <TableCell>
                <Button
                  title="Marcar como concluída"
                  variant="outline"
                  size="sm"
                  onClick={() => onComplete(task.id)}
                >
                  ✓
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
