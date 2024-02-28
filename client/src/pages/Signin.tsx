import { Link } from "react-router-dom";
import { Logo } from "../components/Navbar";
import { RegisterCard } from "./Register";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignin } from "../redux/slices/registerSlice";
import { RootState } from "../redux/store";

export default function Signin() {
  return (
    <section className="signin register">
      <Logo />
      <RegisterCard title="Sign in">
        <Form />
        {/* <Form>
          <FormInput
            type="email"
            name="email"
            label="Your Email"
            placeholder="Your email"
          />
          <InputPassword
            type="password"
            name="password"
            label="Password"
            placeholder="At least 6 characters"
          />
        </Form> */}
      </RegisterCard>

      <ButCreateAccount />
    </section>
  );
}

function Form() {
  const user = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(fetchSignin({ email, password }));
  };

  return (
    <div className="main-form-data">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="At least 6 characters"
          required
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <p className="error-message">{user.message}</p>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

function ButCreateAccount() {
  return (
    <div className="but-create-account">
      <Link to="/register">Create your account</Link>
    </div>
  );
}
