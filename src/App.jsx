import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectSkeleton from "./components/ProjectSkeleton";
import { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";

// Lazy load components below the fold
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  const [menu, setMenu] = useState(false);

  const wrapperClass = menu ? "overflow-hidden" : "min-h-screen";

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div id="wrapper" className={`${wrapperClass}  w-full h-full`}>
      <Header menu={menu} setMenu={setMenu} />

      <main className="w-full">
        {/* Wrapper for Hero and Projects with opaque background */}
        <div className="hero-projects-wrapper">
          <Hero />
          <Suspense fallback={
            <section className="projects-section">
              <div className="projects-container">

                {/* <div className="projects-header">
                  <h3 className="projects-heading section-heading">
                    PORTFOLIO
                    <img
                      src={`${import.meta.env.BASE_URL}assets/briefcase.png`}
                      alt="briefcase icon"
                      className="projects-icon"
                    />
                  </h3>
                  <h4 className="projects-subheading section-subheading">
                    Featured projects
                  </h4>
                </div> */}

                <ProjectSkeleton align="left" />
                <ProjectSkeleton align="left" />
                <ProjectSkeleton align="right" />
                <ProjectSkeleton align="right" />
              </div>
              <div className="projects-divider"></div>
            </section>
          }>
            <Projects />
          </Suspense>
        </div>

        {/* Spacer for desktop fixed Contact section */}
        <div className="w-full hidden lg:block lg:h-screen" aria-hidden="true"></div>
        <Contact />
      </main>
    </div>
  );
}

export default App;
