import React from "react";
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


  return (
    <div className={align === "right" ? 'single-project-container-kanban' : 'single-project-container'}>
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
                src={image}
                alt="porfolio image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="single-project-info-container">
        <h4 className="single-project-title">
          {name}{" "}
          <img
            src={nameIcon}
            alt={nameIconAlt}
            className="single-project-icon"
          />
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
          {name === "Vapester" && <img src="/assets/icon-shopify.svg" alt="Shopify" />}
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
            <p className="single-project-password-info">
              *Password:
              <span
                className="single-project-password-btn"
                onClick={() => copyToClipboard("eamaos")}
              >
                COPY TO CLIPBOARD
              </span>
            </p>
          ) : ""}

          <div className="single-project-links">
            <a href={github} target="_blank" className="single-project-link-btn">
              Code <Iconghub />{" "}
            </a>

            <a className="single-project-link-btn" href={livelink} target="_blank">
              Live
              <img src="/assets/icon-link.svg" alt="icon link" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
