import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import CreateCard from "@/components/CreateCard.tsx";

interface AddCardDialogProps {
  title: string;
  trigger: React.ReactNode;
}

function AddCardDialog({ title, trigger }: AddCardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="mb-4">{title}</DialogTitle>
          <div className="p-2 overflow-y-auto overflow-x-hidden min-h-[75vh] max-h-[80vh]">
            <CreateCard />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddCardDialog;
