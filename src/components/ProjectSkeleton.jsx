import { useEffect, useRef, useState } from "react";
import "./SingleProject.css";
import "./Skeleton.css";

const ProjectSkeleton = ({ align = "left" }) => {
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

  const containerClass = align === "right"
    ? `single-project-container-kanban ${inView ? 'project-fade-in' : 'project-fade-out'}`
    : `single-project-container ${inView ? 'project-fade-in' : 'project-fade-out'}`;

  return (
    <div ref={containerRef} className={containerClass}>
      {/* Image carousel skeleton */}
      <div className="single-project-swiper-container border-1">
        <div className="skeleton skeleton-project-image"></div>
      </div>

      {/* Project info skeleton */}
      <div className="single-project-info-container">
        {/* Title skeleton */}
        <div className="skeleton skeleton-project-title"></div>

        {/* Blurb skeleton - multiple lines */}
        <div className="skeleton-project-blurb">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text skeleton-text-short"></div>
        </div>

        {/* Tech stack skeleton */}
        <div className="single-project-tech-container">
          <div className="skeleton skeleton-tech-icon"></div>
          <div className="skeleton skeleton-tech-icon"></div>
          <div className="skeleton skeleton-tech-icon"></div>
          <div className="skeleton skeleton-tech-icon"></div>
        </div>

        {/* Tags skeleton */}
        <div className="single-project-tags">
          <div className="skeleton skeleton-tag"></div>
          <div className="skeleton skeleton-tag"></div>
          <div className="skeleton skeleton-tag"></div>
        </div>

        {/* Links skeleton */}
        <div className="single-project-links-container project-links-container">
          <div className="single-project-links">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;
