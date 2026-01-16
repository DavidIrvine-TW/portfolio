import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useTransform, useScroll, useSpring, AnimatePresence } from "framer-motion";
import vapesterData from "../data/vapester.json";
import kanbanData from "../data/kanban.json";
import trailerviewData from "../data/trailerview.json";
import placeholder1Data from "../data/placeholder1.json";
import marvchatData from "../data/marvchat.json";

import SingleProject from "./SingleProject";
import DesktopProjectCard from "./DesktopProjectCard";
import "./Projects.css";

/* Custom hook to calculate maximum horizontal scroll distance */
const useMaxScroll = (scrollContainerRef, dependencies = []) => {
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollLimit = useCallback(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScroll(containerWidth - viewportWidth);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      updateScrollLimit();
    }, 100);

    window.addEventListener('resize', updateScrollLimit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollLimit);
    };
  }, [updateScrollLimit, ...dependencies]);

  return maxScroll;
};

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  // Consolidate all project data
  const allProjects = useMemo(
    () => [
      ...marvchatData,
      ...placeholder1Data,
      ...trailerviewData,
      ...vapesterData,
      ...kanbanData,
    ],
    []
  );

  // Track screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Refs for horizontal scroll (desktop only)
  const targetRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Get maximum horizontal scroll distance
  const maxScroll = useMaxScroll(scrollContainerRef);

  // Get scroll progress relative to the target section
  // targetRef is always in DOM (hidden when not needed) to avoid hydration errors
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  // Calculate scroll progress for 200px fade (section is 400vh)
  const fadeDistance = 200; // pixels
  const fadeProgress = useMemo(() => {
    if (typeof window !== 'undefined') {
      const sectionHeight = 4 * window.innerHeight; // 400vh
      return fadeDistance / sectionHeight;
    }
    return 0.025; // fallback
  }, []);

  // Title opacity - fade out as cards fade in (with smooth spring)
  const titleOpacityRaw = useTransform(scrollYProgress, [0, fadeProgress], [1, 0]);
  const titleOpacity = useSpring(titleOpacityRaw, { stiffness: 100, damping: 30 });

  // Memoize styles for performance
  const sectionStyle = useMemo(
    () => ({
      height: '400vh',
      zIndex: 10,
    }),
    []
  );

  const stickyContainerStyle = useMemo(
    () => ({
      zIndex: 10,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      borderBottom: '4px solid #404040',
    }),
    []
  );

  // DESKTOP: Horizontal scroll layout
  if (isDesktop) {
    // Get the current hovered project's first image
    const hoveredImage = hoveredIndex !== null && allProjects[hoveredIndex]?.images?.[0]
      ? `${import.meta.env.BASE_URL}${allProjects[hoveredIndex].images[0].replace(/^\//, '')}`
      : null;

    return (
      <section id="portfolio" ref={targetRef} className="relative" style={sectionStyle}>
        {/* Floating abstract shapes */}
        <div className="projects-floating-shapes">
          <div className="projects-shape projects-shape-1"></div>
          <div className="projects-shape projects-shape-2"></div>
        </div>

        <div
          className="sticky top-0 left-0 h-screen overflow-hidden desktop-projects-container"
          style={stickyContainerStyle}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Full viewport background image wallpaper */}
          <AnimatePresence mode="wait">
            {hoveredImage && (
              <motion.div
                key={hoveredImage}
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
              >
                <img
                  src={hoveredImage}
                  alt="Project background"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ opacity: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            ref={scrollContainerRef}
            style={{ x, position: 'relative', zIndex: 10 }}
            className="flex items-center h-screen px-[1.75rem]"
          >
            <div className="flex items-center">
              {/* Spacer at the start */}
              <div className="w-[5vw] flex-shrink-0" />

              {/* Header inline with cards */}
              <motion.div
                className="flex flex-col gap-[1rem] flex-shrink-0 w-[30vw] mr-[1rem]"
                style={{ opacity: titleOpacity }}
              >
                <h3 className="projects-heading section-heading select-none" style={{ fontSize: '4.5rem', fontWeight: 300, color: '#E09145', fontFamily: "'Rubik', sans-serif", letterSpacing: '-0.03em' }}>
                  Projects
                </h3>
              </motion.div>

              {/* Render projects */}
              <div
                className="flex items-center"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {allProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`flex-shrink-0 w-[40vw] ${index > 0 ? 'ml-[3rem]' : ''}`}
                  >
                    <DesktopProjectCard
                      {...project}
                      index={index}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                    />
                  </div>
                ))}

                {/* Empty card at the end */}
                <div className="flex-shrink-0 w-[27vw] ml-[3rem]">
                  <div className="empty-end-card" />
                </div>
              </div>

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
    <section id="portfolio" className="projects-section" ref={targetRef}>
      {/* Floating abstract shapes */}
      <div className="projects-floating-shapes">
        <div className="projects-shape projects-shape-1"></div>
        <div className="projects-shape projects-shape-2"></div>
      </div>

      <div className="projects-container">
        <div className="projects-header">
          <h3 className="projects-heading section-heading select-none">PORTFOLIO</h3>
          <h4 className="projects-subheading section-subheading select-none">Featured <span style={{ color: '#E09145' }}>projects</span></h4>
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
