import { Link } from "react-router-dom";
import SetCard from "@/components/SetCard.tsx";
import AddCard from "@/components/AddCard.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Sets() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <div>
          <AddCard />
        </div>
        <Link to={`/sets/${1}`}>
          <SetCard />
        </Link>
        <Link to={`/sets/${2}`}>
          <SetCard />
        </Link>
        <Link to={`/sets/${3}`}>
          <SetCard />
        </Link>
        <Link to={`/sets/${4}`}>
          <SetCard />
        </Link>
        <Link to={`/sets/${5}`}>
          <SetCard />
        </Link>
        <Link to={`/sets/${6}`}>
          <SetCard />
        </Link>
        <Link to={`/sets/${7}`}>
          <SetCard />
        </Link>
      </div>
      <div className="mt-12">
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

export default Sets;
