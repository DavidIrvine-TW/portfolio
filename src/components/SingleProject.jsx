import { useEffect, useRef, useState } from "react";
import Iconghub from "../icons/Iconghub";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSkillsData from "../data/heroSkillsData.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SingleProject.css";

const SingleProject = ({
  blurb,
  name,
  tech,
  tags,
  livelink,
  github,
  align,
  images,
  showSkillIcons,
}) => {
  const [inView, setInView] = useState(false);
  const [loadedSkills, setLoadedSkills] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

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

  const containerClass = align === "right"
    ? `single-project-container-kanban ${inView ? 'project-fade-in' : 'project-fade-out'}`
    : `single-project-container ${inView ? 'project-fade-in' : 'project-fade-out'}`;

  // Remove brackets and content from title
  const cleanTitle = name.replace(/\s*\[.*?\]\s*/g, '');

  return (
    <div ref={containerRef} className={containerClass}>
      {images && images.length > 0 && (
        <div className="single-project-swiper-container border-1">
          <Swiper
            className="single-project-swiper"
            pagination={{
              type: "bullets",
            }}
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            navigation={true}
            slidesPerView={1}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="single-project-swiper-slide">
                <img
                  key={index}
                  className="single-project-image"
                  src={`${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`}
                  alt="porfolio image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="single-project-info-container">
        <div className="single-project-title-container">
          <h4 className="single-project-title select-none">
            {cleanTitle}
          </h4>
          {!showSkillIcons && tech && tech.length > 0 && (
            <div className="single-project-title-tech">
              {tech.filter(t => t !== 'mcp').map((techItem, index) => (
                <div key={index} className="single-project-title-tech-icon-wrapper">
                  <img
                    src={`https://skillicons.dev/icons?i=${techItem}`}
                    alt={techItem}
                    className="single-project-title-tech-icon select-none"
                  />
                  <span className="single-project-skills-tooltip">{techItem === 'js' ? 'JavaScript' : techItem === 'ts' ? 'TypeScript' : techItem}</span>
                </div>
              ))}
              {tech.includes('mcp') && (
                <div className="single-project-title-tech-icon-wrapper">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg`}
                    alt="MCP"
                    className="single-project-title-tech-icon select-none"
                    style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                  />
                  <span className="single-project-skills-tooltip">MCP</span>
                </div>
              )}
              {name.includes("Shopify") && (
                <div className="single-project-title-tech-icon-wrapper">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/icon-shopify.svg`}
                    alt="Shopify"
                    className="single-project-title-tech-icon select-none"
                  />
                  <span className="single-project-skills-tooltip">Shopify</span>
                </div>
              )}
              {(name.includes("Portfolio") || name.includes("Technyra") || name.includes("Koppla")) && (
                <div className="single-project-title-tech-icon-wrapper">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/claude-ai-icon.svg`}
                    alt="Claude AI"
                    className="single-project-title-tech-icon select-none"
                  />
                  <span className="single-project-skills-tooltip">Claude AI</span>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="single-project-details select-none">{blurb}</p>

        {/* Only show skill icons grid for Tech used card */}
        {showSkillIcons && (
          <div className="single-project-skills-grid">
            {HeroSkillsData.skills.map((skill, index) => (
              <div key={index} className="single-project-skills-img-wrapper">
                {!loadedSkills[skill] && skill !== 'claude' && skill !== 'mcp' && (
                  <div className="skeleton skeleton-tech-icon"></div>
                )}
                <img
                  className="single-project-skills-img select-none"
                  src={skill === 'claude' ? `${import.meta.env.BASE_URL}assets/claude-ai-icon.svg` : skill === 'mcp' ? `${import.meta.env.BASE_URL}assets/mcp-server-stroke-rounded.svg` : `https://skillicons.dev/icons?i=${skill}`}
                  alt={skill}
                  loading="eager"
                  onLoad={() => handleSkillLoad(skill)}
                  style={{ display: loadedSkills[skill] || skill === 'claude' || skill === 'mcp' ? 'block' : 'none' }}
                />
                <span className="single-project-skills-tooltip">{skill === 'js' ? 'JavaScript' : skill === 'ts' ? 'TypeScript' : skill === 'claude' ? 'Claude AI' : skill === 'mcp' ? 'MCP' : skill}</span>
              </div>
            ))}
          </div>
        )}

        <div className="single-project-tags">
          {tags.map((tag, index) => {
            return (
              <span className="single-project-tag select-none" key={index}>
                {tag}
              </span>
            );
          })}
        </div>

        <div className="single-project-links-container project-links-container">
          <div className="single-project-links">
            {github && github !== "https://github.com" && github !== "#" && (
              <a href={github} target="_blank" rel="noreferrer" className="single-project-link-btn">
                Code <Iconghub />{" "}
              </a>
            )}

            {livelink && livelink !== "https://example.com" && livelink !== "#" && (
              <a className="single-project-link-btn single-project-link-btn-primary" href={livelink} target="_blank" rel="noreferrer">
                {name.includes("Vapester") ? "Dev Store" : name.includes("App") ? "Live App" : "Live Site"}
                <img src={`${import.meta.env.BASE_URL}assets/icon-link.svg`} alt="icon link" />
              </a>
            )}
          </div>

          {name.includes("Vapester") && (
            <div className="single-project-password-info">
              <div className="single-project-password-content">
                <span className="single-project-password-label select-none">🔒 PASSWORD</span>
                <button
                  className="single-project-password-btn"
                  onClick={() => copyToClipboard("eamaos")}
                >
                  COPY PASSWORD
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
