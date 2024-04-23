import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge.tsx";
import { Card } from "@/components/ui/card.tsx";
import { useState } from "react";
import { Progress } from "@/components/ui/progress.tsx";

function Learn() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [hidden, setHidden] = useState<boolean>(true);
  let current: number = 2;
  let total: number = 30;

  return (
    <>
      <Progress value={(current / total) * 100} />
      <div className="bg-muted/40 min-h-screen w-full md:p-8 p-4">
        <div className="flex flex-1 flex-row justify-between items-center gap-4 md:gap-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="xicon" variant="outline">
                <X className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to finish studying? There are still a
                  few flashcards left.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row justify-center gap-4 md:gap-2">
                <DialogClose>
                  <Button>Continue</Button>
                </DialogClose>
                <Button variant="outline" onClick={() => navigation(-1)}>
                  Finish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex items-baseline">
            <span className="text-muted-foreground/50 font-medium text-base md:text-2xl">
              {searchParams.get("mode")}:
            </span>
            <div className="text-lg md:text-3xl font-bold">&nbsp;Set title</div>
          </div>
          <Badge
            variant="outline"
            className="ml-4 md:text-base"
          >{`${current}/${total}`}</Badge>
        </div>
        <div className="grid grid-cols-1 md:mt-16 mt-8 md:grid-cols-2 md:gap-8 gap-2 md:grid-rows-[60vh] grid-rows-[35vh_35vh]">
          <Card className="block p-4 overflow-y-auto break-all">asds</Card>
          <Card className="block p-4 overflow-y-auto break-all">
            <div className={`${hidden ? "hidden" : "block"}`}>asdsa</div>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <div>
            <Button
              className={`${!hidden ? "hidden" : "block"}`}
              onClick={() => setHidden(false)}
            >
              Reveal
            </Button>
          </div>
          <div className={`${hidden ? "hidden" : "flex gap-4"}`}>
            <Button variant="destructive">Bad</Button>
            <Button variant="outline">So-so</Button>
            <Button>Good</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Learn;
