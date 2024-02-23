import { Link } from "react-router-dom";
import "./not-found-page.css";

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found">
        <div className="not-found-404">
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link to="/">Go To Home page</Link>
      </div>
    </section>
  );
}
