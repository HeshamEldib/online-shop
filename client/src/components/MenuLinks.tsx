// import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { showAndHiddenLinks } from "../redux/slices/targetMenu";
import MainMenu, { ContentMenu, HeaderMenu } from "./MainMenu";
import { ProfileIcon, Logo, NavLinks } from "./Navbar";
import "./menu-links.css";

export default function MenuLinks() {
  const showMenu = useSelector(
    (state: RootState) => state.targetMenu.showLinks
  );
  // const dispatch = useDispatch();

  return (
    <div className="menu-links">
      <MainMenu showMenu={showMenu} action={showAndHiddenLinks}>
        <ContentMenu action={showAndHiddenLinks}>
          <HeaderMenu />
          <NavLinks />
        </ContentMenu>
      </MainMenu>
    </div>
  );
}
