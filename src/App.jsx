import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useState, useEffect } from "react";
import Lenis from "lenis";

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
        <Projects />
        {/* Spacer for desktop fixed Contact section */}
        <div className="w-full hidden lg:block lg:h-screen" aria-hidden="true"></div>
        <Contact />
      </main>
    </div>
  );
}

export default App;
