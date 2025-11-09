import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import vapesterData from "../data/vapester.json";
import kanbanData from "../data/kanban.json";
import trailerviewData from "../data/trailerview.json";
import photosnapData from "../data/photosnap.json";
import placeholder1Data from "../data/placeholder1.json";
import placeholder2Data from "../data/placeholder2.json";
import placeholder3Data from "../data/placeholder3.json";

import SingleProject from "./SingleProject";
import DesktopProjectCard from "./DesktopProjectCard";
import "./Projects.css";

/* Custom hook to calculate maximum horizontal scroll distance */
const useMaxScroll = (scrollContainerRef) => {
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
};

const Projects = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  // Consolidate all project data
  const allProjects = useMemo(
    () => [
      ...trailerviewData,
      ...vapesterData,
      ...kanbanData,
      ...photosnapData,
      ...placeholder1Data,
      ...placeholder2Data,
      ...placeholder3Data,
    ],
    []
  );

  // Track component mount status
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll position and screen size
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);

    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Refs for horizontal scroll (desktop only)
  const targetRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Get maximum horizontal scroll distance (only calculated, used conditionally)
  const maxScroll = useMaxScroll(scrollContainerRef);

  // Get scroll progress relative to the target section (conditionally for desktop)
  const { scrollYProgress } = useScroll(
    isMounted && isDesktop
      ? {
          target: targetRef,
          offset: ['start start', 'end end'],
        }
      : {}
  );

  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  // Memoize styles for performance
  const sectionStyle = useMemo(
    () => ({
      height: '400vh',
      zIndex: 10,
      backgroundColor: isScrolled ? '#EDE9E3' : '#FFFBF5',
      transition: 'background-color 0.3s ease',
    }),
    [isScrolled]
  );

  const stickyContainerStyle = useMemo(
    () => ({
      zIndex: 10,
      backgroundColor: isScrolled ? '#EDE9E3' : '#FFFBF5',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'background-color 0.3s ease',
      borderBottom: '1px solid #78716C',
    }),
    [isScrolled]
  );

  // DESKTOP: Horizontal scroll layout
  if (isMounted && isDesktop) {
    return (
      <section id="portfolio" ref={targetRef} className="relative" style={sectionStyle}>
        <div className="sticky top-0 left-0 h-screen overflow-hidden" style={stickyContainerStyle}>
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
                <h3 className="projects-heading section-heading select-none" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Featured Projects</h3>
                {/* <h4 className="projects-subheading section-subheading select-none" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  Featured projects
                </h4> */}
              </div>

              {/* Render all projects with desktop card */}
              {allProjects.map((project, index) => (
                <div key={project.id} className={`flex-shrink-0 w-[35vw] ${index > 0 ? 'ml-[3rem]' : ''}`}>
                  <DesktopProjectCard
                    {...project}
                    index={index}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
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
      <div className="projects-container">
        <div className="projects-header">
          <h3 className="projects-heading section-heading select-none">PORTFOLIO</h3>
          <h4 className="projects-subheading section-subheading select-none">Featured projects</h4>
        </div>

        {/* Render all projects */}
        {allProjects.map((project) => (
          <SingleProject key={project.id} {...project} />
        ))}
      </div>
      <div className="projects-divider"></div>
    </section>
  );
};

export default Projects;
