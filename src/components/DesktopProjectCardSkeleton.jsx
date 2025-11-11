import "./DesktopProjectCard.css";
import "./Skeleton.css";

const DesktopProjectCardSkeleton = () => {
  return (
    <div className="desktop-project-card-wrapper">
      {/* Title above card - skeleton */}
      <div className="desktop-project-card-title-above">
        <div className="skeleton" style={{ width: '60%', height: '24px', borderRadius: '6px' }}></div>
      </div>

      <div className="desktop-project-card">
        {/* Background image skeleton */}
        <div className="desktop-project-card-bg">
          <div className="skeleton skeleton-project-image" style={{ width: '100%', height: '100%', borderRadius: '8px' }}></div>
        </div>

        {/* Content skeleton */}
        <div className="desktop-project-card-content">
          <div className="desktop-project-card-right-content">
            {/* Description skeleton */}
            <div className="desktop-project-card-blurb-container">
              <div className="skeleton-project-blurb">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text skeleton-text-short"></div>
              </div>
            </div>

            {/* Tech stack skeleton */}
            <div className="desktop-project-card-tech-container">
              <div className="desktop-project-card-tech">
                <div className="skeleton skeleton-tech-icon"></div>
                <div className="skeleton skeleton-tech-icon"></div>
                <div className="skeleton skeleton-tech-icon"></div>
                <div className="skeleton skeleton-tech-icon"></div>
              </div>
            </div>

            {/* Tags skeleton */}
            <div className="desktop-project-card-tags-container">
              <div className="desktop-project-card-tags">
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
              </div>
            </div>

            {/* Buttons skeleton */}
            <div className="desktop-project-card-buttons-container">
              <div className="desktop-project-card-buttons">
                <div className="skeleton skeleton-button"></div>
                <div className="skeleton skeleton-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopProjectCardSkeleton;
