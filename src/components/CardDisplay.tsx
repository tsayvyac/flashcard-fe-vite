import { Button } from "@/components/ui/button.tsx";
import { Pencil, Trash2 } from "lucide-react";
import AddCardDialog from "@/components/AddCardDialog.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import Block from "@/components/ui/block.tsx";
import FlashcardService, { Flashcard } from "@/api/FlashcardService.ts";
import Content, { BlockProp } from "@/components/Content.tsx";
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

interface CardDisplayProps {
  card: Flashcard;
  addNewCard: (newCard: Flashcard) => void;
  updateCard: (updatedCard: Flashcard) => void;
  deleteCard: (id: number) => void;
  idOfSet: number;
}

function CardDisplay({
  card,
  addNewCard,
  deleteCard,
  idOfSet,
  updateCard,
}: CardDisplayProps) {
  const handleDelete = (id: number) => {
    void FlashcardService.deleteFlashcard(id).then(() => {
      deleteCard(id);
    });
  };

  return (
    <>
      <div className="group">
        <div className="grid relative grid-cols-2 grid-rows-[32vh]">
          <div className="p-2 rounded-l-lg border bg-card text-card-foreground shadow-sm overflow-x-hidden break-all overflow-hidden">
            {JSON.parse(card.front).map((block: BlockProp) => (
              <Content key={block.id} block={block} />
            ))}
          </div>
          <div className="p-2 rounded-r-lg border bg-card text-card-foreground shadow-sm overflow-x-hidden break-all overflow-hidden">
            {JSON.parse(card.back).map((block: BlockProp) => (
              <Content key={block.id} block={block} />
            ))}
          </div>
          <div className="absolute inset-0 top-0 z-10 hidden justify-end p-4 items-end gap-4 group-hover:flex">
            <AddCardDialog
              title="Edit flashcard"
              addNewCard={addNewCard}
              idOfSet={idOfSet}
              isUpdate={{
                isUpd: true,
                updateCard: updateCard,
                idOfCard: card.id,
                front: card.front,
                back: card.back,
              }}
            >
              <Block size="icon">
                <Pencil className="h-4 w-4" />
              </Block>
            </AddCardDialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Do you want to delete?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this card?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={() => handleDelete(card.id)}>Delete</Button>
                  <DialogClose>
                    <Button variant="outline">Do not delete</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-gray-400 hidden group-hover:block rounded-lg opacity-20" />
        </div>
        <div className="text-xs text-muted-foreground">
          Next repetition on: {card.nextDate}
        </div>
      </div>
    </>
  );
}

export default CardDisplay;
