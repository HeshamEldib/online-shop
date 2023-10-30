import { Link } from "react-router-dom";
import { Logo } from "../components/Navbar";
import "./register.css";
import { ReactNode } from "react";

export default function Register() {
  return (
    <section className="register">
      <Logo />
      <RegisterCard title="Create account">
        <Form>
          <FormInput
            type="text"
            name="fullName"
            label="Your Name"
            placeholder="First and last name"
          />
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
          <InputPassword
            type="password"
            name="re-password"
            label="Re-enter Password"
            placeholder="Re-enter password"
          />
        </Form>
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

interface FormProps {
  children: ReactNode;
}
export function Form({ children }: FormProps) {
  return (
    <form action="">
      {children}

      <button>Continue</button>
    </form>
  );
}

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
}
export function FormInput({ type, name, label, placeholder }: FormInputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required
      />
    </>
  );
}

export function InputPassword({
  type,
  name,
  label,
  placeholder,
}: FormInputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required
        min={6}
      />
    </>
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
