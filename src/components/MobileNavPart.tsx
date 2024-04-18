import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import { BrainCircuit, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import MenuLink from "@/components/MenuLink.tsx";
import { menuItems } from "@/components/Layout.tsx";

function MobileNavPart() {
  const closeDialog = () => document.getElementById("closeBtn")?.click();

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
            onClick={closeDialog}
          >
            <BrainCircuit className="h-8 w-8 mb-3" />
            <span className="sr-only">Flashcards</span>
          </NavLink>
          {menuItems.map((item) => (
            <MenuLink key={item.title} item={item} onClick={closeDialog} />
          ))}
          <SheetClose>
            <button id="closeBtn" className="hidden"></button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavPart;
