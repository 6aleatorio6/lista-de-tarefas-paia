import { Card } from "@/shadcn/ui/card";

export function AboutPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Sobre o Projeto</h2>
      <p className="text-sm text-muted-foreground pb-3">
        Uma ferramenta para construir e manter hábitos diários consistentes
      </p>

      <div className="space-y-4 text-muted-foreground">
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            O Que Nos Diferencia
          </h3>
          <ul className="list-disc pl-6">
            <li>Foco exclusivo em rotinas e hábitos diários</li>
            <li>Registro permanente de atividades com histórico detalhado</li>
            <li>Sistema de confirmação diária obrigatória</li>
            <li>Acompanhamento visual do progresso</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Como Funciona
          </h3>
          <ul className="list-decimal pl-6">
            <li>
              <strong>Defina sua Rotina:</strong> Adicione tarefas diárias
            </li>
            <li>
              <strong>Confirmação Diária:</strong> Marque as tarefas completadas
            </li>
            <li>
              <strong>Acompanhamento:</strong> Visualize seu histórico
            </li>
            <li>
              <strong>Ajuste:</strong> Adapte sua rotina conforme necessário
            </li>
          </ul>
        </section>

        <p className="text-sm mt-4">
          Desenvolvido com React, TypeScript, Tailwind CSS e Firebase.
          <a
            href="https://github.com/6aleatorio6/lista-de-tarefas-paia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline ml-1"
          >
            Repositório no GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
