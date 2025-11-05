import React from "react";
import IconGitHub from "../icons/IconGitHub";
import IconLinkedIn from "../icons/IconLinkedIn";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">

        <div className="footer-logo">
          <a href="https://www.linkedin.com/in/david-irvine-b367b6248/" target="_blank" rel="noopener noreferrer">
            marv-dev
          </a>
        </div>

          <ul className="footer-social-links">
            <li className="footer-social-link">
              <a href="https://github.com/DavidIrvine-TW" target="_blank">
                <IconGitHub />
              </a>
            </li>
            <li className="footer-social-link">
              <a
                href="https://www.linkedin.com/in/david-irvine-b367b6248/"
                target="_blank"
              >
                <IconLinkedIn />
              </a>
            </li>
          </ul>

          <div>
            <span className="footer-copyright"> © 2025</span>
          </div>

      </div>
    </footer>
  );
};

export default Footer;
