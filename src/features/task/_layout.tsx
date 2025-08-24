import { Button } from "@/shadcn/ui/button";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
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

export default function TaskLayout() {
  const navigate = useNavigate();
  const { user, loading } = useGetUser();

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
            <Link
              to="/tasks"
              className="font-bold text-lg text-primary hover:text-primary/90 transition-colors"
            >
              Lista de Tarefas
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              asChild
              className="rounded-full shadow-sm hover:shadow transition-all"
            >
              <Link to="/tasks/new" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Nova Tarefa
              </Link>
            </Button>

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
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
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <div className="container mx-auto">
          Lista de Tarefas &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
