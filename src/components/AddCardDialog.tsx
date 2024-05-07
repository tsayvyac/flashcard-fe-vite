import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import CreateCard from "@/components/CreateCard.tsx";
import { Flashcard } from "@/api/FlashcardService.ts";
import { useState } from "react";

interface AddCardDialogProps {
  title: string;
  children: React.ReactNode;
  idOfSet: number;
  addNewCard: (newCard: Flashcard) => void;
  isUpdate?: {
    isUpd: boolean;
    updateCard: (updatedCard: Flashcard) => void;
    idOfCard: number;
    front: string;
    back: string;
  };
}

function AddCardDialog({
  title,
  children,
  idOfSet,
  addNewCard,
  isUpdate = {
    isUpd: false,
    updateCard: (updatedCard: Flashcard) => {
      //
    },
    idOfCard: 0,
    front: "",
    back: "",
  },
}: AddCardDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="mb-4">{title}</DialogTitle>
          <div className="p-2 overflow-y-auto overflow-x-hidden min-h-[75vh] max-h-[80vh]">
            <CreateCard
              idOfSet={idOfSet}
              addNewCard={addNewCard}
              isUpdate={isUpdate}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddCardDialog;
