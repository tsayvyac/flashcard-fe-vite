import { NavLink, useLocation } from "react-router-dom";
import { Item } from "@/pages/Layout.tsx";

interface Props {
  item: Item;
  onClick: () => void;
}

function MenuLink({ item, onClick }: Props) {
  const { pathname } = useLocation();
  return (
    <>
      <NavLink
        to={item.path}
        className={`${
          pathname === item.path ||
          new RegExp("^" + item.path + "/\\d+$").test(pathname)
            ? "text-foreground "
            : "text-muted-foreground "
        } transition-colors hover:text-foreground flex whitespace-nowrap items-center`}
        onClick={onClick}
      >
        {item.icon}
        {item.title}
      </NavLink>
    </>
  );
}

export default MenuLink;
