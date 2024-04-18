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

interface SetsToStudy {
  id: number;
  title: string;
  flashcardsToStudy: number;
}

export const dummy: SetsToStudy[] = [
  {
    id: 1,
    title: "Set 1",
    flashcardsToStudy: 10,
  },
  {
    id: 2,
    title: "Set 2",
    flashcardsToStudy: 6,
  },
  {
    id: 3,
    title: "Set 3",
    flashcardsToStudy: 2,
  },
];

export const columns: ColumnDef<SetsToStudy>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "flashcardsToStudy",
    header: () => <div className="text-right">Flashcards to study</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Badge>{row.getValue("flashcardsToStudy")}</Badge>
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
                  trigger={
                    <Link
                      to={`/study/${set.id}?mode=spaced`}
                      className="w-full"
                    >
                      Study
                    </Link>
                  }
                  description="Study with spaced repetition"
                  className="w-full"
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CoTooltip
                  trigger={
                    <Link to={`/study/${set.id}?mode=cram`} className="w-full">
                      Cram
                    </Link>
                  }
                  description="Study all flashcards in this set. Will not affect study progress"
                  className="w-full"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
