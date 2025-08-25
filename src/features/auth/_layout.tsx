import { useGetUser } from "@/shared/hooks/useGetUser";
import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout() {
  const { user, loading } = useGetUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex h-full flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-6 h-12 w-12"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>

          <div className="space-y-8 max-w-[400px]">
            <div>
              <h3 className="text-2xl font-medium mb-4">
                Lista de Tarefas Diária
              </h3>
              <p className="text-zinc-400">
                Construa hábitos consistentes e acompanhe seu progresso dia após
                dia
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-lg font-medium">
                  Por que usar nossa plataforma?
                </h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Histórico imutável das suas realizações
                  </li>
                  <li className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Acompanhamento diário do seu progresso
                  </li>

                  <li className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Sincronização em todos os seus dispositivos
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 inset-x-0 text-center">
            <div className="space-x-2 text-sm text-zinc-400">
              <a
                href="#"
                className="hover:text-white underline underline-offset-4"
              >
                Termos de serviço
              </a>
              <span>·</span>
              <a
                href="#"
                className="hover:text-white underline underline-offset-4"
              >
                Política de privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full lg:p-8">
        <div className="mx-auto flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
