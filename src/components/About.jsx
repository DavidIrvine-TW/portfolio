import React from "react";
import IconAbout from "../icons/iconAbout";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./About.css";

function About() {
  const openResume = () => {
    window.open("/assets/David_Irvine_Web_Developer.pdf", "_blank");
  };

  return (
    <section id="about" className="about-section page-width">
      <div className="about-container">
        <div className="about-content-wrapper">
          <div className="about-swiper-container">
            <Swiper
              className="about-swiper"
              pagination={{}}
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              navigation={true}
              slidesPerView={1}
            >
              <SwiperSlide className="about-swiper-slide">
                <img
                  className="about-swiper-image"
                  src="/assets/teacher.gif"
                  alt="code gif"
                />
              </SwiperSlide>
              <SwiperSlide className="about-swiper-slide">
                <img
                  className="about-swiper-image"
                  src="/assets/synth.gif"
                  alt="teacher gif"
                />
              </SwiperSlide>
              <SwiperSlide className="about-swiper-slide">
                <img
                  className="about-swiper-image"
                  src="/assets/giphy.gif"
                  alt="code gif"
                />
              </SwiperSlide>
              <SwiperSlide className="about-swiper-slide">
                <img
                  className="about-swiper-image"
                  src="/assets/study.gif"
                  alt="code gif"
                />
              </SwiperSlide>
              <SwiperSlide className="about-swiper-slide">
                <img
                  className="about-swiper-image"
                  src="/assets/dj.gif"
                  alt="code gif"
                />
              </SwiperSlide>
            </Swiper>
            <p className="about-swiper-caption">
              Is a picture worth a 1000 words?
            </p>
          </div>

          <div className="about-text-container">
            <h3 className="about-heading">
              A LITTLE ABOUT ME{" "}
              <img src="/assets/social-media.png" alt="about icon" className="about-icon" />
            </h3>
            <p className="about-description">
              I spent eleven years as an international school teacher in Taiwan,
              Korea, Vietnam, Thailand, and Japan. A great experience that honed my
              communication skills, adaptability, and cultural awareness.
              <br />
              <br />
              Now, as a dad and web developer, I bring a blend of empathy,
              patience, and technical expertise to my work. My
              background equips me to navigate diverse environments and tackle
              challenges with creativity and understanding.
              <br />
              <br />
              I returned to the UK in March 2024 to pursue my
              passion for web development.
            </p>
            <button onClick={openResume} className="about-resume-btn">
              my CV/Resume
            </button>
          </div>
        </div>
        <div className="about-divider"></div>
      </div>
    </section>
  );
}

export default About;
