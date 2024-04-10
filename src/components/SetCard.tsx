import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function SetCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set title</CardTitle>
        <CardDescription>Set Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Set Content</p>
      </CardContent>
      <CardFooter>
        <p>Set Footer</p>
      </CardFooter>
    </Card>
  );
}

export default SetCard;
