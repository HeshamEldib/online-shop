import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { ProfileIcon, Logo } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./main-menu.css";

interface MainMenuProps {
  showMenu?: string;
  action?: any;
  actionTwo?: any;
  children: ReactNode;
}
export default function MainMenu({
  showMenu,
  action,
  actionTwo,
  children,
}: MainMenuProps) {
  const dispatch = useDispatch();

  return (
    <div className={`main-menu ${showMenu}`}>
      {children}
      <div
        className="back"
        onClick={() => {
          dispatch(action());
          actionTwo && dispatch(actionTwo());
        }}
      ></div>
      <ClosedMenu action={action} />
    </div>
  );
}

interface ContentMenuProps {
  children: ReactNode;
  action: any;
}
export function ContentMenu({ children }: ContentMenuProps) {
  return <div className="content">{children}</div>;
}

export function HeaderMenu() {
  return (
    <div className="main-menu-top">
      <Logo />
      <div className="prof">
      <ProfileIcon />
      </div>
    </div>
  );
}

interface ClosedMenuProps {
  action: any;
}
function ClosedMenu({ action }: ClosedMenuProps) {
  const dispatch = useDispatch();
  return (
    <button className="close-menu">
      <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(action())} />
    </button>
  );
}
