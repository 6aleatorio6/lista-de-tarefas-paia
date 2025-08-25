import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { Task } from "@/shared/hooks/store/useTaskStore";
import { Button } from "@/shadcn/ui/button";
import { useMemo } from "react";
import { todayFormatted } from "@/shared/utils/todayFormatted";

interface TaskTableProps {
  tasks: Record<string, Task>;
  actions: {
    title: string;
    callback: (taskTitle: string) => void;
    icon: React.ReactNode;
  }[];
}

export function TaskTable({ tasks, actions }: TaskTableProps) {
  // Convert tasks object to array and filter out tasks completed today
  const tasksForToday = useMemo(
    () =>
      Object.entries(tasks)
        .map(([title, task]) => ({
          title,
          completedToday: task.completionLog.some(
            (log) => log.date === todayFormatted && log.isCompleted
          ),
        }))
        .filter((task) => !task.completedToday),
    [tasks, todayFormatted]
  );

  if (tasksForToday.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
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
          {tasksForToday.map((task) => (
            <TableRow key={task.title}>
              <TableCell>{task.title}</TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    task.completedToday
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {task.completedToday ? "Concluída" : "Pendente"}
                </span>
              </TableCell>
              <TableCell>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    title={action.title}
                    variant="outline"
                    size="sm"
                    onClick={() => action.callback?.(task.title)}
                  >
                    {action.icon}
                  </Button>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
