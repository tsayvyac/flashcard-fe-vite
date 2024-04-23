import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { LoaderCircle, Plus } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import CardSetService, { Set } from "@/api/CardSetService.ts";

interface AddSetDialogProps {
  pushNewSet: (newSet: Set) => void;
}

function AddSetDialog({ pushNewSet }: AddSetDialogProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    void CardSetService.postSet({ name: name }).then((res) => {
      pushNewSet(res.data);
      setIsPending(false);
      setIsCreateDialogOpen(false);

      toast({
        description: `Set: ${name} was successfully created!`,
      });
    });
  };

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <button className="rounded-lg border text-card-foreground shadow-sm h-full w-full bg-muted flex justify-center items-center hover:bg-background/80">
            <Plus className="h-20 w-20 stroke-muted-foreground" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create a new set</DialogTitle>
              <DialogDescription>
                Create a new flashcard set. Click create when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSetDialog;
