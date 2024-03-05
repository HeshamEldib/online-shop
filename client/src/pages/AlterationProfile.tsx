import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUpdateUser } from "../redux/slices/userSlice";
import { UserToken } from "../constant";

export default function AlterationProfile() {
  const user: any = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user?.userName);
  const [mobile, setMobile] = useState(user?.mobile);
  const [address, setAddress] = useState(user?.address);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      fetchUpdateUser({ userToken: UserToken, userName, mobile, address })
    );
    location.href = "/account";
  };

  return (
    <section className="alteration-profile-page main-form">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="FullName">FullName</label>
          <input
            type="text"
            id="FullName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="Mobile">Mobile</label>
          <input
            type="number"
            id="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="submit">
            <button className="main-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
