import { NavLink, Outlet } from "react-router-dom";
import { BrainCircuit, Home, Layers } from "lucide-react";
import MenuLink from "@/components/MenuLink.tsx";
import NavRightSide from "@/components/NavRightSide.tsx";
import MobileNavPart from "@/components/MobileNavPart.tsx";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";

export interface Item {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const iconSize = "h-4 w-4 mr-2";

export const menuItems: Item[] = [
  {
    title: "Home",
    path: "/",
    icon: <Home className={iconSize} />,
  },
  {
    title: "Sets",
    path: "/sets",
    icon: <Layers className={iconSize} />,
  },
];

function Layout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b backdrop-blur bg-background/60 px-4 md:px-6 z-50">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base mr-3"
            >
              <BrainCircuit className="h-8 w-8" />
              <span className="sr-only">Flashcards</span>
            </NavLink>
            {menuItems.map((item) => (
              <MenuLink
                key={item.title}
                onClick={() => {
                  //
                }}
                item={item}
              />
            ))}
          </nav>
          <MobileNavPart />
          <NavRightSide />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          <div className="flex flex-1 flex-col gap-4 p-0 md:gap-8 md:p-8">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
          <Toaster />
        </main>
      </div>
    </>
  );
}

export default Layout;
