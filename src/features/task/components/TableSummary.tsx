import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { Task } from "@/shared/hooks/store/useTaskStore";
import { format, isBefore, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TableSummaryProps {
  tasks: Record<string, Task>;
  sizePage?: number;
}

export function TableSummary({ tasks, sizePage = 30 }: TableSummaryProps) {
  const tasksArray = Object.entries(tasks).map(([title, task]) => ({
    title,
    completionLog: task.completionLog,
  }));

  const allDates = [
    ...new Set(
      tasksArray.flatMap((task) => task.completionLog.map((log) => log.date))
    ),
  ].sort();

  // Function to parse DD/MM/YYYY format
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  // Get today's date
  const today = new Date();

  // Filter to show only the most recent days (default 30)
  const recentDates = allDates
    .filter((dateStr) => {
      const date = parseDate(dateStr);
      const cutoffDate = subDays(today, sizePage);
      return !isBefore(date, cutoffDate);
    })
    .sort((a, b) => parseDate(b).getTime() - parseDate(a).getTime());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            {tasksArray.map((task) => (
              <TableHead key={task.title}>{task.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentDates.map((dateStr) => {
            const date = parseDate(dateStr);

            return (
              <TableRow key={dateStr}>
                <TableCell className="font-medium">
                  {format(date, "EEEE, dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </TableCell>
                {tasksArray.map((task) => {
                  const completed = task.completionLog.some(
                    (log) => log.date === dateStr && log.isCompleted
                  );
                  return (
                    <TableCell key={`${dateStr}-${task.title}`}>
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
