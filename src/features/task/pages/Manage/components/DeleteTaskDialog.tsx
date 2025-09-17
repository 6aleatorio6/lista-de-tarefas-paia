import { taskActions } from "@/shared/hooks/store/useTaskStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  taskTitle: string | null;
  onTaskDeleted?: () => void;
}

export function DeleteTaskDialog({
  isOpen,
  onOpenChange,
  taskTitle,
  onTaskDeleted,
}: DeleteTaskDialogProps) {
  const handleConfirmRemove = () => {
    if (taskTitle) {
      try {
        taskActions.removeTask(taskTitle);
        onTaskDeleted?.();
      } catch (error) {
        console.error("Erro ao remover tarefa:", error);
      }
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[500px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Remover tarefa</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Tem certeza que deseja remover a tarefa{" "}
            <span className="font-medium break-words">"{taskTitle}"</span>? Esta
            ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
            onClick={handleConfirmRemove}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
