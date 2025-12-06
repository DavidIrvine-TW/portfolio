import IconGitHub from "../icons/IconGitHub";
import IconLinkedIn from "../icons/IconLinkedIn";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">

          <ul className="footer-social-links">
            <li className="footer-social-link">
              <a href="https://github.com/DavidIrvine-TW" target="_blank" rel="noreferrer">
                <IconGitHub />
              </a>
            </li>
            <li className="footer-social-link">
              <a
                href="https://www.linkedin.com/in/david-irvine-b367b6248/"
                target="_blank"
                rel="noreferrer"
              >
                <IconLinkedIn />
              </a>
            </li>
          </ul>

          <div>
            <span className="footer-copyright select-none"> © 2025</span>
          </div>

      </div>
    </footer>
  );
};

export default Footer;
