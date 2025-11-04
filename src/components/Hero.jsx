import React from "react";
import IconGitHub from "../icons/IconGitHub";
import IconLinkedIn from "../icons/IconLinkedIn";
import HeroSkillsData from "../data/heroSkillsData.json";
import "./Hero.css";

function Hero() {
  // Custom smooth scroll function with easing (from Technyra pattern)
  const handleScrollToContact = (e) => {
    e.preventDefault();

    // Cubic easing function
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const duration = 1500; // 1.5 seconds
    const startPosition = window.pageYOffset;
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight;
    const distance = targetPosition - startPosition;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <section id="home" className="hero-section ">
      <div className="hero-content-wrapper">
        <div className="hero-text-container">
          <h2 className="hero-title">
            Web Alchemist & Educator
            {/* <img
              className="hero-waving-img-desktop"
              src="/assets/waving.png"
              alt="waving hand"
            /> */}
          </h2>
          <img
              className="hero-waving-img-mobile"
              src="/assets/waving.png"
              alt="waving hand"
            />

          <p className="hero-intro-text">
            David Irvine, web portfolio, UK.
          </p>
          <p className="hero-tagline">
            I can help you build it.
          </p>
          <a
            href="#contact"
            className="hero-connect-btn"
            onClick={handleScrollToContact}
          >
            Connect
          </a>

          <div className="hero-social-links icon-link">
            <a href="https://github.com/DavidIrvine-TW" target="_blank">
              <IconGitHub />
            </a>

            <a
              href="https://www.linkedin.com/in/david-irvine-b367b6248/"
              target="_blank"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-img">
            <img src="/assets/HeroImgGray.jpg" alt="profile image" loading="eager" />
          </div>
        </div>
      </div>

      <div className="hero-tech-stack-wrapper">
        <ul className="hero-skill-icon-list skill-icon-list">
          {HeroSkillsData.skills.map((skill, index) => (
            <li key={index} className="hero-skill-icon-item skill-icon-item">
              <img
                src={`https://skillicons.dev/icons?i=${skill}`}
                alt="skills-icons"
                loading="eager"
              />
              <div className="hero-skill-tooltip tooltip">{skill}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
