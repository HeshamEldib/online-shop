import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Account, Logo, NavLinks } from "./Navbar";
import "./menu-links.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { showAndHidden } from "../redux/slices/targetMenu";

export default function MenuLinks() {
  const showMenu = useSelector((state: RootState) => state.targetMenu.show);
  const dispatch = useDispatch();

  return (
    <div className={`menu-links ${showMenu}`}>
      <div className="content">
        <button className="close-menu">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => dispatch(showAndHidden())}
          />
        </button>
        <div className="menu-links-top">
          <Logo />
          <Account />
        </div>
        <NavLinks />
      </div>
      <div className="back" onClick={() => dispatch(showAndHidden())}></div>
    </div>
  );
}
