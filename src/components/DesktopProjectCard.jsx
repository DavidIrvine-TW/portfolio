import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Iconghub from "../icons/Iconghub";
import HeroSkillsData from "../data/heroSkillsData.json";
import "./DesktopProjectCard.css";

const DesktopProjectCard = ({
  blurb,
  name,
  tech,
  tags,
  livelink,
  github,
  images,
  index,
  hoveredIndex,
  setHoveredIndex,
  showSkillIcons,
}) => {
  const [loadedSkills, setLoadedSkills] = useState({});
  const isHovered = hoveredIndex === index;

  // Helper for animation delays
  const getDelay = useCallback((enter, exit) => (isHovered ? enter : exit), [isHovered]);

  // Base transition configuration
  const baseTransition = useMemo(
    () => ({
      duration: 0.6,
      ease: [0.25, 1.5, 0.5, 1],
    }),
    []
  );

  // Wrapper animation for scale and opacity
  const wrapperVariants = {
    animate: () => ({
      scale: hoveredIndex !== null && !isHovered ? 0.85 : 1,
      opacity: hoveredIndex !== null && !isHovered ? 0.6 : 1,
    }),
  };

  // Card animation (no scale here anymore)
  const cardVariants = {
    animate: () => ({
      scale: 1,
    }),
  };

  const overlayVariants = {
    animate: () => ({
      opacity: 0,
    }),
  };

  const bgVariants = {
    animate: () => ({
      opacity: isHovered ? 0 : 1,
    }),
  };

  // For skill icons card, always show content (no hover needed)
  const alwaysShowContent = showSkillIcons;

  const titleVariants = {
    animate: () => ({
      opacity: 1,
    }),
  };

  const containerVariants = {
    animate: () => ({
      opacity: isHovered || alwaysShowContent ? 1 : 0,
    }),
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: () => ({
      opacity: isHovered || alwaysShowContent ? 1 : 0,
    }),
  };

  const rightContentVariants = {
    animate: () => ({
      opacity: isHovered || alwaysShowContent ? 1 : 0,
    }),
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Password copied to clipboard: ", text);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  const handleSkillLoad = (skill) => {
    setLoadedSkills(prev => ({ ...prev, [skill]: true }));
  };

  const isEmpty = !images || images.length === 0;

  // Remove brackets and content from title
  const cleanTitle = name.replace(/\s*\[.*?\]\s*/g, '');

  return (
    <motion.div
      className="desktop-project-card-wrapper"
      variants={wrapperVariants}
      animate="animate"
      transition={baseTransition}
    >
      {/* Title above card with tech icons */}
      <motion.div
        className="desktop-project-card-title-container"
        variants={titleVariants}
        animate="animate"
        transition={{ duration: 0.2 }}
      >
        <h4 className="desktop-project-card-title-above select-none">
          {cleanTitle}
        </h4>
        {!showSkillIcons && tech && tech.length > 0 && (
          <div className="desktop-project-card-title-tech">
            {tech.filter(t => t !== 'mcp').map((techItem, idx) => (
              <div key={idx} className="desktop-project-card-title-tech-icon-wrapper">
                <img
                  src={`https://skillicons.dev/icons?i=${techItem}`}
                  alt={techItem}
                  className="desktop-project-card-title-tech-icon select-none"
                />
                <span className="desktop-project-card-tech-tooltip">{techItem === 'js' ? 'JavaScript' : techItem === 'ts' ? 'TypeScript' : techItem}</span>
              </div>
            ))}
            {tech.includes('mcp') && (
              <div className="desktop-project-card-title-tech-icon-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg`}
                  alt="MCP"
                  className="desktop-project-card-title-tech-icon select-none"
                  style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                />
                <span className="desktop-project-card-tech-tooltip">MCP</span>
              </div>
            )}
            {name.includes("Shopify") && (
              <div className="desktop-project-card-title-tech-icon-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}assets/icon-shopify.svg`}
                  alt="Shopify"
                  className="desktop-project-card-title-tech-icon select-none"
                />
                <span className="desktop-project-card-tech-tooltip">Shopify</span>
              </div>
            )}
            {(name.includes("Portfolio") || name.includes("Technyra") || name.includes("Koppla")) && (
              <div className="desktop-project-card-title-tech-icon-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}assets/claude-ai-icon.svg`}
                  alt="Claude AI"
                  className="desktop-project-card-title-tech-icon select-none"
                />
                <span className="desktop-project-card-tech-tooltip">Claude AI</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <motion.div
        className={`desktop-project-card ${isEmpty && !alwaysShowContent ? 'desktop-project-card-empty' : ''}`}
        onMouseEnter={() => !isEmpty && setHoveredIndex(index)}
        onMouseLeave={() => !isEmpty && setHoveredIndex(null)}
        variants={cardVariants}
        animate="animate"
        transition={baseTransition}
      >
        {!isEmpty && (
          <motion.div
            className="desktop-project-card-bg"
            variants={bgVariants}
            animate="animate"
            transition={baseTransition}
          >
            <img
              src={`${import.meta.env.BASE_URL}${images[0].replace(/^\//, '')}`}
              alt={name}
              className="desktop-project-card-bg-image"
            />
            <motion.div
              className="desktop-project-card-overlay"
              variants={overlayVariants}
              animate="animate"
              transition={baseTransition}
            />
          </motion.div>
        )}

        {/* Content */}
        <div className="desktop-project-card-content">
          <motion.div
            className="desktop-project-card-right-content"
            variants={rightContentVariants}
            animate="animate"
            transition={baseTransition}
          >
            {/* Description */}
            <motion.div
              className="desktop-project-card-blurb-container"
              variants={containerVariants}
              animate="animate"
              transition={{ duration: 0.2 }}
            >
              <motion.p
                className="desktop-project-card-blurb select-none"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2 }}
              >
                {blurb}
              </motion.p>
            </motion.div>

            {/* Tech stack or Skill Icons Grid - only show for Tech used card */}
            {showSkillIcons && (
              <motion.div
                className="desktop-project-card-tech-container"
                variants={containerVariants}
                animate="animate"
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="desktop-project-card-skills-grid"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.2 }}
                >
                  {HeroSkillsData.skills.map((skill, idx) => (
                    <div key={idx} className="desktop-project-card-tech-icon-wrapper">
                      {!loadedSkills[skill] && skill !== 'claude' && skill !== 'mcp' && (
                        <div className="skeleton skeleton-tech-icon"></div>
                      )}
                      <img
                        src={skill === 'claude' ? `${import.meta.env.BASE_URL}assets/claude-ai-icon.svg` : skill === 'mcp' ? `${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg` : `https://skillicons.dev/icons?i=${skill}`}
                        alt={skill}
                        loading="eager"
                        onLoad={() => handleSkillLoad(skill)}
                        style={{ display: loadedSkills[skill] || skill === 'claude' || skill === 'mcp' ? 'block' : 'none' }}
                        className="desktop-project-card-tech-icon select-none"
                      />
                      <span className="desktop-project-card-tech-tooltip">{skill === 'js' ? 'JavaScript' : skill === 'ts' ? 'TypeScript' : skill === 'claude' ? 'Claude AI' : skill === 'mcp' ? 'MCP' : skill}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Tags */}
            <motion.div
              className="desktop-project-card-tags-container"
              variants={containerVariants}
              animate="animate"
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="desktop-project-card-tags"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2 }}
              >
                {tags.map((tag, idx) => (
                  <span key={idx} className="desktop-project-card-tag select-none">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="desktop-project-card-buttons-container"
              variants={containerVariants}
              animate="animate"
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="desktop-project-card-buttons"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2 }}
              >
                {github && github !== "https://github.com" && github !== "#" && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="desktop-project-card-btn"
                  >
                    Code <Iconghub />
                  </a>
                )}

                {livelink && livelink !== "https://example.com" && livelink !== "#" && (
                  <a
                    href={livelink}
                    target="_blank"
                    rel="noreferrer"
                    className="desktop-project-card-btn desktop-project-card-btn-primary"
                  >
                    {name.includes("Vapester") ? "Dev Store" : name.includes("App") ? "Live App" : "Live Site"}
                    <img
                      src={`${import.meta.env.BASE_URL}assets/icon-link.svg`}
                      alt="icon link"
                    />
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Password info - Vapester only */}
            {name.includes("Vapester") && (
              <motion.div
                className="desktop-project-card-password-container"
                variants={containerVariants}
                animate="animate"
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="desktop-project-card-password"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.2 }}
                >
                  <span className="desktop-project-card-password-label select-none">🔒 PASSWORD</span>
                  <button
                    className="desktop-project-card-password-btn"
                    onClick={() => copyToClipboard("eamaos")}
                  >
                    COPY PASSWORD
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DesktopProjectCard;
