import React from "react";
import IconArrowUp from "../icons/IconArrowUp";
import "./Header.css";

function Header({menu, setMenu}) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const isOpen = menu ? "cross" : "";
  const menuClass = menu ? "left-0 opacity-100" : "-left-full opacity-0"

  const menuHandler = () => {
    setMenu(prev => !prev)
  }

  // Track scroll position for navbar styling
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menu]);

  // Custom smooth scroll function with easing (from Technyra pattern)
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();

    // Close mobile menu if open
    if (menu) {
      setMenu(false);
    }

    // Cubic easing function
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const duration = 1500; // 1.5 seconds
    const startPosition = window.pageYOffset;
    let targetPosition;

    // Home: scroll to top
    if (targetId === 'home') {
      targetPosition = 0;
    }
    // Contact: scroll to bottom of page
    else if (targetId === 'contact') {
      targetPosition = document.documentElement.scrollHeight - window.innerHeight;
    }
    // Projects/Portfolio and other sections: scroll to element with offset
    else {
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? 100 : 100; // Account for navbar height
      targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
    }

    const distance = targetPosition - startPosition;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }


  return (
    <header className="header">
      <div className={`header-wrapper ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-logo">
          <h1 className="select-none">marv-dev</h1>
        </div>

        <nav>
          <ul className="header-nav-desktop">
            <li className="header-menu-item">
              <a
                href="#home"
                onClick={(e) => isScrolled && handleScrollClick(e, 'home')}
                className={`header-home-link ${isScrolled ? 'active' : 'disabled'}`}
              >
                <IconArrowUp /> Back
              </a>
            </li>
            <li className="header-menu-item">
              <a
                href="#portfolio"
                onClick={(e) => handleScrollClick(e, 'portfolio')}
              >
                Projects
              </a>
            </li>
            {/* <li className="header-menu-item">
              <a
                href="#about"
              >
                About
              </a>
            </li> */}
            <li className="header-menu-item">
              <a
                href="#contact"
                onClick={(e) => handleScrollClick(e, 'contact')}
                className="btn-primary"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className={`hamburger-menu header-hamburger ${isOpen} `} onClick={menuHandler}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`header-nav-mobile ${menuClass}`}>

            <li className="header-mobile-menu-item mobile-menu-item">
              <a
                href="#home"
                onClick={(e) => isScrolled && handleScrollClick(e, 'home')}
                className={`header-home-link ${isScrolled ? 'active' : 'disabled'}`}
              >
                <IconArrowUp /> Back
              </a>
            </li>
            <li className="header-mobile-menu-item">
              <a
                href="#portfolio"
                onClick={(e) => handleScrollClick(e, 'portfolio')}
              >
                Projects
              </a>
            </li>
            {/* <li className="header-mobile-menu-item">
              <a
                href="#about"
                onClick={menuHandler}
              >
                About
              </a>
            </li> */}
            <li className="header-mobile-menu-item">
              <a
                href="#contact"
                onClick={(e) => handleScrollClick(e, 'contact')}
                className="btn-primary"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Header;
