import { ReactNode, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Logo } from "../components/Navbar";
import { MainURL } from "../constant";
import "./register.css";

export default function Register() {
  return (
    <section className="register">
      <Logo />
      <RegisterCard title="Create account">
        <Form />
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

// interface FormProps {
//   children: ReactNode;
// }
export function Form() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch(MainURL + "api/users/register", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({
        userName,
        email,
        password,
        role: "ADMIN",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userToken", data.data.userToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">Your Email</label>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="First and last name"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label htmlFor="email">Your Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="At least 6 characters"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <label htmlFor="re-password">Re-enter Password</label>
      <input
        type="password"
        id="re-password"
        name="re-password"
        placeholder="Re-enter password"
        required
      /> */}

      <button type="submit">Continue</button>
    </form>
  );
}
// export function Form({ children }: FormProps) {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [message, setMessage] = useState("");

//   let handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       let res = await fetch((MainURL + "api/users/register"), {
//         method: "POST",
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           mobileNumber: mobileNumber,
//         }),
//       });
//       let resJson = await res.json();
//       if (res.status === 200) {
//         setName("");
//         setEmail("");
//         setMessage("User created successfully");
//       } else {
//         setMessage("Some error occured");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   console.log(MainURL + "api/users/register");

//   // const handleSubmit = (e:any) => {
//   //   console.log(e);

//   // }

//   return (
//     <form action="" onSubmit={(e) => handleSubmit(e)} method="POST">
//       {children}

//       <button>Continue</button>
//     </form>
//   );
// }

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
