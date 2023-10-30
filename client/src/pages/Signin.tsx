import { Link } from "react-router-dom";
import { Logo } from "../components/Navbar";
import { Form, FormInput, InputPassword, RegisterCard } from "./Register";

export default function Signin() {
  return (
    <section className="signin register">
      <Logo />
      <RegisterCard title="Sign in">
        <Form>
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
        </Form>
      </RegisterCard>

      <ButCreateAccount />
    </section>
  );
}

function ButCreateAccount() {
  return (
    <div className="but-create-account">
      <Link to="/register">Create your account</Link>
    </div>
  );
}
