import Header from "./components/Header";
import Hero from "./components/Hero";
import { useState, useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";

// Lazy load components below the fold
const About = lazy(() => import("./components/About"));
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
        <Hero />
        <Suspense fallback={<div className="min-h-screen"></div>}>
          {/* <About/> */}
          <Projects />
          {/* Spacer for desktop fixed Contact section */}
          <div className="w-full hidden lg:block lg:h-screen" aria-hidden="true"></div>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
