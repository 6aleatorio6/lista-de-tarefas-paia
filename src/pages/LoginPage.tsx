import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useTasksStore } from "../store/useTasksStore";

export const LoginPage = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const { setTasks } = useTasksStore();

  // Limpa as tarefas ao fazer logout
  useEffect(() => {
    setTasks([]);
  }, []);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;

    // Decodifica o JWT para obter as informações do usuário
    const decodedToken = JSON.parse(atob(credential!.split(".")[1]));

    setUser({
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
    });
    setAccessToken(credential!);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Lista de Tarefas Diárias
        </h1>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};
