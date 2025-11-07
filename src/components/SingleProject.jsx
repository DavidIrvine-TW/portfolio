import React, { useEffect, useRef, useState } from "react";
import Iconghub from "../icons/Iconghub";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./SingleProject.css";

const SingleProject = ({
  blurb,
  name,
  nameIcon,
  nameIconAlt,
  tech,
  tags,
  livelink,
  github,
  index,
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
        <h4 className="single-project-title">
          {name}{" "}
          {/* <img
            src={`${import.meta.env.BASE_URL}${nameIcon.replace(/^\//, '')}`}
            alt={nameIconAlt}
            className="single-project-icon"
          /> */}
        </h4>

        <p className="single-project-details">{blurb}</p>

        <div className="single-project-tech-container">
          {tech.map((tech, index) => {
            return (
              <img
                className="single-project-skills-img"
                key={index}
                src={`https://skillicons.dev/icons?i=${tech}`}
                alt={tech}
                loading="eager"
              />
            );
          })}
          {name === "Vapester" && <img src={`${import.meta.env.BASE_URL}assets/icon-shopify.svg`} alt="Shopify" />}
        </div>

        <div className="single-project-tags">
          {tags.map((tag, index) => {
            return (
              <span className="single-project-tag" key={index}>
                {tag}
              </span>
            );
          })}
        </div>

        <div className="single-project-links-container project-links-container">
          {name === "Vapester" ? (
            <div className="single-project-password-info">
              <div className="single-project-password-content">
                <span className="single-project-password-label">🔒 Password Protected: </span>
                <button
                  className="single-project-password-btn"
                  onClick={() => copyToClipboard("eamaos")}
                >
                  Copy Password
                </button>
              </div>
            </div>
          ) : ""}

          <div className="single-project-links">
            <a href={github} target="_blank" className="single-project-link-btn">
              Code <Iconghub />{" "}
            </a>

            <a className="single-project-link-btn" href={livelink} target="_blank">
              Live
              <img src={`${import.meta.env.BASE_URL}assets/icon-link.svg`} alt="icon link" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
