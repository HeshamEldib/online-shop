import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUpdateUser } from "../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./profile-page.css";
import { MainURL, UserToken } from "../constant";

export default function ProfilePage() {
  return (
    <section className="profile-page">
      <div className="container">
        <div className="profile-card">
          <ContentLeft />
          <ContentRight />
        </div>
      </div>
    </section>
  );
}

function ContentLeft() {
  const user: any = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="content-left">
      <div className="info">
        <div className="avatar">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e: any) =>
              dispatch(
                dispatch(
                  fetchUpdateUser({
                    userToken: UserToken,
                    avatar: e.target.files[0],
                  })
                )
              )
            }
          />

          <img src={MainURL + user?.avatar} alt="" />
          <span>
            <FontAwesomeIcon icon={faCamera} />
          </span>
        </div>
        <div className="full-name">{user?.userName}</div>
      </div>

      <SignOut />
    </div>
  );
}

// sin out
function SignOut() {
  const signOutMethod = () => {
    localStorage.removeItem("userToken");
    location.href = "/";
  };
  return (
    <div className="sin-out">
      <button className="main-button" onClick={signOutMethod}>
        Sign Out
      </button>
    </div>
  );
}

function ContentRight() {
  return (
    <div className="content-right">
      <PersonData />
      <div className="alteration-profile">
        <Link to="/alteration-profile" className="main-button">
          alteration
        </Link>
      </div>
    </div>
  );
}

// information Personalize data
function PersonData() {
  const user: any = useSelector((state: RootState) => state.user.user);

  return (
    <ul className="personalize-data">
      <PersonDataContent label="Full Name" content={user?.userName} />
      <PersonDataContent label="Email" content={user?.email} />
      <PersonDataContent label="Mobile" content={user?.mobile} />
      <PersonDataContent label="Address" content={user?.address} />
    </ul>
  );
}
interface PersonDataContentProps {
  label: string;
  content: string | number;
}
function PersonDataContent({ label, content }: PersonDataContentProps) {
  return (
    <li>
      <span className="label">{label}</span>
      <span className="content">{content}</span>
    </li>
  );
}
