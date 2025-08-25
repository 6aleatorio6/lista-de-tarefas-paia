import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { ITask, ICompletionLog } from "@/shared/hooks/store/useTaskStore";
import { formatDate, IDateStringYMD } from "@/shared/utils/todayFormatted";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TableSummaryProps {
  tasks: ITask[];
  completionLog: ICompletionLog;
  sizePage?: number;
}

export function TableSummary({
  tasks,
  completionLog,
  sizePage = 7,
}: TableSummaryProps) {
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
            {tasks.map((task) => (
              <TableHead key={task.title} className="text-center">
                {task.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentDates.map(({ dateStr, dayOfWeek }) => {
            const completedTasksForDay =
              completionLog[dateStr as IDateStringYMD] || [];

            return (
              <TableRow key={dateStr}>
                <TableCell className="font-medium">
                  <span className="hidden sm:inline">{dateStr} </span>
                  <span>
                    {dayOfWeek} {formatDate() === dateStr ? "(hoje)" : ""}
                  </span>
                </TableCell>
                {tasks.map((task) => {
                  const completed = completedTasksForDay.includes(task.title);
                  return (
                    <TableCell
                      key={`${dateStr}-${task.title}`}
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
    </div>
  );
}
