import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

function Cards() {
  const { id } = useParams();
  const navigation = useNavigate();

  return (
    <>
      <Button onClick={() => navigation("..", { relative: "path" })}>
        Back
      </Button>
      <div>Cards in set - {id}</div>
    </>
  );
}

export default Cards;
