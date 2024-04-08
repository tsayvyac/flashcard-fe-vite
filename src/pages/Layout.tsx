import { NavLink, Outlet } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import MenuLink from "@/components/MenuLink.tsx";
import NavRightSide from "@/components/NavRightSide.tsx";
import MobileNavPart from "@/components/MobileNavPart.tsx";

export interface Item {
  title: string;
  path: string;
}

export const menuItems: Item[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Sets",
    path: "/sets",
  },
];

function Layout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <BrainCircuit className="h-6 w-6" />
              <span className="sr-only">Flashcards</span>
            </NavLink>
            {menuItems.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </nav>
          <MobileNavPart />
          <NavRightSide />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
