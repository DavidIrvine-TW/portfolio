import "./AboutInfo.css";

const AboutInfo = () => {
  return (
    <section id="about-info" className="about-info-section">
      {/* Floating abstract shapes */}
      <div className="about-info-floating-shapes">
        <div className="about-info-shape about-info-shape-1"></div>
        <div className="about-info-shape about-info-shape-2"></div>
        <div className="about-info-shape about-info-shape-3"></div>
        <div className="about-info-shape about-info-shape-4"></div>
      </div>

      <div className="about-info-wrapper">
        <div className="about-info-content">
          <div className="about-info-grid">

            {/* Large feature panel with diagonal split */}
            <div className="about-info-feature-panel">
              <div className="about-info-feature-top">
                <h2 className="about-info-feature-title">
                  <span className="about-info-title-line">Building</span>
                  <span className="about-info-title-line about-info-title-accent">Modern Web</span>
                  <span className="about-info-title-line">Experiences</span>
                </h2>
              </div>
              <div className="about-info-feature-bottom">
                <div className="about-info-feature-text">
                  <p>Specializing in rapid development with cutting-edge AI integrations. From concept to deployment, creating production-ready applications that push boundaries.</p>
                </div>
                <div className="about-info-feature-metrics">
                  <div className="about-info-metric">
                    <span className="about-info-metric-value">20+</span>
                    <span className="about-info-metric-label">Projects</span>
                  </div>
                  <div className="about-info-metric-divider"></div>
                  <div className="about-info-metric">
                    <span className="about-info-metric-value">48h</span>
                    <span className="about-info-metric-label">Response</span>
                  </div>
                  <div className="about-info-metric-divider"></div>
                  <div className="about-info-metric">
                    <span className="about-info-metric-value">100%</span>
                    <span className="about-info-metric-label">Quality</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech stack showcase */}
            <div className="about-info-stack-panel">
              <h3 className="about-info-stack-title">Tech Stack</h3>
              <div className="about-info-stack-categories">
                <div className="about-info-stack-category">
                  <span className="about-info-stack-cat-label">Frontend</span>
                  <div className="about-info-stack-items">
                    <span>React</span>
                    <span>Next.js</span>
                    <span>TypeScript</span>
                  </div>
                </div>
                <div className="about-info-stack-category">
                  <span className="about-info-stack-cat-label">Backend</span>
                  <div className="about-info-stack-items">
                    <span>Node.js</span>
                    <span>Express</span>
                    <span>MongoDB</span>
                  </div>
                </div>
                <div className="about-info-stack-category">
                  <span className="about-info-stack-cat-label">Tools</span>
                  <div className="about-info-stack-items">
                    <span>Claude AI</span>
                    <span>MCP</span>
                    <span>Git</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise cards with unique layout */}
            <div className="about-info-expertise-card about-info-expertise-primary">
              <div className="about-info-expertise-icon">⚡</div>
              <h4 className="about-info-expertise-title">Rapid Development</h4>
              <p className="about-info-expertise-desc">AI-powered workflows that slash development time without compromising quality</p>
            </div>

            <div className="about-info-expertise-card about-info-expertise-secondary">
              <div className="about-info-expertise-icon">🎨</div>
              <h4 className="about-info-expertise-title">Design to Code</h4>
              <p className="about-info-expertise-desc">Pixel-perfect implementation from Figma to production-ready components</p>
            </div>

            {/* Availability badge */}
            <div className="about-info-availability">
              <div className="about-info-availability-badge">
                <span className="about-info-availability-dot"></span>
                <span className="about-info-availability-text">Available for Freelance</span>
              </div>
              <p className="about-info-availability-note">Currently accepting new projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
