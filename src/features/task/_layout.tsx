import { Button } from "@/shadcn/ui/button";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Auth } from "@/shared/utils/Auth";
import { useGetUser } from "@/shared/hooks/useGetUser";
import {
  Plus,
  LogOut,
  ChevronDown,
  RefreshCw,
  Info,
  Settings,
} from "lucide-react";
import { taskActions } from "@/shared/hooks/store/useTaskStore";

export default function TaskLayout() {
  const navigate = useNavigate();
  const { user, loading } = useGetUser();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleRefresh = () => {
    taskActions.refresh();
    setLastUpdate(new Date());
  };

  const handleLogout = async () => {
    await Auth.signOut();
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Barra de navegação */}
      <nav className="border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                to="/tasks"
                className="font-bold text-lg text-primary hover:text-primary/90 transition-colors"
              >
                Lista de Tarefas
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Navbar para telas grandes */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/tasks/new")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nova Tarefa
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/tasks/manage")}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Gerenciar Tarefas
              </Button>
              <Button
                variant="ghost"
                onClick={handleRefresh}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                size="sm"
              >
                <RefreshCw className="h-3 w-3" />
                <span className="text-xs">
                  {lastUpdate.toLocaleTimeString("pt-BR")}
                </span>
              </Button>
              <div className="h-6 w-px bg-gray-200" />

              <Button
                variant="link"
                onClick={() => navigate("/tasks/about")}
                className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <Info className="mr-2 h-4 w-4" />
                Sobre
              </Button>
              <Button
                variant="link"
                onClick={handleLogout}
                className="flex  items-center gap-2 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>

            {/* Menu dropdown para telas pequenas */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center gap-2 hover:bg-gray-100 rounded-full"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {user?.displayName?.[0] || user?.email?.[0] || "U"}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {user?.displayName || "Usuário"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[220px] rounded-xl shadow-lg"
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user?.displayName || "Usuário"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/tasks/new")}
                    className="cursor-pointer"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Tarefa
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/tasks/manage")}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Gerenciar Tarefas
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleRefresh}
                    className="cursor-pointer text-muted-foreground"
                  >
                    <RefreshCw className="mr-2 h-3 w-3" />
                    <span className="text-xs">
                      Atualizado: {lastUpdate.toLocaleTimeString("pt-BR")}
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => navigate("/tasks/about")}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Sobre
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Avatar para telas grandes */}
            <div className="hidden md:flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {user?.displayName?.[0] || user?.email?.[0] || "U"}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user?.displayName || "Usuário"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        <Link
          to={"https://www.linkedin.com/in/leonardo-l-felix/"}
          target="_blank"
          className="container mx-auto hover:underline hover:text-primary transition-colors"
        >
          Leonardo Lopes Felix &copy; {new Date().getFullYear()}
        </Link>
      </footer>
    </div>
  );
}
