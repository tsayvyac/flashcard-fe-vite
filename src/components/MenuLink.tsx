import { NavLink, useLocation } from "react-router-dom";
import { Item } from "@/pages/Layout.tsx";

interface Props {
  item: Item;
}

function MenuLink({ item }: Props) {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={item.path}
      className={`${pathname === item.path ? "text-foreground " : "text-muted-foreground "} transition-colors hover:text-foreground`}
    >
      {item.title}
    </NavLink>
  );
}

export default MenuLink;
