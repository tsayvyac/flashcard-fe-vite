import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableRowGenProps {
  name: string;
  amount: string;
}

function TableRowGen({ name, amount }: TableRowGenProps) {
  return (
    <>
      <TableRow className="group h-16">
        <TableCell>
          <div className="font-medium">{name}</div>
        </TableCell>
        <TableCell className="hidden sm:table-cell"></TableCell>
        <TableCell className="hidden sm:table-cell"></TableCell>
        <TableCell className="hidden sm:table-cell"></TableCell>
        <TableCell className="text-right">
          <div className="hidden group-hover:block">
            <Button className="mr-2" size="xm">
              Study
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="xm">
                    Cram
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Will not affect study progress</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Badge className="group-hover:hidden">{amount}</Badge>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TableRowGen;
