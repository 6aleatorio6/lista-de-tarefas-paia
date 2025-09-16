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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Remover tarefa</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover a tarefa "{taskTitle}"? Esta ação não
            pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleConfirmRemove}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
