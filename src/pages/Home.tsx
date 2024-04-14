import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { buttonVariants } from "@/components/ui/button.tsx";
import { Table, TableBody } from "@/components/ui/table";
import TableRowGen from "@/components/TableRowGen.tsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card>
            <CardHeader className="px-7 bg-muted/50">
              <CardTitle>Card sets</CardTitle>
              <CardDescription>Card sets you can start study.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="mt-4">
                <TableBody>
                  <TableRowGen name="Set 1" amount="10" />
                  <TableRowGen name="Set 2" amount="6" />
                  <TableRowGen name="Set 3" amount="2" />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-2">
              <CardDescription className="leading-relaxed">
                You can create a new card by either clicking the &quot;Create
                New Card&quot; button or navigating to the &quot;Sets&quot;
                section and selecting the desired set to create your card.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Link
                to="/card"
                className={buttonVariants({ variant: "default" })}
              >
                Create New Card
              </Link>
              <Link
                to="/help"
                className={buttonVariants({ variant: "outline" })}
              >
                Help
              </Link>
            </CardFooter>
          </Card>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Study streak</CardDescription>
                <CardTitle className="text-4xl">2</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Study every day and increase your streak
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">$5,329</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
