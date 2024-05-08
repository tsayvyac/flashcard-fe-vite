import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress.tsx";
import CardSetService from "@/api/CardSetService.ts";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import FlashcardService, {
  Flashcard,
  ScoreNums,
} from "@/api/FlashcardService.ts";
import Content, { BlockProp } from "@/components/Content.tsx";
import Block from "@/components/ui/block.tsx";
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/

interface LocationState {
  isCram: boolean;
  name: string;
}

function Learn() {
  const navigation = useNavigate();
  const [hidden, setHidden] = useState<boolean>(true);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const { id } = useParams();
  const idOfSet: number = +(id ?? 0);
  const { state }: { state: LocationState } = useLocation();
  const isCram: boolean = state?.isCram ?? true;
  const nameOfSet: string = state?.name ?? "";
  console.log(isCram);
  console.log(current, total);

  useEffect(() => {
    const fetchRep = async () => {
      await CardSetService.getAllCards(idOfSet, isCram).then((res) => {
        setCards(res);
        setTotal(res.length);
        setIsPending(false);
      });
    };

    void fetchRep();
  }, [idOfSet, isCram]);

  const handleNext = (score: ScoreNums = 0) => {
    if (!isCram) void FlashcardService.updateProgress(cards[current].id, score);

    const isLastCard = current + 1 === total;
    setCurrent(isLastCard ? current : current + 1);
    setIsFinish(isLastCard);
    setHidden(!isLastCard);
  };

  const handleReveal = () => {
    setIsFinish(isCram && current + 1 === total);
    setHidden(false);
  };

  if (isPending) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Progress value={(current / (total - 1)) * 100} />
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
                  <Block>Continue</Block>
                </DialogClose>
                <Button variant="outline" onClick={() => navigation(-1)}>
                  Finish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex items-baseline">
            <span className="text-muted-foreground/50 font-medium text-base md:text-2xl">
              {isCram ? "cram" : "spaced"}:
            </span>
            <div className="text-lg md:text-3xl font-bold">
              &nbsp;{nameOfSet}
            </div>
          </div>
          <Badge
            variant="outline"
            className="ml-4 md:text-base"
          >{`${current + 1}/${total}`}</Badge>
        </div>
        <div className="grid grid-cols-1 md:mt-16 mt-8 md:grid-cols-2 md:gap-8 gap-2 md:grid-rows-[60vh] grid-rows-[35vh_35vh]">
          <Card className="block p-4 overflow-y-auto break-all">
            {JSON.parse(cards[current].front).map((block: BlockProp) => (
              <Content key={block.id} block={block} />
            ))}
          </Card>
          <Card className="block p-4 overflow-y-auto break-all">
            <div className={`${hidden ? "hidden" : "block"}`}>
              {JSON.parse(cards[current].back).map((block: BlockProp) => (
                <Content key={block.id} block={block} />
              ))}
            </div>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <div>
            {isFinish ? (
              <Button onClick={() => navigation(-1)}>Finish</Button>
            ) : (
              <Button
                className={`${!hidden ? "hidden" : "block"}`}
                onClick={handleReveal}
              >
                Reveal
              </Button>
            )}
          </div>
          {isCram ? (
            <div className={`${hidden || isFinish ? "hidden" : "flex"}`}>
              <Button variant="outline" onClick={() => handleNext()}>
                Next
              </Button>
            </div>
          ) : (
            <div className={`${hidden || isFinish ? "hidden" : "flex gap-4"}`}>
              <Button variant="destructive" onClick={() => handleNext(-1)}>
                Bad
              </Button>
              <Button variant="outline" onClick={() => handleNext()}>
                Mid
              </Button>
              <Button onClick={() => handleNext(1)}>Good</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Learn;
