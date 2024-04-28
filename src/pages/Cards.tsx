import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeft, Plus } from "lucide-react";
import CardDisplay from "@/components/CardDisplay.tsx";
import AddCardDialog from "@/components/AddCardDialog.tsx";
import Block from "@/components/ui/block.tsx";
import { useEffect, useState } from "react";
import { Flashcard, FlashcardPage } from "@/api/FlashcardService.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import CardSetService from "@/api/CardSetService.ts";
import { AxiosError } from "axios";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import CoPagination from "@/components/CoPagination.tsx";

function Cards() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [cards, setCards] = useState<FlashcardPage>({
    list: [],
    pageNo: 1,
    pageSize: 12,
    totalElement: 0,
    totalPages: 0,
    isLast: true,
  });
  const [isPending, setIsPending] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const page: number = +(searchParams.get("page") ?? 1);
  const { toast } = useToast();
  const idOfSet: number = +(id ?? 0);
  const [nameOfSet, setNameOfSet] = useState("");

  useEffect(() => {
    const fetchSetName = async () => {
      await CardSetService.getSetById(idOfSet).then((res) => {
        setNameOfSet(res.name);
      });
    };
    void fetchSetName();
  }, [idOfSet]);

  useEffect(() => {
    const fetchAll = async () => {
      await CardSetService.getCardsInSet(idOfSet, page - 1)
        .then((res) => {
          setIsPending(false);
          setCards(res);
        })
        .catch((error: AxiosError) => {
          if (!error.response) {
            toast({
              variant: "destructive",
              title: "Network error",
              description:
                "Unable to establish a connection. Please ensure that your device is connected to the network.",
            });
          }
        });
    };

    void fetchAll();
  }, [id, idOfSet, page, toast]);

  const addNewCard = (newCard: Flashcard) => {
    setCards((prevState) => ({
      ...prevState,
      list: [...prevState.list, newCard],
    }));
  };

  const deleteCard = (id: number) => {
    setCards((prevState) => ({
      ...prevState,
      list: prevState.list.filter((o) => o.id !== id),
    }));
  };

  const updateCard = (updatedCard: Flashcard) => {
    setCards((prevState) => ({
      ...prevState,
      list: prevState.list.map((o) =>
        o.id === updatedCard.id ? updatedCard : o
      ),
    }));
  };

  if (isPending) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigation("..", { relative: "path" })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-xl font-medium md:text-3xl">
          {nameOfSet}&nbsp;
          <span className="text-muted-foreground">({cards.list.length})</span>
        </div>
        <AddCardDialog
          trigger={
            <Block size="icon">
              <Plus className="h-4 w-4" />
            </Block>
          }
          title="New Flashcard"
          idOfSet={idOfSet}
          addNewCard={addNewCard}
        />
      </div>
      {cards.list.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2">
            {cards.list.map((card) => (
              <CardDisplay
                key={card.id}
                card={card}
                addNewCard={addNewCard}
                deleteCard={deleteCard}
                updateCard={updateCard}
                idOfSet={idOfSet}
              />
            ))}
          </div>
          <div className="mt-8">
            <CoPagination totalPages={cards.totalPages} page={page} />
          </div>
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-2xl text-muted-foreground/80">
          Add a flashcard by clicking the plus sign!
        </div>
      )}
    </>
  );
}

export default Cards;
