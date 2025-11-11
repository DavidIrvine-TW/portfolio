# Horizontal Scroll Cards Animation Documentation

This document explains the horizontal scroll-based card animations implemented in the CaseStudiesMainPageHorizontalCardsLargeScreen component.

## Overview

This component creates a horizontal scrolling section where:
- Vertical scroll drives horizontal card movement
- Cards scale and blur based on hover state
- Content reveals on hover with staggered animations
- Sticky positioning creates a pinned viewport effect
- Border radius animates based on scroll progress

## Dependencies

```javascript
import { motion, useTransform, useScroll } from 'framer-motion'
```

## Architecture

The system consists of three main components:
1. **CaseStudiesMainPageHorizontalCardsLargeScreen** - Container with scroll logic
2. **CaseStudyCard** - Individual card with hover animations
3. **FirstCaseStudyCard** - Spacer card with opacity animation

## 1. Horizontal Scroll Container

### Scroll Progress Tracking

```javascript
const targetRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ['start start', 'end end'],
});
```

**How it works:**
- `target`: References the section to track
- `offset`: Defines when tracking starts and ends
  - `'start start'`: When section top hits viewport top
  - `'end end'`: When section bottom hits viewport bottom
- `scrollYProgress`: Returns value 0-1 representing scroll progress

### Dynamic Max Scroll Calculation

```javascript
function useMaxScroll(scrollContainerRef) {
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollLimit = useCallback(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScroll(containerWidth - viewportWidth);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    updateScrollLimit();
    window.addEventListener('resize', updateScrollLimit);
    return () => window.removeEventListener('resize', updateScrollLimit);
  }, [updateScrollLimit]);

  return maxScroll;
}
```

**Purpose:**
- Calculates how far content needs to scroll horizontally
- Updates on window resize for responsive behavior
- Ensures all cards are viewable regardless of screen size

### Scroll-to-Horizontal Transform

```javascript
const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
const borderRadius = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 25]);
```

**Transform mappings:**
- `x`: Maps scroll progress (0-1) to horizontal movement (0 to -maxScroll)
- `borderRadius`: Creates rounded corners at the end of scroll (80-100% progress)

### Container Structure

```javascript
<section ref={targetRef} className="relative h-[350vh] bg-drkBlue">
  <motion.div
    className="sticky top-0 left-0 flex h-screen overflow-hidden bg-offWhite"
    style={{
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    }}
  >
    <motion.div ref={scrollContainerRef} style={{ x }} className="flex">
      {/* Cards */}
    </motion.div>
  </motion.div>
</section>
```

**Key elements:**
- `h-[350vh]`: Makes section 3.5x viewport height to create scroll space
- `sticky top-0`: Pins the viewport while content scrolls
- `style={{ x }}`: Applies horizontal transform based on scroll

## 2. Case Study Card Component

### Hover State Management

```javascript
const [hoveredIndex, setHoveredIndex] = useState(null);

// In parent, pass to cards:
<CaseStudyCard
  index={index}
  hoveredIndex={hoveredIndex}
  setHoveredIndex={setHoveredIndex}
/>

// In card:
const isHovered = hoveredIndex === index;
const isAnyHovered = hoveredIndex !== null;
```

This allows cards to know:
- If they are hovered
- If any card is hovered (for dimming effects)

### Animation Variants

#### Card Scaling and Blur

```javascript
const cardVariants = {
  animate: (custom) => ({
    scale: custom.isAnyHovered ? (custom.isHovered ? 1.05 : 0.9) : 1,
    filter: custom.isAnyHovered ? (custom.isHovered ? 'blur(0px)' : 'blur(2px)') : 'blur(0px)',
  }),
};
```

**Behavior:**
- Default: scale 1, no blur
- When any card hovered:
  - Hovered card: scale 1.05, no blur
  - Other cards: scale 0.9, blur 2px
- Creates focus effect highlighting the hovered card

#### Overlay Opacity

```javascript
const overlayVariants = {
  animate: (custom) => {
    if (!custom.isDesktop) return { opacity: 0.85 };
    return custom.isAnyHovered
      ? custom.isHovered
        ? { opacity: 0.85 }
        : { opacity: 0.8 }
      : { opacity: 0.6 };
  },
};
```

**Purpose:**
- Dark overlay on background image
- Reduces opacity on hover to show more of the image
- Mobile always shows content (opacity 0.85)

#### Title Animation

```javascript
const titleVariants = {
  animate: (custom) => ({
    y: custom.isDesktop ? (custom.isHovered ? 0 : 10) : 0,
    opacity: custom.isDesktop ? (custom.isHovered ? 1 : 0.9) : 1,
  }),
};
```

**Effect:**
- Desktop: Slight upward movement on hover (from y:10 to y:0)
- Opacity increases from 0.9 to 1
- Mobile: Always visible

#### Body Text Container

```javascript
const bodyContainerVariants = {
  animate: (custom) => ({
    height: custom.isDesktop ? (custom.isHovered ? '8rem' : 0) : '8rem',
    marginBottom: custom.isDesktop ? (custom.isHovered ? '1.5rem' : 0) : '1.5rem',
    opacity: custom.isDesktop ? (custom.isHovered ? 1 : 0) : 1,
    filter: custom.isHovered ? ['blur(4px)', 'blur(0px)'] : 'blur(0px)',
  }),
};
```

**Behavior:**
- Desktop: Expands from height 0 to 8rem on hover
- Blur-in effect creates smooth text appearance
- Mobile: Always visible at 8rem height

#### Body Text

```javascript
const bodyTextVariants = {
  initial: (custom) => (custom.isDesktop ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }),
  animate: (custom) => ({
    opacity: custom.isDesktop ? (custom.isHovered ? 1 : 0) : 1,
    y: custom.isDesktop ? (custom.isHovered ? 0 : 20) : 0,
    filter: custom.isHovered ? ['blur(4px)', 'blur(0px)'] : 'blur(0px)',
  }),
};
```

**Effect:**
- Starts below (y:20) and invisible
- Slides up and fades in on hover
- Blur-in adds professional touch

#### Button Container & Button

```javascript
const buttonContainerVariants = {
  animate: (custom) => ({
    height: custom.isDesktop ? (custom.isHovered ? '3rem' : 0) : '3rem',
    opacity: custom.isDesktop ? (custom.isHovered ? 1 : 0) : 1,
  }),
};

const buttonVariants = {
  initial: (custom) => (custom.isDesktop ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }),
  animate: (custom) => ({
    opacity: custom.isDesktop ? (custom.isHovered ? 1 : 0) : 1,
    y: custom.isDesktop ? (custom.isHovered ? 0 : 20) : 0,
    filter: custom.isHovered ? ['blur(4px)', 'blur(0px)'] : 'blur(0px)',
  }),
};

const buttonAnim = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};
```

**Interaction:**
- Button reveals last in sequence
- Additional hover/tap animations on the button itself
- Creates layered interaction feel

### Staggered Timing

```javascript
const getDelay = useCallback((enter, exit) => (isHovered ? enter : exit), [isHovered]);

const customTransition = useMemo(
  () => ({
    duration: 0.6,
    ease: [0.25, 1.5, 0.5, 1],
    delay: getDelay(0, 0.15),
  }),
  [baseTransition, getDelay]
);

// Applied to different elements:
transition={{ delay: getDelay(0.1, 0.4) }} // Title
transition={{ delay: getDelay(0.2, 0.3) }} // Body container
transition={{ delay: getDelay(0.3, 0.2) }} // Body text
transition={{ delay: getDelay(0.4, 0.3) }} // Button container
transition={{ delay: getDelay(0.5, 0.2) }} // Button
```

**Strategy:**
- Enter delays increase (0.1s → 0.5s) for cascade effect
- Exit delays vary to create natural reverse animation
- Each element animates in sequence on hover
- Exits happen in different order for variety

## 3. First Card (Spacer)

```javascript
const emptyCardOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0, 1]);

<motion.div style={{ opacity: emptyCardOpacity }}>
  <p>Trusted by the best</p>
  <p>Offering creative support...</p>
</motion.div>
```

**Purpose:**
- Creates spacing at start and end of horizontal scroll
- Fades out (0-25% scroll), fades back in (25-50% scroll)
- Provides context/branding before case studies appear

## Implementation Guide

### 1. Basic Horizontal Scroll Setup

```javascript
const targetRef = useRef(null);
const scrollContainerRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ['start start', 'end end'],
});

const maxScroll = /* calculate based on content width */;
const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

return (
  <section ref={targetRef} className="h-[300vh]">
    <div className="sticky top-0 h-screen">
      <motion.div ref={scrollContainerRef} style={{ x }} className="flex">
        {/* Your cards */}
      </motion.div>
    </div>
  </section>
);
```

### 2. Card Hover Animation Setup

```javascript
const [hoveredIndex, setHoveredIndex] = useState(null);

const cardVariants = {
  animate: (custom) => ({
    scale: custom.isHovered ? 1.05 : custom.isAnyHovered ? 0.9 : 1,
    filter: custom.isHovered ? 'blur(0px)' : custom.isAnyHovered ? 'blur(2px)' : 'blur(0px)',
  }),
};

<motion.div
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  custom={{ isHovered, isAnyHovered }}
  variants={cardVariants}
  animate="animate"
/>
```

### 3. Content Reveal Animation

```javascript
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (isHovered) => ({
    opacity: isHovered ? 1 : 0,
    y: isHovered ? 0 : 20,
    filter: isHovered ? ['blur(4px)', 'blur(0px)'] : 'blur(0px)',
  }),
};

<motion.div
  variants={contentVariants}
  initial="initial"
  animate="animate"
  custom={isHovered}
  transition={{ delay: 0.2 }}
/>
```

## Customization Options

### Scroll Distance
Adjust section height for more/less scroll:
```javascript
<section className="h-[350vh]"> {/* Change vh value */}
```

### Card Size
Modify card dimensions:
```javascript
className="w-[90vw] md:w-[30vw] max-h-[70vh]"
```

### Hover Effects
Tune scale and blur amounts:
```javascript
scale: custom.isHovered ? 1.05 : 0.9 // Adjust values
filter: custom.isHovered ? 'blur(0px)' : 'blur(2px)' // Adjust blur
```

### Animation Timing
Modify delays and duration:
```javascript
const customTransition = {
  duration: 0.6, // Adjust speed
  ease: [0.25, 1.5, 0.5, 1], // Adjust easing curve
  delay: /* your delay */
};
```

## Responsive Behavior

### Desktop Detection Hook

```javascript
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return isDesktop;
}
```

**Usage:**
- Mobile (< 768px): All content visible, no hover animations
- Desktop (≥ 768px): Content hidden by default, reveals on hover

## Performance Optimizations

1. **useCallback for functions**: Prevents recreation on every render
```javascript
const getDelay = useCallback((enter, exit) => (isHovered ? enter : exit), [isHovered]);
```

2. **useMemo for static objects**: Caches transition objects
```javascript
const customTransition = useMemo(() => ({ duration: 0.6, ease: [...] }), []);
```

3. **GPU-accelerated properties**: Uses transform and opacity for animations
```javascript
// Good (GPU accelerated)
{ x: -100, opacity: 0 }

// Avoid (causes reflow)
{ left: -100, display: 'none' }
```

4. **Lazy loading for images/videos**:
```javascript
function useLazyLoadVideo(videoRef, threshold = 0.25) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    // ...
  }, []);

  return shouldLoad;
}
```

## File References

Main component: `src/components/SEWebV3/CaseStudies/CaseStudiesMainPageHorizontalCards/CaseStudiesMainPageHorizontalCardsLargeScreen.jsx`
Card component: `src/components/SEWebV3/CaseStudies/CaseStudiesMainPageHorizontalCards/CaseStudyCard.jsx`
Spacer component: `src/components/SEWebV3/CaseStudies/CaseStudiesMainPageHorizontalCards/FirstCaseStudyCard.jsx`
Global styles: `src/components/SEWebV3/CaseStudies/Global_caseStudies.css`

## Browser Compatibility

- Framer Motion: Modern browsers (Chrome, Firefox, Safari, Edge)
- Intersection Observer: All modern browsers (polyfill for IE11)
- CSS transforms: All modern browsers
- Backdrop blur: May need prefixes for older Safari versions

## Accessibility Considerations

1. **Keyboard navigation**: Cards should be focusable
2. **Reduced motion**: Respect prefers-reduced-motion media query
3. **Screen readers**: Ensure content is accessible when not visible
4. **Focus indicators**: Maintain visible focus states

## Common Issues & Solutions

### Cards scroll too fast/slow
Adjust the section height:
```javascript
<section className="h-[350vh]"> {/* Increase for slower, decrease for faster */}
```

### Content doesn't fully scroll
Check maxScroll calculation includes all cards and padding:
```javascript
const maxScroll = containerWidth - viewportWidth; // Ensure containerWidth is correct
```

### Animations feel sluggish
Reduce transition duration or adjust easing:
```javascript
duration: 0.4, // Faster
ease: [0.25, 1, 0.5, 1], // Less bouncy
```

### Blur effect not working
Ensure backdrop-filter is supported and GPU acceleration is enabled:
```css
/* May need vendor prefixes */
-webkit-filter: blur(2px);
filter: blur(2px);
```
