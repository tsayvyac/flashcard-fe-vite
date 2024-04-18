import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge.tsx";
import { Trash2 } from "lucide-react";
import CoTooltip from "@/components/CoTooltip.tsx";

function SetCard() {
  return (
    <Card>
      <Link to={`/sets/${1}`}>
        <CardHeader className="group hover:bg-muted/50">
          <CardTitle className="flex items-center justify-between">
            Set 1<Badge>10</Badge>
          </CardTitle>
          <CardDescription>Number of cards: 12</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="flex bg-muted/50 pt-4 justify-between">
        <div className="grid grid-cols-2 gap-2">
          <CoTooltip
            trigger={
              <Link
                to={`/study/${1}?mode=spaced`}
                className={buttonVariants({ variant: "default", size: "xm" })}
              >
                Study
              </Link>
            }
            description="Study with spaced repetition"
          />
          <CoTooltip
            trigger={
              <Link
                to={`/study/${1}?mode=cram`}
                className={buttonVariants({ variant: "outline", size: "xm" })}
              >
                Cram
              </Link>
            }
            description="Study all flashcards in this set. Will not affect study progress"
          />
        </div>
        <Button size="xm" variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SetCard;
