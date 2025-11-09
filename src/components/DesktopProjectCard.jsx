import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Iconghub from "../icons/Iconghub";
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
}) => {
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

  // Consolidated animation variants
  const cardVariants = {
    animate: () => ({
      scale: isHovered ? 1.05 : 1,
    }),
  };

  const overlayVariants = {
    animate: () => ({
      opacity: 0,
    }),
  };

  const titleVariants = {
    animate: () => ({
      opacity: isHovered ? 1 : 0.9,
    }),
  };

  const containerVariants = {
    animate: () => ({
      opacity: isHovered ? 1 : 0,
    }),
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: () => ({
      opacity: isHovered ? 1 : 0,
    }),
  };

  const rightContentVariants = {
    animate: () => ({
      opacity: isHovered ? 1 : 0,
      scaleX: isHovered ? 1 : 0.95,
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

  const isEmpty = !images || images.length === 0;

  return (
    <div className="desktop-project-card-wrapper">
      {/* Title above card */}
      <motion.h4
        className="desktop-project-card-title-above select-none"
        variants={titleVariants}
        animate="animate"
        transition={{ ...baseTransition, delay: getDelay(0.1, 0.4) }}
      >
        {name}
      </motion.h4>

      <motion.div
        className={`desktop-project-card ${isEmpty ? 'desktop-project-card-empty' : ''}`}
        onMouseEnter={() => !isEmpty && setHoveredIndex(index)}
        onMouseLeave={() => !isEmpty && setHoveredIndex(null)}
        variants={cardVariants}
        animate="animate"
        transition={baseTransition}
      >
        {!isEmpty && (
          <div className="desktop-project-card-bg">
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
          </div>
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
              transition={{ ...baseTransition, delay: getDelay(0.2, 0.3) }}
            >
              <motion.p
                className="desktop-project-card-blurb select-none"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ ...baseTransition, delay: getDelay(0.3, 0.2) }}
              >
                {blurb}
              </motion.p>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              className="desktop-project-card-tech-container"
              variants={containerVariants}
              animate="animate"
              transition={{ ...baseTransition, delay: getDelay(0.3, 0.2) }}
            >
              <motion.div
                className="desktop-project-card-tech"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ ...baseTransition, delay: getDelay(0.4, 0.1) }}
              >
                {tech.map((techItem, idx) => (
                  <img
                    key={idx}
                    src={`https://skillicons.dev/icons?i=${techItem}`}
                    alt={techItem}
                    className="desktop-project-card-tech-icon select-none"
                  />
                ))}
                {name.includes("Shopify") && (
                  <img
                    src={`${import.meta.env.BASE_URL}assets/icon-shopify.svg`}
                    alt="Shopify"
                    className="desktop-project-card-tech-icon select-none"
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="desktop-project-card-tags-container"
              variants={containerVariants}
              animate="animate"
              transition={{ ...baseTransition, delay: getDelay(0.4, 0.2) }}
            >
              <motion.div
                className="desktop-project-card-tags"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ ...baseTransition, delay: getDelay(0.45, 0.15) }}
              >
                {tags.map((tag, idx) => (
                  <span key={idx} className="desktop-project-card-tag select-none">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Action buttons with password (if applicable) */}
            <motion.div
              className="desktop-project-card-buttons-container"
              variants={containerVariants}
              animate="animate"
              transition={{ ...baseTransition, delay: getDelay(0.5, 0.2) }}
            >
              <motion.div
                className="desktop-project-card-buttons-wrapper"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                transition={{ ...baseTransition, delay: getDelay(0.55, 0.15) }}
              >
                <div className="desktop-project-card-buttons">
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
                      Live
                      <img
                        src={`${import.meta.env.BASE_URL}assets/icon-link.svg`}
                        alt="icon link"
                      />
                    </a>
                  )}
                </div>

                {/* Password info - Vapester only */}
                {name.includes("Vapester") && (
                  <div className="desktop-project-card-password">
                    <span className="desktop-project-card-password-label select-none">🔒 Password: </span>
                    <button
                      className="desktop-project-card-password-btn"
                      onClick={() => copyToClipboard("eamaos")}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DesktopProjectCard;
