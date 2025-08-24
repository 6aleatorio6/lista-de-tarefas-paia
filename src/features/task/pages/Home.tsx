import { useTaskStore } from "@/shared/hooks/store/useTaskStore";
import { TableSummary } from "../components/TableSummary";
import { TaskTable } from "../components/TaskTable";

export function HomePage() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="space-y-8 p-6">
      {/* Últimos 30 dias */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Últimos 7 dias</h2>
        <TableSummary tasks={tasks} />
      </div>

      {/* Tarefas atuais */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Tarefas Atuais</h2>
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}
