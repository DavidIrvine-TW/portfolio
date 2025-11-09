import "./About.css";

function About() {
  const openResume = () => {
    window.open("/assets/David_Irvine_Web_Developer.pdf", "_blank");
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-heading section-heading select-none">
            ABOUT
            <img src="/assets/task.png" alt="about icon" className="about-icon select-none" />
          </h2>
          <h3 className="about-subheading section-subheading select-none">
            Building fast, functional, and engaging web experiences
          </h3>
        </div>

        <div className="about-content">
          <div className="about-stats-grid">
            <div className="about-image-card">
              <img src="/assets/study.gif" alt="coding" className="about-card-gif select-none" />
              <div className="about-card-label select-none">Building</div>
            </div>
            <div className="about-image-card">
              <img src="/assets/synth.gif" alt="creating" className="about-card-gif select-none" />
              <div className="about-card-label select-none">Creating</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-number select-none">20+</div>
              <div className="about-stat-label select-none">Projects</div>
              <div className="about-stat-desc select-none">Delivered</div>
            </div>
          </div>

          <div className="about-text">
            <p className="about-paragraph select-none">
              Glasgow-based web developer specializing in rapid application development
              with cutting-edge AI integrations via Model Context Protocol. At StudioEast,
              I architected &ldquo;Blueprint&rdquo;—an internal web builder using Next.js and Storyblok
              that slashed standard business site builds from weeks to days while delivering
              full-featured solutions with custom API integrations and modern animations.
            </p>
            <p className="about-paragraph select-none">
              I excel at transforming complex Figma designs into polished, production-ready
              applications. With 20+ client projects delivered across WordPress, Shopify,
              React, and Next.js, I&apos;ve built custom API integrations, reusable component
              libraries, and diverse web solutions—all while maintaining exceptional code
              quality and meeting ambitious timelines in fast-paced agency environments.
            </p>
            <button onClick={openResume} className="about-resume-btn btn-primary">
              View resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
