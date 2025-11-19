import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import IconArrowUp from "../icons/IconArrowUp";
import MarqueeText from "./MarqueeText";
import "./Header.css";

function Header({menu, setMenu}) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isWide, setIsWide] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [scrollingDown, setScrollingDown] = React.useState(true);
  const [scrollY, setScrollY] = React.useState(0);
  const [hideHeader, setHideHeader] = React.useState(false);

  const isOpen = menu ? "cross" : "";
  const menuClass = menu ? "left-0 opacity-100" : "-left-full opacity-0"

  const menuHandler = () => {
    setMenu(prev => !prev)
  }

  // Track scroll position, direction, and progress
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);

          // Determine scroll direction with threshold to prevent jitter
          const scrollDifference = currentScrollY - lastScrollY;

          if (Math.abs(scrollDifference) > 5) { // Threshold to prevent jitter
            const isScrollingDown = scrollDifference > 0;
            setScrollingDown(isScrollingDown);
            setLastScrollY(currentScrollY);

            // Control width: expand when scrolling down, shrink when scrolling up
            if (isScrollingDown && currentScrollY >= 20) {
              setIsWide(true);
            } else if (!isScrollingDown) {
              setIsWide(false);
            }

            // Hide header when scrolling down past hero section (100vh)
            const heroHeight = window.innerHeight;
            if (isScrollingDown && currentScrollY > heroHeight) {
              setHideHeader(true);
            } else if (!isScrollingDown) {
              setHideHeader(false);
            }
          }

          // Control background/border: always visible when >= 20px, hidden when < 20px
          if (currentScrollY >= 20) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track mouse position for spotlight effect
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      // For portfolio section, scroll to exact top to show full viewport section
      const offset = targetId === 'portfolio' ? 0 : (isMobile ? 100 : 100);
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


  const navItems = [
    { id: 'home', label: 'Top', icon: <IconArrowUp />, disabled: !isScrolled },
    { id: 'portfolio', label: 'Projects', icon: null, disabled: false },
    { id: 'contact', label: 'Contact', icon: null, disabled: false, primary: true }
  ];

  return (
    <header className={`header ${hideHeader ? 'header-hidden' : ''}`}>
      <div className={`header-wrapper ${isWide ? 'header-wide' : ''} ${isScrolled ? 'header-scrolled' : ''}`}>
        {/* Logo */}
        <motion.div
          className="header-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
            <MarqueeText>Web Developer</MarqueeText>
          </a>
        </motion.div>

        <nav>
          {/* Desktop Dock Navigation */}
          <motion.ul
            className="header-nav-dock"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <li
                key={item.id}
                className={`dock-item ${item.disabled ? 'disabled' : ''} ${item.primary ? 'primary' : ''} ${hoveredItem === index ? 'hovered' : ''}`}
                onMouseEnter={() => !item.disabled && setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => !item.disabled && handleScrollClick(e, item.id)}
                  className={`dock-link ${item.disabled ? 'disabled' : ''}`}
                >
                  {item.icon && <span className="dock-icon">{item.icon}</span>}
                  <span className="dock-label">{item.label}</span>
                </a>
              </li>
            ))}
          </motion.ul>

          {/* Mobile Hamburger */}
          <div className={`hamburger-menu header-hamburger ${isOpen} `} onClick={menuHandler}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Mobile Menu */}
          <ul className={`header-nav-mobile ${menuClass}`}>
            <li className="header-mobile-menu-item mobile-menu-item">
              <a
                href="#home"
                onClick={(e) => isScrolled && handleScrollClick(e, 'home')}
                className={`header-home-link ${isScrolled ? 'active' : 'disabled'}`}
              >
                <IconArrowUp /> Top
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
