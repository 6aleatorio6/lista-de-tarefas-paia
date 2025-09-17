import { useGetUser } from "@/shared/hooks/useGetUser";
import { Navigate, Outlet } from "react-router-dom";
import { Github } from "lucide-react";

export default  function AuthLayout() {
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
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
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
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/leonardo-l-felix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/6aleatorio6/lista-de-tarefas-paia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                  title="GitHub Repository"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
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
      </div>
      <div className="h-full lg:p-8 ">
        <div className="mx-auto flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
