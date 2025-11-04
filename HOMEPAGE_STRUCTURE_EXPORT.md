# Technyra Homepage Structure Export

> **Purpose:** Documentation of the Technyra homepage structure for portfolio reuse
> **Created:** 2025-11-04
> **Special Focus:** Navigation & Footer components (marked as !important)

---

## Table of Contents
1. [Page Overview](#page-overview)
2. [Layout Architecture](#layout-architecture)
3. [Component Breakdown](#component-breakdown)
4. [**Navigation Component (!IMPORTANT)**](#navigation-component-important)
5. [**Footer Component (!IMPORTANT)**](#footer-component-important)
6. [Styling & Implementation Details](#styling--implementation-details)

---

## Page Overview

**File:** `app/page.jsx`

The homepage is a single-page application with a vertical scroll layout featuring:
- Fixed navigation at top (all viewports)
- Hero section (full viewport height)
- About section
- Solutions section
- Careers section
- **Fixed Contact section on desktop (contains Footer)**
- All sections use lazy loading for performance optimization

---

## Layout Architecture

### Desktop Layout (≥1024px)
```
┌─────────────────────────────────────┐
│     Navigation (fixed top)          │  ← Glassmorphism overlay
├─────────────────────────────────────┤
│                                     │
│     Hero (scrolls)                  │
│                                     │
├─────────────────────────────────────┤
│     About (scrolls)                 │
├─────────────────────────────────────┤
│     Solutions (scrolls)             │
├─────────────────────────────────────┤
│     Careers (scrolls)               │
├─────────────────────────────────────┤
│     [Spacer div - 100vh]            │  ← Maintains scroll flow
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Contact (fixed position)   │  │  ← Revealed as user scrolls
│  │                              │  │
│  │   - Form + Content           │  │
│  │   - Footer (bottom)          │  │  ← Inside fixed container
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Mobile/Tablet Layout (<1024px)
```
┌─────────────────────────────────────┐
│     Navigation (fixed top)          │
├─────────────────────────────────────┤
│     Hero (scrolls normally)         │
├─────────────────────────────────────┤
│     About (scrolls normally)        │
├─────────────────────────────────────┤
│     Solutions (scrolls normally)    │
├─────────────────────────────────────┤
│     Careers (scrolls normally)      │
├─────────────────────────────────────┤
│     Contact (scrolls normally)      │
│     - Footer at bottom              │
└─────────────────────────────────────┘
```

**Key Layout Feature:**
- Desktop uses a **spacer div** (`<div className="w-full hidden lg:block lg:h-screen">`) before the fixed Contact section to maintain proper scroll flow
- Contact section becomes `position: fixed` only on desktop (≥1024px)
- Footer is nested inside Contact section, positioned at the bottom

---

## Component Breakdown

### 1. Navigation Component
**File:** `components/Navigation.jsx`
**Position:** Fixed at top of viewport (all breakpoints)
**Style:** Glassmorphism with backdrop blur

### 2. Hero Section
**File:** `components/Hero.jsx`
**Load:** Eager (above the fold)
**Key Feature:** Full viewport height with video background

### 3. About Section
**File:** `components/About.jsx`
**Load:** Lazy (dynamic import)
**Layout:** Two-column on desktop, stacked on mobile

### 4. Solutions Section
**File:** `components/Solutions.jsx`
**Load:** Lazy (dynamic import)
**Layout:** Card grid with background image

### 5. Careers Section
**File:** `components/Careers.jsx`
**Load:** Lazy (dynamic import)
**Layout:** White background with dark callout box

### 6. Contact Section (Fixed Container)
**File:** `components/Contact.jsx`
**Load:** Lazy (dynamic import)
**Position:**
- Mobile/Tablet: `relative` (normal scroll)
- Desktop (≥1024px): `fixed` with `top: 0, left: 0, right: 0, height: 100%`

**Contents:**
- Background image overlay
- Contact form + copy (two-column layout)
- **Footer component (at bottom)**

---

## Navigation Component (!IMPORTANT)

### Overview
**File:** `components/Navigation.jsx`
**CSS File:** `components/Navigation.css`
**Position:** Fixed at top of viewport (all breakpoints)
**Z-Index:** 50 (highest layer)
**Style:** Glassmorphism with backdrop blur, animated width on scroll

### Key Features
1. **Fixed positioning** - Always visible at top
2. **Scroll-based width animation** - Navbar shrinks on desktop as you scroll
3. **Active section tracking** - Links highlight based on scroll position
4. **Smooth scroll animation** - Custom easing function for anchor navigation
5. **Conditional rendering** - Hides center links on legal pages and mobile
6. **Glassmorphism styling** - Backdrop blur with semi-transparent background

### Component Structure

```jsx
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './Navigation.css';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  // Check if we're on a legal page
  const isLegalPage = ['/privacy', '/terms', '/cookies'].includes(pathname);

  // [JavaScript logic continues below...]
}
```

### Layout Breakdown

```
Desktop Layout (≥1024px):
┌────────────────────────────────────────────────────────────┐
│  [Logo]        [About] [Solutions] [Careers]    [Contact]  │
│   (left)          (absolute center)              (right)   │
└────────────────────────────────────────────────────────────┘
        ↑ Glassmorphism background with backdrop blur
        ↑ Width shrinks from 100% to 1040px as you scroll

Mobile Layout (<1024px):
┌─────────────────────────────────────┐
│  [Logo]                  [Contact]  │
│   (left)                   (right)  │
└─────────────────────────────────────┘
        ↑ Center links hidden
        ↑ Full width (no shrink animation)
```

### JavaScript Logic Breakdown

#### 1. Scroll-Based Width Animation

```jsx
useEffect(() => {
  const handleNavResize = () => {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / 100, 1); // 0 to 1 between scroll 0-100px
    document.documentElement.style.setProperty('--nav-scroll-progress', progress);
  };

  window.addEventListener('scroll', handleNavResize);
  handleNavResize(); // Set initial value

  return () => window.removeEventListener('scroll', handleNavResize);
}, []);
```

**How it works:**
- Creates a CSS custom property `--nav-scroll-progress` (0 to 1)
- At scroll position 0px: `progress = 0` (navbar is full width)
- At scroll position 100px+: `progress = 1` (navbar is 1040px)
- CSS uses this variable to animate max-width smoothly

**CSS Implementation:**
```css
.nav-bar {
  max-width: calc(100% - (100% - 1040px) * var(--nav-scroll-progress, 1));
  transition: max-width 0.3s ease-out;
}
```

**Math breakdown:**
- When `progress = 0`: `100% - (100% - 1040px) * 0` = **100%** (full width)
- When `progress = 1`: `100% - (100% - 1040px) * 1` = **1040px** (shrunken)

#### 2. Active Section Tracking

```jsx
useEffect(() => {
  const handleScroll = () => {
    const sections = ['about', 'solutions', 'careers'];
    const scrollPosition = window.scrollY + 200; // Offset for navbar height

    // If at top (hero section), no section is active
    if (window.scrollY < 100) {
      setActiveSection('');
      return;
    }

    // Check which section is currently in view
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial position

  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**How it works:**
- Listens to scroll events continuously
- Adds 200px offset to account for fixed navbar height
- Loops through section IDs and checks which one is currently visible
- Updates `activeSection` state to highlight corresponding nav link
- Resets to empty string when at top (hero section)

#### 3. Smooth Scroll Animation (Custom Easing)

```jsx
const handleScrollClick = (e, targetId) => {
  setActiveSection(targetId);
  e.preventDefault();

  // Special handling for Contact section (fixed on desktop)
  if (targetId === 'contact') {
    const startPosition = window.pageYOffset;
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 seconds
    let start = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

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
    return;
  }

  // Regular scroll logic for other sections (about, solutions, careers)
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? 300 : 120; // Account for navbar + spacing

    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

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
};
```

**How it works:**
- Prevents default anchor jump behavior (`e.preventDefault()`)
- Uses `requestAnimationFrame` for smooth 60fps animation
- Applies **cubic easing function** for natural motion
- Duration: 1500ms (1.5 seconds)
- Different logic for Contact vs other sections (Contact is fixed on desktop)
- Responsive offset: 300px mobile, 120px desktop

**Easing Function Math:**
- `easeInOutCubic(t)` creates smooth acceleration/deceleration
- First half (t < 0.5): Accelerates (cubic growth)
- Second half (t ≥ 0.5): Decelerates (cubic decay)
- Result: Smooth, natural-feeling scroll animation

### Full JSX Structure

```jsx
return (
  <div className="nav-container">
    <nav className="nav-bar">
      {/* Logo */}
      <Link href="/" className="nav-logo" aria-label="Link to homepage">
        <Image
          src="/icons/logo-icon.svg"
          alt="Technyra"
          width={48}
          height={48}
        />
        <Image
          src="/icons/logo-text.svg"
          alt="Technyra"
          width={91}
          height={21}
        />
      </Link>

      {/* Centered Links - Hidden on mobile and legal pages */}
      {!isLegalPage && (
        <div className="nav-links">
          <a
            href="#about"
            className={activeSection === 'about' ? 'nav-link' : 'nav-link-inactive'}
            onClick={(e) => handleScrollClick(e, 'about')}
            aria-label="Link to About section"
          >
            About
          </a>
          <a
            href="#solutions"
            className={activeSection === 'solutions' ? 'nav-link' : 'nav-link-inactive'}
            onClick={(e) => handleScrollClick(e, 'solutions')}
            aria-label="Link to Solutions section"
          >
            Solutions
          </a>
          <a
            href="#careers"
            className={activeSection === 'careers' ? 'nav-link' : 'nav-link-inactive'}
            onClick={(e) => handleScrollClick(e, 'careers')}
            aria-label="Link to Careers section"
          >
            Careers
          </a>
        </div>
      )}

      {/* Contact Button */}
      <a
        href="#contact"
        className="btn-primary nav-button"
        onClick={(e) => handleScrollClick(e, 'contact')}
        aria-label="Link to Contact section"
      >
        Contact us
      </a>
    </nav>
  </div>
);
```

### CSS Classes Breakdown

#### Container (Fixed Wrapper)

```css
.nav-container {
  /* Fixed positioning */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;

  /* Padding */
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;

  /* Desktop padding */
  @media (min-width: 768px) {
    padding-top: 30px;
    padding-left: 200px;
    padding-right: 200px;
  }
}
```

#### Navbar (Glassmorphism Bar)

```css
.nav-bar {
  /* Glassmorphism effect */
  backdrop-filter: blur(12.5px);
  background: rgba(9, 20, 31, 0.5) / 50%; /* Black 40% at 50% opacity */
  border: 1px solid rgba(255, 255, 255, 0.2); /* White 20% */
  border-radius: 17px;

  /* Spacing */
  padding: 10px;
  width: 100%;
  margin: 0 auto;

  /* Layout */
  display: flex;
  align-items: center;
  position: relative;

  /* Animated width (desktop only) */
  max-width: calc(100% - (100% - 1040px) * var(--nav-scroll-progress, 1));
  transition: max-width 0.3s ease-out;

  /* Gold glow shadow */
  box-shadow:
    0 0 4px rgba(144, 126, 80, 0.08),  /* Gold 8% */
    0 0 6px rgba(144, 126, 80, 0.05),  /* Gold 5% */
    0 0 8px rgba(144, 126, 80, 0.03);  /* Gold 3% */
}

/* Mobile: No width animation */
@media (max-width: 768px) {
  .nav-bar {
    max-width: 100%;
  }
}
```

**Key Styles:**
- `backdrop-filter: blur(12.5px)` - Creates glassmorphism effect
- `border-radius: 17px` - Rounded corners
- `box-shadow` - Subtle gold glow (brand color: #907E50)

#### Logo

```css
.nav-logo {
  /* Layout */
  display: flex;
  align-items: center;
  gap: 13px;

  /* Positioning */
  margin-right: auto; /* Pushes to left */

  /* Transition */
  transition: all 0.3s;
}

/* Hover: Gold filter */
.nav-logo:hover {
  filter: brightness(0) saturate(100%) invert(57%) sepia(18%) saturate(644%)
          hue-rotate(7deg) brightness(92%) contrast(88%);
  /* This complex filter converts white logo to gold (#907E50) */
}
```

#### Center Links

```css
.nav-links {
  /* Hidden on mobile */
  display: none;

  /* Desktop: Absolute center positioning */
  @media (min-width: 1024px) {
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); /* Perfect centering */
    align-items: center;
    gap: 50px;
  }
}
```

**Why absolute positioning?**
- Logo uses `margin-right: auto` (left alignment)
- Button uses `margin-left: auto` (right alignment)
- Center links need `position: absolute` to avoid being pushed by flexbox
- `left: 50%` + `transform: translateX(-50%)` achieves perfect centering

#### Link Styles (Active vs Inactive)

```css
/* Active link (current section) */
.nav-link {
  font-family: Inter;
  font-weight: 500; /* Medium */
  font-size: 18px; /* Body M */
  color: #FFFFFF; /* Full opacity white */
  padding: 5px 0;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 100%; /* Already full opacity, no change */
}

/* Inactive link (other sections) */
.nav-link-inactive {
  font-family: Inter;
  font-weight: 500; /* Medium */
  font-size: 18px; /* Body M */
  color: rgba(255, 255, 255, 0.5); /* 50% opacity white */
  padding: 5px 0;
  transition: all 0.3s;
}

.nav-link-inactive:hover {
  color: #FFFFFF; /* Full opacity on hover */
}
```

**State Management:**
- Default: All links are inactive (50% opacity)
- On scroll: Current section's link becomes active (100% opacity)
- On hover: Inactive links temporarily show 100% opacity
- Smooth transitions between states

#### Contact Button

```css
.nav-button {
  margin-left: auto; /* Pushes to right */
}
```

**Button styles inherited from global `.btn-primary` class:**
- White background
- Black text
- 8px border-radius
- 20px horizontal / 16px vertical padding
- Inter Medium 16px font

### Assets Required
- `/public/icons/logo-icon.svg` (48px × 48px)
- `/public/icons/logo-text.svg` (91px × 21px)

### Color Palette Used
- **Background:** `rgba(9, 20, 31, 0.5)` - Black 40% at 50% opacity
- **Border:** `rgba(255, 255, 255, 0.2)` - White 20%
- **Active link:** `#FFFFFF` - White 100%
- **Inactive link:** `rgba(255, 255, 255, 0.5)` - White 50%
- **Gold glow (shadow):** `rgba(144, 126, 80, 0.08/0.05/0.03)` - Gold accents
- **Logo hover:** Gold filter (#907E50)

### Typography
- **Font Family:** Inter
- **Font Weight:** 500 (Medium)
- **Font Size:** 18px (Body M)
- **Line Height:** 100%

### Responsive Behavior

| Breakpoint | Layout | Padding | Logo | Center Links | Button | Width Animation |
|------------|--------|---------|------|--------------|--------|-----------------|
| Mobile (<768px) | Logo + Button only | 20px | Left | Hidden | Right | None (100%) |
| Tablet (768-1024px) | Logo + Button only | 200px | Left | Hidden | Right | Shrinks 100%→1040px |
| Desktop (≥1024px) | Logo + Links + Button | 200px | Left | Centered | Right | Shrinks 100%→1040px |

### Integration with Page Layout

**Navigation sits above all content:**
```jsx
// app/layout.jsx or app/page.jsx
<body>
  <Navigation />  {/* Fixed at top, z-index: 50 */}
  <main>
    {/* All page content scrolls beneath navbar */}
  </main>
</body>
```

**Scroll offsets account for navbar height:**
- Mobile sections use `scroll-margin-top: 300px`
- Desktop sections use `scroll-margin-top: 120px`
- This ensures content isn't hidden behind navbar when scrolling to anchors

### Key Implementation Notes

1. **Client Component:**
   - Must use `'use client'` directive (uses React hooks)
   - Uses `useState` for active section tracking
   - Uses `useEffect` for scroll listeners
   - Uses `usePathname` from Next.js for route detection

2. **Performance Optimizations:**
   - Cleanup functions remove event listeners on unmount
   - `requestAnimationFrame` for smooth 60fps scrolling
   - CSS transitions handled by GPU (transform, opacity)

3. **Accessibility:**
   - All links have `aria-label` attributes
   - Semantic `<nav>` element used
   - Keyboard navigation supported (native anchor links)
   - Focus states inherited from Tailwind defaults

4. **Conditional Rendering:**
   - Center links hidden on mobile (≤1024px)
   - Center links hidden on legal pages (/privacy, /terms, /cookies)
   - Only logo + Contact button remain on those views

5. **Glassmorphism Effect:**
   - Requires `backdrop-filter: blur()` CSS property
   - Semi-transparent background allows content to show through
   - Subtle border and shadow enhance depth perception

### Animation Timeline

**Scroll from 0px → 100px:**
```
Scroll 0px:   Navbar width = 100%
Scroll 50px:  Navbar width = ~70% (interpolated)
Scroll 100px: Navbar width = 1040px (final)
```

**Smooth scroll on link click:**
```
Click event → Prevent default → Calculate distance
     ↓
Start animation (1500ms duration)
     ↓
Frame 1: Progress = 0, Ease = 0 (start position)
Frame 30: Progress = 0.5, Ease = 0.5 (accelerating)
Frame 60: Progress = 1, Ease = 1 (end position, decelerating)
     ↓
Animation complete → Active state updated
```

---

## Footer Component (!IMPORTANT)

### Overview
**File:** `components/Footer.jsx`
**CSS File:** `components/Footer.css`
**Parent Container:** Contact section
**Position Context:**
- On desktop: Inside fixed Contact section, positioned at bottom
- On mobile: Normal flow at bottom of Contact section

### Component Structure

```jsx
<footer className="footer-container">
  {/* Logo */}
  <div className="footer-logo">
    <Image src="/icons/logo-icon-large.svg" width={59} height={59} />
    <Image src="/icons/logo-text-large.svg" width={112} height={26} />
  </div>

  {/* Nav Links + Copyright */}
  <div className="footer-nav">
    {/* Links */}
    <div className="footer-links">
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/terms">Terms and Conditions</Link>
      <Link href="/cookies">Cookie Notice</Link>
    </div>

    {/* Copyright */}
    <div className="footer-copyright">
      <p className="footer-copyright-text">© Technyra 2025</p>
    </div>
  </div>
</footer>
```

### Layout Breakdown

```
Desktop Layout (≥768px):
┌───────────────────────────────────────────────────────────┐
│  [Logo Icon + Logo Text]         [Privacy | Terms | Cookies]  │
│                                            © Technyra 2025 │
└───────────────────────────────────────────────────────────┘
     (flex-row, space-between)

Mobile Layout (<768px):
┌─────────────────────┐
│   [Logo Icon]       │
│   [Logo Text]       │
│                     │
│   [Privacy]         │
│   [Terms]           │
│   [Cookies]         │
│                     │
│   © Technyra 2025   │
└─────────────────────┘
  (flex-col, centered)
```

### Footer CSS Classes

**Main Container:**
```css
.footer-container {
  /* Spacing */
  width: 100%;
  max-width: 1440px;
  padding: 30px 20px;           /* Mobile */

  /* Desktop padding */
  @media (min-width: 768px) {
    padding: 30px 200px;
  }

  /* Layout */
  display: flex;
  flex-direction: column;        /* Mobile: stack vertically */
  align-items: center;
  gap: 25px;

  /* Desktop layout */
  @media (min-width: 768px) {
    flex-direction: row;         /* Desktop: horizontal */
    align-items: end;
    justify-content: space-between;
    gap: 0;
  }

  /* Z-index */
  z-index: 0;
}
```

**Logo Container:**
```css
.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
}
```

**Navigation Container:**
```css
.footer-nav {
  display: flex;
  flex-direction: column;
  align-items: center;           /* Mobile: centered */
  gap: 25px;

  /* Desktop alignment */
  @media (min-width: 768px) {
    align-items: end;            /* Desktop: right-aligned */
    gap: 15px;
  }
}
```

**Links Container:**
```css
.footer-links {
  display: flex;
  flex-direction: column;        /* Mobile: stacked */
  align-items: center;
  gap: 25px;

  /* Desktop layout */
  @media (min-width: 768px) {
    flex-direction: row;         /* Desktop: horizontal */
    gap: 50px;
  }
}
```

**Individual Links:**
```css
.footer-link {
  font-family: Inter;
  font-weight: 500;              /* Medium */
  font-size: 18px;               /* Body M */
  color: rgba(255,255,255,0.5);  /* 50% opacity white */
  padding: 5px 0;

  /* Hover state */
  &:hover {
    color: rgb(255,255,255);     /* Full opacity white */
    transition: colors;
  }
}
```

**Copyright:**
```css
.footer-copyright {
  display: flex;
  align-items: center;
  gap: 50px;
}

.footer-copyright-text {
  font-family: Inter;
  font-weight: 500;              /* Medium */
  font-size: 18px;               /* Body M */
  color: rgba(255,255,255,0.5);  /* 50% opacity white */
}
```

### Assets Required
- `/public/icons/logo-icon-large.svg` (59px × 59px)
- `/public/icons/logo-text-large.svg` (112px × 26px)

### Color Palette Used
- **White (full opacity):** `#FFFFFF` or `rgb(255,255,255)` - hover states
- **White (50% opacity):** `rgba(255,255,255,0.5)` - default link/copyright text
- **Background:** Inherited from parent (Contact section has gradient background)

### Typography
- **Font Family:** Inter
- **Font Weight:** 500 (Medium)
- **Font Size:** 18px (Body M)
- **Line Height:** 100%

### Responsive Behavior

| Breakpoint | Layout | Padding | Logo | Links | Copyright |
|------------|--------|---------|------|-------|-----------|
| Mobile (<768px) | Column, centered | 30px 20px | Stacked vertical | Stacked vertical, 25px gap | Below links |
| Desktop (≥768px) | Row, space-between | 30px 200px | Left-aligned | Horizontal, 50px gap | Below links, right-aligned |

### Key Implementation Notes

1. **Max-Width Pattern:**
   - Footer uses `max-w-[1440px]` to maintain consistent width with rest of site
   - Content centers within viewport on wide screens

2. **Parent Context:**
   - Footer lives inside Contact section (`components/Contact.jsx`)
   - Contact section is fixed on desktop, so footer is also visually fixed
   - On mobile, Contact is relative positioned, so footer scrolls normally

3. **Accessibility:**
   - All links have `aria-label` attributes for screen readers
   - Semantic `<footer>` element used
   - Proper link structure with Next.js `<Link>` component

4. **Styling Approach:**
   - Uses Tailwind's `@layer components` directive
   - Separate CSS file for maintainability
   - All styles use Tailwind's `@apply` directive

---

## Styling & Implementation Details

### Page Component (app/page.jsx)

```jsx
export default function Home() {
  return (
    <main className="bg-tech-black w-full">
      <Hero />
      <About />
      <Solutions />
      <Careers />

      {/* Spacer for desktop fixed Contact section */}
      <div
        className="w-full hidden lg:block lg:h-screen"
        aria-hidden="true"
      ></div>

      <Contact />  {/* Contains Footer */}
    </main>
  );
}
```

**Key CSS Classes:**
- `bg-tech-black` - Custom black background color
- `hidden lg:block` - Hides spacer on mobile/tablet, shows on desktop
- `lg:h-screen` - Full viewport height spacer on desktop

### Contact Section Positioning (components/Contact.css)

```css
.contact-section {
  /* Mobile/Tablet: Normal scroll */
  position: relative;
  width: 100%;
  padding-top: 100px;
  z-index: 0;
}

@media (min-width: 1024px) {
  .contact-section {
    /* Desktop: Fixed positioning */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    padding-top: 200px;
  }
}
```

### Contact Wrapper (contains Footer at bottom)

```css
.contact-wrapper {
  position: relative;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;  /* Footer pushed to bottom */
}

@media (min-width: 1024px) {
  .contact-wrapper {
    height: 100%;  /* Full height of fixed container */
  }
}
```

**This is what positions the Footer at the bottom!**

---

## Usage Guide for Portfolio Reuse

### Option 1: Reuse Entire Fixed Footer Pattern

If you want the same "fixed footer revealed on scroll" effect:

1. **Copy Footer component:**
   - `components/Footer.jsx`
   - `components/Footer.css`
   - Update logo assets and links to your own

2. **Create Contact-like container:**
   - Wrap Footer in a section with fixed positioning on desktop
   - Use `justify-between` to push Footer to bottom
   - Add spacer div before this section (like in `page.jsx`)

3. **CSS requirements:**
   ```css
   .your-footer-container {
     position: relative;           /* Mobile */
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
   }

   @media (min-width: 1024px) {
     .your-footer-container {
       position: fixed;            /* Desktop */
       top: 0;
       left: 0;
       right: 0;
       height: 100%;
     }
   }
   ```

### Option 2: Reuse Footer as Standard Sticky Footer

If you just want a normal footer at page bottom:

1. **Copy Footer component:**
   - `components/Footer.jsx`
   - `components/Footer.css`

2. **Place at bottom of your page layout:**
   ```jsx
   <main>
     <YourContent />
     <Footer />
   </main>
   ```

3. **Remove fixed positioning:**
   - Footer will naturally sit at bottom of content flow
   - No spacer div needed

### Option 3: Extract Just Footer Styles

If you want to recreate the footer from scratch:

1. **CSS structure to copy:**
   - Two-section horizontal layout (logo left, links right)
   - Responsive flex-direction change (column → row)
   - Gap patterns (25px mobile, 50px desktop for links)
   - Padding pattern (20px mobile, 200px desktop)
   - Max-width 1440px centering

2. **Key Tailwind classes:**
   - `max-w-[1440px]` - Content width constraint
   - `justify-between` - Space between logo and nav
   - `items-end` - Align items to baseline
   - `md:flex-row` - Responsive direction change

---

## Breakpoints Reference

| Name | Min-width | Usage |
|------|-----------|-------|
| Mobile | 0px | Default styles |
| Tablet/Desktop | 768px | `md:` prefix in Tailwind |
| Desktop | 1024px | `lg:` prefix in Tailwind |

**Tailwind Config:**
```javascript
theme: {
  screens: {
    'md': '768px',
    'lg': '1024px',
  }
}
```

---

## Dependencies

- **Next.js 15** - App Router, Image component, Link component
- **React 19**
- **Tailwind CSS** - All styling
- **Inter Font** - Google Fonts via next/font

---

## File Reference

| File | Purpose | Lines |
|------|---------|-------|
| `app/page.jsx` | Main homepage layout | 37 |
| `components/Navigation.jsx` | Navigation component with scroll logic | 187 |
| `components/Navigation.css` | Navigation styles (Tailwind @layer) | 46 |
| `components/Footer.jsx` | Footer component | 49 |
| `components/Footer.css` | Footer styles (Tailwind @layer) | 30 |
| `components/Contact.jsx` | Contact section (contains Footer) | 43 |
| `components/Contact.css` | Contact section styles | 47 |

---

## Quick Copy Checklist

For portfolio reuse:

**Navigation Component:**
- [ ] Copy `components/Navigation.jsx`
- [ ] Copy `components/Navigation.css`
- [ ] Replace logo assets in `/public/icons/` (logo-icon.svg, logo-text.svg)
- [ ] Update section IDs in scroll logic (about, solutions, careers → your sections)
- [ ] Update center links JSX (replace with your page sections)
- [ ] Adjust scroll offsets for your layout (currently 300px mobile, 120px desktop)
- [ ] Customize navbar width animation (currently shrinks to 1040px)
- [ ] Test scroll tracking and active state highlighting
- [ ] Verify smooth scroll animation on all links

**Footer Component:**
- [ ] Copy `components/Footer.jsx`
- [ ] Copy `components/Footer.css`
- [ ] Replace footer logo assets in `/public/icons/` (logo-icon-large.svg, logo-text-large.svg)
- [ ] Update links in Footer.jsx (privacy, terms, cookies → your links)
- [ ] Update copyright text
- [ ] Decide: Fixed footer pattern OR standard footer?
- [ ] If fixed: Copy Contact.jsx structure and spacer div pattern
- [ ] If standard: Just place Footer at end of page

**Integration Testing:**
- [ ] Test responsive behavior at 768px and 1024px breakpoints
- [ ] Verify hover states on all links (navigation + footer)
- [ ] Test glassmorphism effect (backdrop blur support)
- [ ] Verify z-index layering (navbar over content)
- [ ] Test smooth scroll with keyboard navigation
- [ ] Check accessibility (aria-labels, semantic HTML)

---

**End of Documentation**
