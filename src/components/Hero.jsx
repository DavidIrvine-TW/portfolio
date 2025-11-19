import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [marqueeOffset, setMarqueeOffset] = useState(0);
  const [skillIconsVisible, setSkillIconsVisible] = useState(false);

  const imageRef = useRef(null);
  const skillIconsRef = useRef(null);

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
      setIsScrolled(scrollY > 2);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track scroll position for marquee movement
  useEffect(() => {
    const handleMarqueeScroll = () => {
      const scrollY = window.scrollY;
      // Move marquee left when scrolling down (negative offset)
      // Speed factor: adjust 0.5 to control sensitivity (faster)
      setMarqueeOffset(-scrollY * 0.5);
    };

    window.addEventListener('scroll', handleMarqueeScroll);
    handleMarqueeScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleMarqueeScroll);
  }, []);

  // Track skill icons visibility based on scroll position
  useEffect(() => {
    const handleSkillIconsScroll = () => {
      const scrollY = window.scrollY;
      // Make visible when scrolled more than 20px
      if (scrollY > 20) {
        setSkillIconsVisible(true);
      } else {
        setSkillIconsVisible(false);
      }
    };

    window.addEventListener('scroll', handleSkillIconsScroll);
    handleSkillIconsScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleSkillIconsScroll);
  }, []);

  // Subtle parallax effect
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Very subtle movement for sophisticated parallax
    setMousePosition({
      x: (e.clientX - centerX) * 0.02,
      y: (e.clientY - centerY) * 0.02
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

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
    <section id="home" className="hero-section">
      {/* Background image wallpaper */}
      {/* <div className="hero-bg-image-container">
        <img
          src={`${import.meta.env.BASE_URL}assets/HeroImgGray.jpg`}
          alt="Hero background"
          className="hero-bg-image"
        />
        <div className="hero-bg-overlay" />
      </div> */}

      {/* Floating abstract shapes */}
      <div className="hero-floating-shapes">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
        <div className="hero-shape hero-shape-4"></div>
        <div className="hero-shape hero-shape-5"></div>
      </div>

      <div className={`hero-content-wrapper ${fadeIn ? 'hero-fade-in' : 'hero-fade-out'}`}>
        {/* Split-screen: Text content (Left/Top) */}
        <motion.div
          className="hero-text-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated Gradient Title */}
          <h1 className="hero-title select-none">
            <span className="gradient-text">Web Dev/ <span className="highlight-text">Alchemist</span></span>
          </h1>

          <motion.p
            className="hero-intro-text select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            David Irvine ~ web portfolio, UK
          </motion.p>
          <motion.p
            className="hero-tagline select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I can help you build it.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="hero-connect-btn"
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.a>
            <motion.a
              href={`${import.meta.env.BASE_URL}assets/David_Irvine_Web_Developer.pdf`}
              onClick={handleResumeClick}
              className="hero-resume-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
              <IconDownload />
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-social-links icon-link"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.a
              href="https://github.com/DavidIrvine-TW"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconGitHub />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/david-irvine-b367b6248/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconLinkedIn />
            </motion.a>
          </motion.div>

          {/* Skill Badges - Mobile only (inside text container) */}
          <motion.div
            className="hero-skills-mobile"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="skills-container">
              <div className="skills-marquee">
                {HeroSkillsData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-badge glass"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {!loadedSkills[skill] && skill !== 'claude' && skill !== 'mcp' && (
                      <div className="skeleton skeleton-badge"></div>
                    )}
                    <img
                      src={skill === 'claude' ? `${import.meta.env.BASE_URL}assets/claude-ai-icon.svg` : skill === 'mcp' ? `${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg` : `https://skillicons.dev/icons?i=${skill}`}
                      alt={skill}
                      loading="eager"
                      onLoad={() => handleSkillLoad(skill)}
                      style={{ display: loadedSkills[skill] || skill === 'claude' || skill === 'mcp' ? 'block' : 'none' }}
                      className="select-none skill-icon"
                    />
                    <span className="skill-tooltip">{skill === 'js' ? 'JavaScript' : skill === 'ts' ? 'TypeScript' : skill === 'claude' ? 'Claude AI' : skill === 'mcp' ? 'MCP' : skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Split-screen: Profile Image (Right/Bottom) with Subtle Parallax */}
        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={imageRef}
            className="hero-img-3d"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
            transition={{ type: "spring", stiffness: 80, damping: 30 }}
          >
            <motion.div
              className="hero-img"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
            >
              {!imageLoaded && (
                <div className="skeleton skeleton-circle w-[280px] h-[280px] tb500:w-[350px] tb500:h-[350px]"></div>
              )}
              {imageLoaded && (
                <div className="hero-img-bg">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/HeroImgGray.jpg`}
                    alt="profile background"
                    className="hero-img-bg-image select-none"
                  />
                  <div className="hero-img-overlay" />
                </div>
              )}
              <img
                src={`${import.meta.env.BASE_URL}assets/HeroImgGray.jpg`}
                alt="profile image"
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                style={{ opacity: 0, position: 'absolute' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Skill Badges - Desktop only (outside content wrapper for full width) */}
      <motion.div
        ref={skillIconsRef}
        className="hero-skills-desktop"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: skillIconsVisible ? 1 : 0, y: 0 }}
        transition={{ opacity: { duration: 0.3 }, y: { duration: 0.8, delay: 0.8 } }}
      >
        <div className="skills-container">
          <div
            className="skills-marquee"
            style={{ transform: `translateX(${marqueeOffset}px)` }}
          >
            {HeroSkillsData.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-badge glass"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {!loadedSkills[skill] && skill !== 'claude' && skill !== 'mcp' && (
                  <div className="skeleton skeleton-badge"></div>
                )}
                <img
                  src={skill === 'claude' ? `${import.meta.env.BASE_URL}assets/claude-ai-icon.svg` : skill === 'mcp' ? `${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg` : `https://skillicons.dev/icons?i=${skill}`}
                  alt={skill}
                  loading="eager"
                  onLoad={() => handleSkillLoad(skill)}
                  style={{ display: loadedSkills[skill] || skill === 'claude' || skill === 'mcp' ? 'block' : 'none' }}
                  className="select-none skill-icon"
                />
                <span className="skill-tooltip">{skill === 'js' ? 'JavaScript' : skill === 'ts' ? 'TypeScript' : skill === 'claude' ? 'Claude AI' : skill === 'mcp' ? 'MCP' : skill}</span>
              </motion.div>
            ))}
          </div>
          <div
            className="skills-marquee"
            aria-hidden="true"
            style={{ transform: `translateX(${marqueeOffset}px)` }}
          >
            {HeroSkillsData.skills.map((skill, index) => (
              <motion.div
                key={`duplicate-${index}`}
                className="skill-badge glass"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {!loadedSkills[skill] && skill !== 'claude' && skill !== 'mcp' && (
                  <div className="skeleton skeleton-badge"></div>
                )}
                <img
                  src={skill === 'claude' ? `${import.meta.env.BASE_URL}assets/claude-ai-icon.svg` : skill === 'mcp' ? `${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg` : `https://skillicons.dev/icons?i=${skill}`}
                  alt={skill}
                  loading="eager"
                  onLoad={() => handleSkillLoad(skill)}
                  style={{ display: loadedSkills[skill] || skill === 'claude' || skill === 'mcp' ? 'block' : 'none' }}
                  className="select-none skill-icon"
                />
                <span className="skill-tooltip">{skill === 'js' ? 'JavaScript' : skill === 'ts' ? 'TypeScript' : skill === 'claude' ? 'Claude AI' : skill === 'mcp' ? 'MCP' : skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
