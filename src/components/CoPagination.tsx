import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationEnd,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "@/components/ui/pagination.tsx";

interface CoPaginationProps {
  totalPages: number;
  page: number;
}

function CoPagination({ totalPages, page }: CoPaginationProps) {
  const pageNumbers: number[] = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  const activePages = pageNumbers.slice(
    Math.max(0, page - 1 - pageNumLimit),
    Math.min(page - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const renderPages = () => {
    const renderedPages = activePages.map((pageN, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink page={pageN} isActive={pageN === page}>
          {pageN}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(<PaginationEllipsis key="el-start" />);
    }

    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(<PaginationEllipsis key="el-end" />);
    }
    return renderedPages;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationStart page={1} isActive={page - 1 <= 0} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious page={page - 1} isActive={page - 1 <= 0} />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext page={page + 1} isActive={page === totalPages} />
        </PaginationItem>
        <PaginationItem>
          <PaginationEnd page={totalPages} isActive={page === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CoPagination;
