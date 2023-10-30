import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProfileIcon, Logo, NavLinks } from "./Navbar";
import "./menu-links.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { showAndHidden } from "../redux/slices/targetMenu";

export default function MenuLinks() {
  const showMenu = useSelector((state: RootState) => state.targetMenu.show);
  const dispatch = useDispatch();

  return (
    <div className={`menu-links ${showMenu}`}>
      <ContentMenu>
        <HeaderMenu />
        <NavLinks />
      </ContentMenu>
      <div className="back" onClick={() => dispatch(showAndHidden())}></div>
    </div>
  );
}

interface ContentMenuProps {
  children: ReactNode;
}
export function ContentMenu({ children }: ContentMenuProps) {
  return (
    <div className="content">
      <ClosedMenu />
      {children}
    </div>
  );
}

export function HeaderMenu() {
  return (
    <div className="menu-links-top">
      <Logo />
      <ProfileIcon />
    </div>
  );
}

function ClosedMenu() {
  const dispatch = useDispatch();
  return (
    <button className="close-menu">
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => dispatch(showAndHidden())}
      />
    </button>
  );
}
