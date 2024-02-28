import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Navbar";

import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../redux/slices/registerSlice";
import { RootState } from "../redux/store";

export default function Register() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [next, setNext] = useState(false);

  return (
    <section className="register">
      <Logo />
      <RegisterCard title="Create account">
        {next ? (
          <Form method={() => setNext(false)} data={data} setData={setData} />
        ) : (
          <RoleForm
            method={() => setNext(true)}
            data={data}
            setData={setData}
          />
        )}
        <Links />
      </RegisterCard>
    </section>
  );
}

interface RegisterCardProps {
  title: string;
  children: ReactNode;
}
export function RegisterCard({ title, children }: RegisterCardProps) {
  return (
    <div className="register-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// role
interface RoleFormProps {
  method(): any;
  data: any;
  setData(a: any): any;
}
function RoleForm({ method, data, setData }: RoleFormProps) {
  const [role, setRole] = useState("USER");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setData({ ...data, role });
    method();
  };
  return (
    <div className="role-form">
      <form onSubmit={handleSubmit}>
        <div className="item">
          <input
            type="radio"
            checked={role === "USER"}
            id="USER"
            name="role"
            value="USER"
            onChange={(e: any) => setRole(e.target.value)}
          />
          <label htmlFor="USER">Consumer</label>
        </div>

        <div className="item">
          <input
            type="radio"
            id="ADMIN"
            name="role"
            value="ADMIN"
            onChange={(e: any) => setRole(e.target.value)}
          />
          <label htmlFor="ADMIN">Merchant</label>
        </div>

        <button>Next</button>
      </form>
    </div>
  );
}

export function Form({ method, data, setData }: RoleFormProps) {
  const user = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleUserInput = (name: string, value: string | number) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // check if password and confirm password are match
    if (confirmPassword !== formInput.password) {
      setConfirmPasswordError(
        "Password and confirm password should be the same"
      );
      return;
    }
    setConfirmPasswordError("");

    setData({ ...data, ...formInput });

    dispatch(fetchRegister({ ...data, ...formInput }));
  };

  return (
    <div className="main-form-data">
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Your User Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="First and last name"
          required
          value={formInput.userName}
          onChange={(e: any) => handleUserInput(e.target.name, e.target.value)}
        />

        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          value={formInput.email}
          onChange={(e: any) => handleUserInput(e.target.name, e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="At least 6 characters"
          required
          onChange={(e: any) => handleUserInput(e.target.name, e.target.value)}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="enter confirm password"
          required
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
        <p className="error-message">{confirmPasswordError}</p>

        <p className="error-message">{user.message}</p>

        <div className="buttons d-flex justify-content-between">
          <button type="submit">Continue</button>
          <button onClick={method} className="back">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

function Links() {
  return (
    <div className="register-links">
      <ul>
        <li>
          <span>Already have an account? </span>
          <Link to="/signin">Sign in</Link>
        </li>
      </ul>
    </div>
  );
}
