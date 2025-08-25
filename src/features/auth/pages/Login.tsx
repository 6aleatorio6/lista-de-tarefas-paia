import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { Auth } from "@/shared/utils/Auth";
import { useNavigate } from "react-router-dom";
import birdIcon from "@/../assets/birdIcon.png";

export function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await Auth.signInWithGoogle();
    navigate("/"); // Redireciona para a página inicial após o login
  };

  return (
    <Card className="w-[80vw] sm:w-full border-2 ">
      <CardHeader className="space-y-3 pb-8 ">
        <img
          src={birdIcon}
          alt="Ícone de pássaro"
          className="w-25 h-25 inline-block m-auto "
        />
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Bem-vindo
        </CardTitle>
        <CardDescription className="text-center text-base flex items-center justify-center gap-2">
          Comece a construir seus hábitos diários hoje
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Continue com
            </span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          className="w-full relative group overflow-hidden border-2 hover:border-primary/50"
          variant="outline"
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          <svg
            className="mr-2 h-5 w-5"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          <span className="relative z-10">Google</span>
        </Button>
      </CardContent>
    </Card>
  );
}
