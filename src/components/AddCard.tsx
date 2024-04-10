import { Card, CardContent } from "@/components/ui/card.tsx";
import { Plus } from "lucide-react";

function AddCard() {
  return (
    <Card className="h-full bg-muted cursor-pointer">
      <CardContent className="flex justify-center items-center h-full p-6">
        <Plus className="h-20 w-20 stroke-muted-foreground" />
      </CardContent>
    </Card>
  );
}

export default AddCard;
