import { useState, useEffect } from "react";
import IconGitHub from "../icons/IconGitHub";
import IconLinkedIn from "../icons/IconLinkedIn";
import IconDownload from "../icons/IconDownload";
import HeroSkillsData from "../data/heroSkillsData.json";
import "./Hero.css";
import "./Skeleton.css";

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedSkills, setLoadedSkills] = useState({});
  const [fadeIn, setFadeIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for background darkening
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSkillLoad = (skill) => {
    setLoadedSkills(prev => ({ ...prev, [skill]: true }));
  };

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

  const handleResumeClick = (e) => {
    e.preventDefault();
    const resumeUrl = `${import.meta.env.BASE_URL}assets/David_Irvine_Web_Developer.pdf`;

    // Open in new tab
    window.open(resumeUrl, '_blank');

    // Also trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'David_Irvine_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className={`hero-section ${isScrolled ? 'hero-section-scrolled' : ''}`}>
      <div className={`hero-content-wrapper ${fadeIn ? 'hero-fade-in' : 'hero-fade-out'}`}>
        <div className="hero-text-container">
          <h2 className="hero-title select-none">
            Web Alchemist & Developer
          </h2>

          <p className="hero-intro-text select-none">
            David Irvine ~ web portfolio, UK
          </p>
          <p className="hero-tagline select-none">
            I can help you build it.
          </p>
          <div className="hero-buttons">
            <a
              href="#contact"
              className="hero-connect-btn"
              onClick={handleScrollToContact}
            >
              Connect
            </a>
            <a
              href={`${import.meta.env.BASE_URL}assets/David_Irvine_Web_Developer.pdf`}
              onClick={handleResumeClick}
              className="hero-resume-btn"
            >
              Resume
              <IconDownload />
            </a>
          </div>

          <div className="hero-social-links icon-link">
            <a href="https://github.com/DavidIrvine-TW" target="_blank" rel="noreferrer">
              <IconGitHub />
            </a>

            <a
              href="https://www.linkedin.com/in/david-irvine-b367b6248/"
              target="_blank"
              rel="noreferrer"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-img">
            {!imageLoaded && (
              <div className="skeleton skeleton-circle w-[280px] h-[280px] tb500:w-[350px] tb500:h-[350px]"></div>
            )}
            <img
              src={`${import.meta.env.BASE_URL}assets/HeroImgGray.jpg`}
              alt="profile image"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              className="select-none"
            />
          </div>
        </div>
      </div>

      <div className="hero-tech-stack-wrapper">
        <ul className="hero-skill-icon-list skill-icon-list">
          {HeroSkillsData.skills.map((skill, index) => (
            <li key={index} className="hero-skill-icon-item skill-icon-item">
              {!loadedSkills[skill] && (
                <div className="skeleton skeleton-badge"></div>
              )}
              <img
                src={`https://skillicons.dev/icons?i=${skill}`}
                alt="skills-icons"
                loading="eager"
                onLoad={() => handleSkillLoad(skill)}
                style={{ display: loadedSkills[skill] ? 'block' : 'none' }}
                className="select-none"
              />
              <div className="hero-skill-tooltip tooltip select-none">{skill}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
