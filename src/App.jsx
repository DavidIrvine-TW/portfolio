import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectSkeleton from "./components/ProjectSkeleton";
import { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";

// Lazy load components below the fold
const Projects = lazy(() => import("./components/Projects"));
const Proficiencies = lazy(() => import("./components/Proficiencies"));
const Contact = lazy(() => import("./components/Contact"));

// Preload functions
const preloadProjects = () => import("./components/Projects");
const preloadProficiencies = () => import("./components/Proficiencies");
const preloadContact = () => import("./components/Contact");

function App() {
  const [menu, setMenu] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const wrapperClass = menu ? "overflow-hidden" : "min-h-screen";

  // Wait for all resources to load before hiding loader
  useEffect(() => {
    const hideLoader = () => {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 400);
      }
      setAppReady(true);
    };

    // Wait for all resources: window load + fonts + minimum display time
    const minDisplayTime = new Promise(resolve => setTimeout(resolve, 500));
    const windowLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });
    const fontsReady = document.fonts.ready;

    Promise.all([minDisplayTime, windowLoad, fontsReady]).then(hideLoader);
  }, []);

  // Preload below-the-fold components after app is ready
  useEffect(() => {
    if (appReady) {
      // Use requestIdleCallback if available, otherwise setTimeout
      const preload = () => {
        preloadProjects();
        preloadProficiencies();
        preloadContact();
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(preload);
      } else {
        setTimeout(preload, 200);
      }
    }
  }, [appReady]);

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
    <div id="wrapper" className={`${wrapperClass} w-full h-full transition-opacity duration-300 ${appReady ? 'opacity-100' : 'opacity-0'}`}>
      <Header menu={menu} setMenu={setMenu} />

      <main className="w-full">
        {/* Wrapper for Hero and Projects with opaque background */}
        <div className="hero-projects-wrapper">
          <Hero />
          <Suspense fallback={
            <section className="projects-section">
              <div className="projects-container">
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

        {/* Proficiencies section - scrolls normally after horizontal projects */}
        <Suspense fallback={null}>
          <Proficiencies />
        </Suspense>

        {/* Spacer for desktop fixed Contact section */}
        <div className="w-full hidden lg:block lg:h-screen" aria-hidden="true"></div>
        <Contact />
      </main>
    </div>
  );
}

export default App;
