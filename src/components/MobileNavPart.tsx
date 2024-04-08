import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { BrainCircuit, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import MenuLink from "@/components/MenuLink.tsx";
import { menuItems } from "@/pages/Layout.tsx";

function MobileNavPart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <BrainCircuit className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>
          {menuItems.map((item) => (
            <MenuLink key={item.title} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavPart;
