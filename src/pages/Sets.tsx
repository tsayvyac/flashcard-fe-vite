import SetCard from "@/components/SetCard.tsx";
import AddSetDialog from "@/components/AddSetDialog.tsx";
import { useEffect, useState } from "react";
import CardSetService, { SetPage, Set } from "@/api/CardSetService.ts";
import CoPagination from "@/components/CoPagination.tsx";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast.ts";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

function Sets() {
  const [sets, setSets] = useState<SetPage>({
    list: [],
    pageNo: 1,
    pageSize: 11,
    totalElement: 0,
    totalPages: 0,
    isLast: true,
  });
  const [isPending, setIsPending] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const page: number = +(searchParams.get("page") ?? 1);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAll = async () => {
      await CardSetService.getSets(page - 1)
        .then((res) => {
          setSets(res);
          setIsPending(false);
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
  }, [page, toast]);

  const pushNewSet = (newSet: Set) => {
    setSets((prevState) => ({
      ...prevState,
      list: [...prevState.list, newSet],
    }));
  };

  const deleteSet = (id: number) => {
    setSets((prevState) => ({
      ...prevState,
      list: prevState.list.filter((o) => o.id !== id),
    }));
  };

  const updateSet = (updatedSet: Set) => {
    setSets((prevState) => ({
      ...prevState,
      list: prevState.list.map((o) =>
        o.id === updatedSet.id ? updatedSet : o
      ),
    }));
  };

  if (isPending) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {sets.list.length ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div>
              <AddSetDialog pushNewSet={pushNewSet} />
            </div>
            {sets.list.map((set) => (
              <SetCard
                key={set.id}
                id={set.id}
                name={set.name}
                numberOfCards={set.countAll}
                numberOfRep={set.countRep}
                deleteSet={deleteSet}
                updateSet={updateSet}
              />
            ))}
          </div>
          <div className="mt-12">
            <CoPagination totalPages={sets.totalPages} page={page} />
          </div>
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
          <AddSetDialog pushNewSet={pushNewSet} />
        </div>
      )}
    </>
  );
}

export default Sets;
