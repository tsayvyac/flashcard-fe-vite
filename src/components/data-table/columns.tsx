import { Badge } from "@/components/ui/badge.tsx";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import CoTooltip from "@/components/CoTooltip.tsx";
import { Set } from "@/api/CardSetService.ts";

export const columns: ColumnDef<Set>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "countRep",
    header: () => <div className="text-right">Flashcards to study</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Badge>{row.getValue("countRep")}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const set = row.original;

      return (
        <div className="flex gap-2 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <CoTooltip
                  description="Study with spaced repetition"
                  className="w-full"
                >
                  <Link
                    to={`/study/${set.id}`}
                    state={{ isCram: false, name: row.getValue("name") }}
                    className="w-full flex justify-start"
                  >
                    Study
                  </Link>
                </CoTooltip>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CoTooltip
                  description="Study all flashcards in this set. Will not affect study progress"
                  className="w-full block"
                >
                  <Link
                    to={`/study/${set.id}`}
                    state={{ isCram: true, name: row.getValue("name") }}
                    className="w-full flex justify-start"
                  >
                    Cram
                  </Link>
                </CoTooltip>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
