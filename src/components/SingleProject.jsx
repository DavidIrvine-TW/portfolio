import { useEffect, useRef, useState } from "react";
import Iconghub from "../icons/Iconghub";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
}) => {
  const [inView, setInView] = useState(false);
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

  const containerClass = align === "right"
    ? `single-project-container-kanban ${inView ? 'project-fade-in' : 'project-fade-out'}`
    : `single-project-container ${inView ? 'project-fade-in' : 'project-fade-out'}`;

  return (
    <div ref={containerRef} className={containerClass}>
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

      <div className="single-project-info-container">
        <h4 className="single-project-title select-none">
          {name}{" "}
          {/* <img
            src={`${import.meta.env.BASE_URL}${nameIcon.replace(/^\//, '')}`}
            alt={nameIconAlt}
            className="single-project-icon"
          /> */}
        </h4>

        <p className="single-project-details select-none">{blurb}</p>

        <div className="single-project-tech-container">
          {tech.map((tech, index) => {
            return (
              <div key={index} className="single-project-skills-img-wrapper">
                <img
                  className="single-project-skills-img select-none"
                  src={`https://skillicons.dev/icons?i=${tech}`}
                  alt={tech}
                  loading="eager"
                />
                <span className="single-project-skills-tooltip">{tech === 'js' ? 'JavaScript' : tech === 'ts' ? 'TypeScript' : tech}</span>
              </div>
            );
          })}
          {name.includes("Shopify") && (
            <div className="single-project-skills-img-wrapper">
              <img
                src={`${import.meta.env.BASE_URL}assets/icon-shopify.svg`}
                alt="Shopify"
                className="single-project-skills-img select-none"
              />
              <span className="single-project-skills-tooltip">Shopify</span>
            </div>
          )}
        </div>

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
          {name.includes("Vapester") && (
            <div className="single-project-password-info">
              <div className="single-project-password-content">
                <span className="single-project-password-label select-none">🔒 Password Protected: </span>
                <button
                  className="single-project-password-btn"
                  onClick={() => copyToClipboard("eamaos")}
                >
                  Copy password
                </button>
              </div>
            </div>
          )}

          <div className="single-project-links">
            {github && github !== "https://github.com" && github !== "#" && (
              <a href={github} target="_blank" rel="noreferrer" className="single-project-link-btn">
                Code <Iconghub />{" "}
              </a>
            )}

            {livelink && livelink !== "https://example.com" && livelink !== "#" && (
              <a className="single-project-link-btn single-project-link-btn-primary" href={livelink} target="_blank" rel="noreferrer">
                Live
                <img src={`${import.meta.env.BASE_URL}assets/icon-link.svg`} alt="icon link" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
