import { useAuthStore } from "@/store/useAuthStore";
import { useTasksStore } from "@/store/useTasksStore";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const TasksPage = () => {
  const { user, signOut } = useAuthStore();
  const { tasks, addTask, removeTask, toggleTask } = useTasksStore();
  const [newTask, setNewTask] = useState("");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    addTask({
      title: newTask,
      completed: false,
      date: new Date().toISOString(),
    });
    setNewTask("");
  };

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const today = new Date();
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name || ""}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <h1 className="text-xl font-semibold">Tarefas de Hoje</h1>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Sair
            </button>
          </div>

          <form onSubmit={handleAddTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nova tarefa..."
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </div>
            ))}

            {todayTasks.length === 0 && (
              <p className="text-center text-gray-500">
                Nenhuma tarefa para hoje
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
