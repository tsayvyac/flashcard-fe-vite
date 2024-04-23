import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge.tsx";
import CoTooltip from "@/components/CoTooltip.tsx";
import { LoaderCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import Block from "@/components/ui/block.tsx";
import { FormEvent, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import CardSetService, { Set } from "@/api/CardSetService.ts";

interface SetCardProps {
  id: number;
  name: string;
  numberOfCards: number;
  numberOfRep: number;
  deleteSet: (id: number) => void;
  updateSet: (updatedSet: Set) => void;
}

function SetCard({
  id,
  name,
  numberOfCards,
  numberOfRep,
  deleteSet,
  updateSet,
}: SetCardProps) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [nameState, setNameState] = useState<string>(name);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    void CardSetService.deleteSet(id).then(() => {
      setIsPending(false);
      deleteSet(id);
      setIsDeleteDialogOpen(false);
    });
  };

  const handleRename = (e: FormEvent) => {
    e.preventDefault();
    void CardSetService.renameSet(id, {
      name: nameState,
    }).then((res) => {
      setIsPending(false);
      updateSet(res.data);
      setIsRenameDialogOpen(false);
    });
  };

  return (
    <>
      <Card>
        <Link to={`/sets/${id}`}>
          <CardHeader className="group hover:bg-muted/50">
            <CardTitle className="flex items-center justify-between">
              {name}
              {numberOfRep > 0 && <Badge>{numberOfRep}</Badge>}
            </CardTitle>
            <CardDescription>Number of cards: {numberOfCards}</CardDescription>
          </CardHeader>
        </Link>
        <CardFooter className="flex bg-muted/50 pt-4 justify-between">
          <div className="grid grid-cols-2 gap-2">
            <CoTooltip
              trigger={
                <Link
                  to={`/study/${1}?mode=spaced`}
                  className={`${buttonVariants({ variant: "default", size: "xm" })} ${numberOfRep === 0 && "pointer-events-none bg-primary/30"} `}
                >
                  Study
                </Link>
              }
              description={`${numberOfRep !== 0 ? "Study with spaced repetition" : "No flashcard to study"}`}
            />
            <CoTooltip
              trigger={
                <Link
                  to={`/study/${1}?mode=cram`}
                  className={buttonVariants({ variant: "outline", size: "xm" })}
                >
                  Cram
                </Link>
              }
              description="Study all flashcards in this set. Will not affect study progress"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsRenameDialogOpen(true)}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      <DropDownDialog
        isOpen={isDeleteDialogOpen}
        onChange={setIsDeleteDialogOpen}
        title="Do you want to delete?"
        description="Are you sure you want to delete this set?"
      >
        <DialogFooter>
          <form onSubmit={handleDelete}>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </form>
          <DialogClose>
            <Block variant="outline">Do not delete</Block>
          </DialogClose>
        </DialogFooter>
      </DropDownDialog>

      <DropDownDialog
        isOpen={isRenameDialogOpen}
        onChange={setIsRenameDialogOpen}
        title={"Rename a set"}
        description={"Rename this set and click rename when you're done."}
      >
        <form onSubmit={handleRename}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DropDownDialog>
    </>
  );
}

interface DropDownDialogProps {
  isOpen: boolean;
  onChange: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  children: React.ReactNode;
}

function DropDownDialog({
  isOpen,
  onChange,
  children,
  ...props
}: DropDownDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default SetCard;
