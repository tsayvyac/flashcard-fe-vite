import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ChevronLeft, Plus } from "lucide-react";
import CardDisplay from "@/components/CardDisplay.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import AddCardDialog from "@/components/AddCardDialog.tsx";
import Block from "@/components/ui/block.tsx";

function Cards() {
  const navigation = useNavigate();

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
          [Set name]&nbsp;
          <span className="text-muted-foreground">(3)</span>
        </div>
        <AddCardDialog
          trigger={
            <Block size="icon">
              <Plus className="h-4 w-4" />
            </Block>
          }
          title="New Flashcard"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2">
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
        <CardDisplay />
      </div>
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default Cards;
