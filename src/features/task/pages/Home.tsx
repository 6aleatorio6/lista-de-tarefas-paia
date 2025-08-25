import { Card } from "@/shadcn/ui/card";
import { taskActions, useTaskStore } from "@/shared/hooks/store/useTaskStore";
import { TableSummary } from "../components/TableSummary";
import { PendingTaskTable } from "../components/PendingTaskTable";
import { formatDate } from "@/shared/utils/todayFormatted";

export function HomePage() {
  const today = formatDate();
  const tasks = useTaskStore((state) => state.tasks);
  const completionLog = useTaskStore((state) => state.completionLog);
  const completedTasks = completionLog[today] || [];

  return (
    <div className="p-6 space-y-8">
      {/* Card do Histórico */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Histórico</h2>
            <p className="text-sm text-muted-foreground">
              Últimos 7 dias de atividade
            </p>
          </div>

          <TableSummary tasks={tasks} completionLog={completionLog} />
        </div>
      </Card>

      {/* Card de Resumo */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Tarefas Pendentes
              </h2>
              <p className="text-sm text-muted-foreground">
                Gerencie suas tarefas de hoje ({today}) - tarefas não concluídas
                hoje não poderão ser marcadas depois
              </p>
            </div>
            <div className="flex flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span className="text-sm text-muted-foreground">
                  Pendentes hoje: {tasks.length - completedTasks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-sm text-muted-foreground">
                  Concluídas hoje: {completedTasks.length}
                </span>
              </div>
            </div>
          </div>

          <PendingTaskTable
            tasks={tasks}
            completedTasks={completedTasks}
            onComplete={(taskTitle) => {
              taskActions.markTaskCompleted(taskTitle, today);
            }}
          />
        </div>
      </Card>
    </div>
  );
}
