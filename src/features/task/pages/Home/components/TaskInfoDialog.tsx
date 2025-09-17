import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { ITask } from "@/shared/hooks/store/useTaskStore";

interface TaskInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task: ITask | null;
  taskIndex: number | null;
}

export function TaskInfoDialog({
  isOpen,
  onOpenChange,
  task,
}: TaskInfoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Informações da Tarefa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">
              TÍTULO
            </h4>
            <p className="text-sm sm:text-base break-words">{task?.title}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">
              DESCRIÇÃO
            </h4>
            {task?.description ? (
              <div className="bg-muted/50 rounded-md p-3 border max-h-[350px]  overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {task.description}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Nenhuma descrição fornecida
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
