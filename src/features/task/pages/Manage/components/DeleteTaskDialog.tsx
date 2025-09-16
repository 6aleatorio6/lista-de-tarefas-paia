import { taskActions } from "@/shared/hooks/store/useTaskStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shadcn/ui/alert-dialog";

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
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover tarefa</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover a tarefa "{taskTitle}"? Esta ação não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleConfirmRemove}
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
