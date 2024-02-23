import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { showAndHiddenLinks } from "../redux/slices/targetMenu";
import MainMenu, { ContentMenu, HeaderMenu } from "./MainMenu";
import { NavLinks } from "./Navbar";
import "./menu-links.css";

export default function MenuLinks() {
  const showMenu = useSelector(
    (state: RootState) => state.targetMenu.showLinks
  );

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
