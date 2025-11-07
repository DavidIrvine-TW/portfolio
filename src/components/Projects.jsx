import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import vapesterData from "../data/vapester.json";
import kanbanData from "../data/kanban.json";
import trailerviewData from "../data/trailerview.json";
import photosnapData from "../data/photosnap.json";

import SingleProject from "./SingleProject";
import "./Projects.css";

/* Custom hook to calculate maximum horizontal scroll distance */
function useMaxScroll(scrollContainerRef) {
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollLimit = useCallback(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScroll(containerWidth - viewportWidth);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    updateScrollLimit();
    window.addEventListener('resize', updateScrollLimit);
    return () => window.removeEventListener('resize', updateScrollLimit);
  }, [updateScrollLimit]);

  return maxScroll;
}

const Projects = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Initialize isDesktop based on current window size to avoid hydration issues
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

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

  // Detect desktop screen size (1024px and above)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Don't need to call checkDesktop() here since we initialize with the correct value
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Refs for horizontal scroll (desktop only)
  const targetRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Get maximum horizontal scroll distance (only calculated, used conditionally)
  const maxScroll = useMaxScroll(scrollContainerRef);

  // Get scroll progress relative to the target section (safe with null ref)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  // DESKTOP: Horizontal scroll layout
  if (isDesktop) {
    return (
      <section
        id="portfolio"
        ref={targetRef}
        className="relative"
        style={{
          height: '400vh',
          zIndex: 10,
          backgroundColor: isScrolled ? '#EDE9E3' : '#FFFBF5',
          transition: 'background-color 0.3s ease'
        }}
      >
        <div
          className="sticky top-0 left-0 h-screen overflow-hidden"
          style={{
            zIndex: 10,
            backgroundColor: isScrolled ? '#EDE9E3' : '#FFFBF5',
            borderBottom: '32px solid #78716C',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'background-color 0.3s ease'
          }}
        >
          <motion.div
            ref={scrollContainerRef}
            style={{ x }}
            className="flex items-center h-screen px-[1.75rem]"
          >
            <div className="flex items-center">
              {/* Spacer at the start */}
              <div className="w-[5vw] flex-shrink-0" />

              {/* Header inline with cards */}
              <div className="flex flex-col gap-[1rem] flex-shrink-0 w-[30vw] mr-[1rem]">
                <h3 className="projects-heading section-heading">PORTFOLIO</h3>
                <h4 className="projects-subheading section-subheading">
                  Featured projects
                </h4>
              </div>

              {/* Render all projects */}
              {[...trailerviewData, ...vapesterData, ...kanbanData, ...photosnapData].map((data, index) => (
                <div key={data.id} className={`flex-shrink-0 w-[60vw] ${index > 0 ? 'ml-[3rem]' : ''}`}>
                  <SingleProject
                    name={data.name}
                    nameIcon={data.nameIcon}
                    nameIconAlt={data.nameIconAlt}
                    tech={data.tech}
                    tags={data.tags}
                    blurb={data.blurb}
                    github={data.github}
                    livelink={data.livelink}
                    images={data.images}
                    align={data.align}
                  />
                </div>
              ))}

              {/* Spacer at the end */}
              <div className="w-[5vw] flex-shrink-0" />
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // MOBILE/TABLET: Original vertical layout
  return (
    <section id="portfolio" className={`projects-section ${isScrolled ? 'projects-section-scrolled' : ''}`}>

      <div className="projects-container ">

        <div className="projects-header">
          <h3 className="projects-heading section-heading">
            PORTFOLIO
            {/* <img
              src={`${import.meta.env.BASE_URL}assets/briefcase.png`}
              alt="briefcase icon"
              className="projects-icon"
            /> */}
          </h3>
          <h4 className="projects-subheading section-subheading ">
            Featured projects
          </h4>
        </div>


        {/* trailerview */}
        {trailerviewData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}


        {/* vapestore */}
        {vapesterData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}


        {/* Kanban */}
        {kanbanData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}




        {/* photosnap */}
        {photosnapData.map((data, index) => (
          <SingleProject
            name={data.name}
            nameIcon={data.nameIcon}
            nameIconAlt={data.nameIconAlt}
            tech={data.tech}
            tags={data.tags}
            blurb={data.blurb}
            github={data.github}
            livelink={data.livelink}
            key={data.id}
            images={data.images}
            align={data.align}
          />
        ))}

      </div>
      <div className="projects-divider"></div>
    </section>
  );
};

export default Projects;
