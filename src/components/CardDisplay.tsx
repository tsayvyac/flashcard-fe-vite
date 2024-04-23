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

function CardDisplay() {
  return (
    <div className="group">
      <div className="grid relative grid-cols-2 grid-rows-[32vh]">
        <div className="p-2 rounded-l-lg border bg-card text-card-foreground shadow-sm overflow-x-hidden break-all">
          Front
        </div>
        <div className="p-2 rounded-r-lg border bg-card text-card-foreground shadow-sm overflow-x-hidden break-all">
          Back
        </div>
        <div className="absolute inset-0 top-0 z-10 hidden justify-end p-4 items-end gap-4 group-hover:flex">
          <AddCardDialog
            trigger={
              <Block size="icon">
                <Pencil className="h-4 w-4" />
              </Block>
            }
            title="Edit flashcard"
          />
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
                <Button>Delete</Button>
                <DialogClose>
                  <Button variant="outline">Do not delete</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-gray-400 hidden group-hover:block rounded-lg opacity-20" />
      </div>
    </div>
  );
}

export default CardDisplay;