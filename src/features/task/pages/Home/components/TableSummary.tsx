import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { ITask } from "@/shared/hooks/store/useTaskStore";
import { ICompletedTaskLogState } from "@/shared/hooks/store/useCompletedTaskLogStore";
import { formatDate, IDateStringYMD } from "@/shared/utils/todayFormatted";

import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { TaskInfoDialog } from "./TaskInfoDialog";
import { Button } from "@/shadcn/ui/button";

interface TableSummaryProps {
  tasks: ITask[];
  completionLog: ICompletedTaskLogState;
  sizePage?: number;
}

export function TableSummary({
  tasks,
  completionLog,
  sizePage = 7,
}: TableSummaryProps) {
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );

  const handleTaskClick = (task: ITask, index: number) => {
    setSelectedTask(task);
    setSelectedTaskIndex(index);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
    setSelectedTaskIndex(null);
  };

  const recentDates = Array.from({ length: sizePage }, (_, i) => {
    const date = subDays(new Date(), sizePage - i - 1);
    const formattedDate = formatDate(date);
    const dayOfWeek = format(date, "EEEE", { locale: ptBR });
    return { dateStr: formattedDate, dayOfWeek };
  });

  if (!tasks.length) {
    return (
      <p className="text-sm text-muted-foreground py-5">
        Nenhuma tarefa encontrada.
      </p>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            {tasks.map((task, index) => (
              <TableHead key={`${task.title}-${index}`} className="text-center">
                <Button
                  variant={"ghost"}
                  className="underline hover:no-underline "
                  onClick={() => handleTaskClick(task, index)}
                >
                  {task.title}
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentDates.map(({ dateStr, dayOfWeek }) => {
            const completedTaskIndicesForDay =
              completionLog[dateStr as IDateStringYMD] || [];

            return (
              <TableRow key={dateStr}>
                <TableCell className="font-medium">
                  <span className="hidden sm:inline">{dateStr} </span>
                  <span>
                    {dayOfWeek} {formatDate() === dateStr ? "(hoje)" : ""}
                  </span>
                </TableCell>
                {tasks.map((task, taskIndex) => {
                  const completed =
                    completedTaskIndicesForDay.includes(taskIndex);
                  return (
                    <TableCell
                      key={`${dateStr}-${task.title}-${taskIndex}`}
                      className="text-center"
                    >
                      {completed ? "✅" : "❌"}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal com informações da task */}
      <TaskInfoDialog
        isOpen={!!selectedTask}
        onOpenChange={handleCloseDialog}
        task={selectedTask}
        taskIndex={selectedTaskIndex}
      />
    </div>
  );
}
