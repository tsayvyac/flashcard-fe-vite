import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { DataTable } from "@/components/data-table/data-table.tsx";
import { columns } from "@/components/data-table/columns.tsx";
import AddCardDialog from "@/components/AddCardDialog.tsx";
import Block from "@/components/ui/block.tsx";
import { useEffect, useState } from "react";
import CardSetService, { SetPage } from "@/api/CardSetService.ts";
import { Flashcard } from "@/api/FlashcardService.ts";
import AddSetDialog from "@/components/AddSetDialog.tsx";

function Home() {
  const [sets, setSets] = useState<SetPage>({
    list: [],
    pageNo: 1,
    pageSize: 11,
    totalElement: 0,
    totalPages: 0,
    isLast: true,
  });
  const [key, setKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<-1 | 0 | 1>(0);
  useEffect(() => {
    const fetchAll = async () => {
      await CardSetService.getRepSets(0)
        .then((res) => {
          setSets(res);
          setIsPending(1);
        })
        .catch(() => setIsPending(-1));
    };

    void fetchAll();
  }, [key]);

  const addNewCard = (newCard: Flashcard) => {
    setKey(newCard.id);
  };

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-0 md:p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-4">
              <CardDescription className="leading-relaxed">
                You can create a new flashcard by either clicking the &quot;New
                Flashcard&quot; button or navigating to the &quot;Sets&quot;
                section and selecting the desired set to create your flashcard.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <AddCardDialog
                trigger={<Block>New Flashcard</Block>}
                title="New Flashcard"
                addNewCard={addNewCard}
                idOfSet={0}
              />
              <AddSetDialog
                pushNewSet={() => {
                  //
                }}
                isButton={true}
              />
            </CardFooter>
          </Card>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Study streak</CardDescription>
                <CardTitle className="text-4xl">[n]</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Study every day and increase your streak
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>To study</CardDescription>
                <CardTitle className="text-4xl">[n]</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Total number of flashcards to be repeated
                </div>
              </CardContent>
              <CardFooter />
            </Card>
          </div>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card>
            <CardHeader className="px-7 bg-muted/50">
              <CardTitle>Flashcard sets</CardTitle>
              <CardDescription>
                Flashcard sets you can start study today. Only 10 at most are
                shown.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={sets.list}
                isPending={isPending}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

export default Home;
