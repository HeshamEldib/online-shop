import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Language, Logo } from "./Navbar";
import "./footer.css";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

export default function Footer() {
  return (
    <footer>
      <BackToTop />
      <FooterLink />
      <DeveloperLinks />
      <FooterEnd />
    </footer>
  );
}

function BackToTop() {
  const backToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="back-to-top">
      <button onClick={backToTop}>Back to top</button>
    </div>
  );
}
function FooterLink() {
  return (
    <div className="footer-link">
      <Logo />
      <Language />
    </div>
  );
}

function FooterEnd() {
  return (
    <div className="footer-end">
      © All rights reserved
      <br />
      Hesham Eldib - 2023
    </div>
  );
}

function DeveloperLinks() {
  return (
    <div className="developer-links">
      <h3 className="developer-title">Developer Links</h3>
      <ul>
        <li>
          <a
            href="https://hesham-eldib.netlify.app/"
            className="my-website"
            target="_break"
          >
            <img src="../public/H1.png" alt="" />
            <span>My Website</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/hesham-eldib"
            className="linkedin"
            target="_break"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span>Linkedin</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/HeshamEldib"
            className="github"
            target="_break"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>GitHub</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
