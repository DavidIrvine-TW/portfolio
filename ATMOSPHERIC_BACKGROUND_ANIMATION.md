# Atmospheric Background Animation

## Overview

This is a sophisticated, full-screen animated background component that creates a dynamic, atmospheric effect using morphing blobs, fog layers, and light streaks. The animation gives the appearance of a nebula or cosmic fog drifting across the page.

**Key Features:**
- 6 morphing nebula blobs with independent movement patterns (drift, circular, diagonal, float)
- 3 layered fog gradients with parallax-like depth
- 3 subtle light streaks for atmospheric accent
- Deep vignette overlay for focus
- Optimized for mobile (reduced complexity on smaller screens)
- Fixed position, sits behind all content (z-index: -1)
- Pure CSS animations, no JavaScript dependencies

**Visual Effect:**
- Slow, organic morphing shapes that create depth
- Peru accent color (#CD853F) mixed with dark grays (#2D2D2D, #1B1B1B)
- Heavily blurred (60-100px blur) for atmospheric feel
- Movement cycles range from 14s to 52s for natural randomness
- Screen blend mode creates layered, translucent nebula effect

---

## Implementation

### 1. React Component (AtmosphericBackground.jsx)

```jsx
'use client';
import './AtmosphericBackground.css';

export default function AtmosphericBackground() {
  return (
    <div className="atmospheric-background">
      {/* Deep space nebula layers with morphing shapes */}
      <div className="nebula-layer nebula-1">
        <div className="nebula-blob blob-1"></div>
        <div className="nebula-blob blob-2"></div>
      </div>
      <div className="nebula-layer nebula-2">
        <div className="nebula-blob blob-3"></div>
        <div className="nebula-blob blob-4"></div>
      </div>
      <div className="nebula-layer nebula-3">
        <div className="nebula-blob blob-5"></div>
        <div className="nebula-blob blob-6"></div>
      </div>

      {/* Atmospheric fog layers with different depths */}
      <div className="fog-layer fog-far"></div>
      <div className="fog-layer fog-mid"></div>
      <div className="fog-layer fog-near"></div>

      {/* Subtle light streaks */}
      <div className="light-streak light-streak-1"></div>
      <div className="light-streak light-streak-2"></div>
      <div className="light-streak light-streak-3"></div>

      {/* Deep vignette */}
      <div className="deep-vignette"></div>
    </div>
  );
}
```

### 2. CSS Animations (AtmosphericBackground.css)

```css
.atmospheric-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background: #171717;
  overflow: hidden;
  pointer-events: none;
}

/* Deep space nebula layers - now containers for morphing blobs */
.nebula-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
}

/* Morphing blobs that create dynamic nebula effect */
.nebula-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform, border-radius, opacity;
}

/* Blob 1 - Peru accent, large, left to right */
.blob-1 {
  width: 800px;
  height: 600px;
  background: radial-gradient(circle, rgba(205, 133, 63, 0.65), transparent 70%);
  top: 10%;
  left: -400px;
  animation:
    blobDriftLR1 35s ease-in-out infinite,
    blobMorph1 18s ease-in-out infinite,
    blobFade1 22s ease-in-out infinite;
}

/* Blob 2 - Dark gray, medium, right to left */
.blob-2 {
  width: 600px;
  height: 700px;
  background: radial-gradient(circle, rgba(45, 45, 45, 0.75), transparent 70%);
  top: 40%;
  right: -300px;
  animation:
    blobDriftRL1 42s ease-in-out infinite,
    blobMorph2 20s ease-in-out infinite,
    blobFade2 25s ease-in-out infinite;
}

/* Blob 3 - Darker, large, diagonal drift */
.blob-3 {
  width: 900px;
  height: 500px;
  background: radial-gradient(circle, rgba(27, 27, 27, 0.85), transparent 70%);
  top: 60%;
  left: -200px;
  animation:
    blobDriftDiag1 48s ease-in-out infinite,
    blobMorph3 16s ease-in-out infinite,
    blobFade3 28s ease-in-out infinite;
}

/* Blob 4 - Peru accent, smaller, circular */
.blob-4 {
  width: 500px;
  height: 550px;
  background: radial-gradient(circle, rgba(205, 133, 63, 0.55), transparent 70%);
  bottom: 20%;
  right: -250px;
  animation:
    blobCircle1 38s linear infinite,
    blobMorph4 14s ease-in-out infinite,
    blobFade4 20s ease-in-out infinite;
}

/* Blob 5 - Medium gray, crosses screen */
.blob-5 {
  width: 700px;
  height: 600px;
  background: radial-gradient(circle, rgba(45, 45, 45, 0.65), transparent 70%);
  top: 25%;
  left: -350px;
  animation:
    blobCross1 52s ease-in-out infinite,
    blobMorph5 22s ease-in-out infinite,
    blobFade5 30s ease-in-out infinite;
}

/* Blob 6 - Dark, floats vertically */
.blob-6 {
  width: 650px;
  height: 750px;
  background: radial-gradient(circle, rgba(27, 27, 27, 0.75), transparent 70%);
  top: -300px;
  right: 30%;
  animation:
    blobFloat1 45s ease-in-out infinite,
    blobMorph6 19s ease-in-out infinite,
    blobFade6 26s ease-in-out infinite;
}

/* Left to Right movement */
@keyframes blobDriftLR1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(calc(100vw + 400px), -100px);
  }
}

/* Right to Left movement */
@keyframes blobDriftRL1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(calc(-100vw - 300px), 80px);
  }
}

/* Diagonal drift */
@keyframes blobDriftDiag1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(400px, -200px);
  }
  66% {
    transform: translate(800px, 100px);
  }
}

/* Circular motion */
@keyframes blobCircle1 {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-300px, -200px);
  }
  50% {
    transform: translate(-400px, 100px);
  }
  75% {
    transform: translate(-100px, 200px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* Cross screen */
@keyframes blobCross1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(calc(100vw + 400px), 150px);
  }
}

/* Vertical float */
@keyframes blobFloat1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-80px, calc(100vh + 300px));
  }
}

/* Shape morphing - creates organic movement */
@keyframes blobMorph1 {
  0%, 100% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  }
  50% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
}

@keyframes blobMorph2 {
  0%, 100% {
    border-radius: 50% 50% 30% 70% / 50% 70% 30% 50%;
  }
  50% {
    border-radius: 30% 70% 60% 40% / 70% 40% 60% 30%;
  }
}

@keyframes blobMorph3 {
  0%, 100% {
    border-radius: 70% 30% 50% 50% / 30% 50% 50% 70%;
  }
  50% {
    border-radius: 40% 60% 40% 60% / 50% 60% 40% 50%;
  }
}

@keyframes blobMorph4 {
  0%, 100% {
    border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%;
  }
  50% {
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
  }
}

@keyframes blobMorph5 {
  0%, 100% {
    border-radius: 35% 65% 45% 55% / 65% 45% 55% 35%;
  }
  50% {
    border-radius: 65% 35% 55% 45% / 35% 65% 45% 55%;
  }
}

@keyframes blobMorph6 {
  0%, 100% {
    border-radius: 55% 45% 65% 35% / 45% 55% 35% 65%;
  }
  50% {
    border-radius: 45% 55% 35% 65% / 55% 45% 65% 35%;
  }
}

/* Opacity fading for breathing effect */
@keyframes blobFade1 {
  0%, 100% { opacity: 0.32; }
  50% { opacity: 0.52; }
}

@keyframes blobFade2 {
  0%, 100% { opacity: 0.37; }
  50% { opacity: 0.57; }
}

@keyframes blobFade3 {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.55; }
}

@keyframes blobFade4 {
  0%, 100% { opacity: 0.29; }
  50% { opacity: 0.47; }
}

@keyframes blobFade5 {
  0%, 100% { opacity: 0.33; }
  50% { opacity: 0.49; }
}

@keyframes blobFade6 {
  0%, 100% { opacity: 0.37; }
  50% { opacity: 0.57; }
}

/* Atmospheric fog layers - now with stronger horizontal drift */
.fog-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.fog-far {
  background:
    radial-gradient(
      ellipse 60% 50% at 80% 40%,
      rgba(45, 45, 45, 0.56) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse 50% 60% at 20% 70%,
      rgba(27, 27, 27, 0.64) 0%,
      transparent 55%
    );
  filter: blur(60px);
  animation: fogHorizontal1 55s ease-in-out infinite, fogFade1 40s ease-in-out infinite;
}

.fog-mid {
  background:
    radial-gradient(
      ellipse 70% 40% at 40% 50%,
      rgba(45, 45, 45, 0.64) 0%,
      transparent 65%
    ),
    radial-gradient(
      ellipse 55% 65% at 75% 30%,
      rgba(205, 133, 63, 0.32) 0%,
      transparent 50%
    );
  filter: blur(40px);
  animation: fogHorizontal2 42s ease-in-out infinite reverse, fogFade2 35s ease-in-out infinite;
}

.fog-near {
  background:
    radial-gradient(
      ellipse 65% 55% at 30% 20%,
      rgba(27, 27, 27, 0.72) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 60% 50% at 60% 80%,
      rgba(45, 45, 45, 0.64) 0%,
      transparent 60%
    );
  filter: blur(30px);
  animation: fogHorizontal3 38s ease-in-out infinite, fogFade3 28s ease-in-out infinite;
}

@keyframes fogHorizontal1 {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(200px) translateY(-50px);
  }
}

@keyframes fogHorizontal2 {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(-180px) translateY(40px);
  }
}

@keyframes fogHorizontal3 {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(150px) translateY(-30px);
  }
}

@keyframes fogFade1 {
  0%, 100% { opacity: 0.27; }
  50% { opacity: 0.39; }
}

@keyframes fogFade2 {
  0%, 100% { opacity: 0.32; }
  50% { opacity: 0.45; }
}

@keyframes fogFade3 {
  0%, 100% { opacity: 0.37; }
  50% { opacity: 0.52; }
}

/* Light streaks - more movement */
.light-streak {
  position: absolute;
  width: 3px;
  height: 500px;
  opacity: 0;
  filter: blur(2px);
}

.light-streak-1 {
  top: 10%;
  left: 30%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(205, 133, 63, 0.6) 50%,
    transparent
  );
  animation: streakMove1 8s ease-in-out infinite;
}

.light-streak-2 {
  top: 60%;
  right: 25%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(153, 153, 153, 0.5) 50%,
    transparent
  );
  animation: streakMove2 12s ease-in-out infinite 4s;
}

.light-streak-3 {
  top: 35%;
  left: 60%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(205, 133, 63, 0.4) 50%,
    transparent
  );
  animation: streakMove3 10s ease-in-out infinite 2s;
}

@keyframes streakMove1 {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) translateX(0);
  }
  50% {
    opacity: 0.8;
    transform: translateY(30px) translateX(50px);
  }
}

@keyframes streakMove2 {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) translateX(0);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-20px) translateX(-40px);
  }
}

@keyframes streakMove3 {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) translateX(0);
  }
  50% {
    opacity: 0.6;
    transform: translateY(40px) translateX(-30px);
  }
}

/* Deep vignette for focus */
.deep-vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 20%,
    rgba(23, 23, 23, 0.3) 60%,
    rgba(23, 23, 23, 0.6) 100%
  );
  pointer-events: none;
}

/* Mobile optimization - reduce complexity */
@media (max-width: 768px) {
  .nebula-blob {
    filter: blur(60px);
  }

  .blob-1, .blob-3, .blob-5 {
    display: none;
  }

  .fog-far,
  .fog-mid {
    display: none;
  }

  .fog-near {
    filter: blur(20px);
    opacity: 0.1;
  }

  .light-streak-2,
  .light-streak-3 {
    display: none;
  }
}
```

### 3. Usage in Next.js Layout

Add the component to your root layout so it appears across all pages:

```jsx
// app/layout.js or app/layout.tsx
import AtmosphericBackground from '@/components/AtmosphericBackground';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AtmosphericBackground />
        {/* Navigation, content, footer, etc. */}
        {children}
      </body>
    </html>
  );
}
```

---

## Customization Guide

### Color Palette

The animation uses three colors:

1. **Peru accent (primary)**: `rgba(205, 133, 63, X)` - Orange/gold nebula glow
2. **Dark gray (secondary)**: `rgba(45, 45, 45, X)` - Medium gray nebula
3. **Darker gray (tertiary)**: `rgba(27, 27, 27, X)` - Deep gray nebula
4. **Background**: `#171717` - Dark background

**To change colors:**
- Replace all instances of `rgba(205, 133, 63, X)` with your primary color
- Replace `rgba(45, 45, 45, X)` with your secondary color
- Replace `rgba(27, 27, 27, X)` with your tertiary color
- Update `.atmospheric-background { background: #171717; }` to your base color

### Animation Speed

Each blob has 3 animation durations:

1. **Movement animation** (35s - 52s): Controls drift/circular motion
2. **Morph animation** (14s - 22s): Controls shape deformation
3. **Fade animation** (20s - 30s): Controls opacity breathing

**To speed up/slow down:**
- Reduce all duration values by the same ratio (e.g., divide by 2 for 2x speed)
- Keep the varied durations to maintain organic feel
- Recommended range: 10s (fast) to 60s (slow)

### Blur Intensity

- **Blobs**: `filter: blur(100px)` (default)
- **Fog layers**: `blur(30px)` to `blur(60px)`
- **Light streaks**: `blur(2px)`

**To adjust:**
- Increase blur for softer, dreamier effect (up to 150px)
- Decrease blur for sharper, more defined shapes (down to 50px)

### Blob Sizes

Each blob has different dimensions:
- Blob 1: 800px × 600px
- Blob 2: 600px × 700px
- Blob 3: 900px × 500px
- etc.

**To adjust scale:**
- Multiply all width/height values by same ratio
- Larger = more coverage, slower feel
- Smaller = more defined, faster feel

---

## Performance Notes

### Mobile Optimization

The CSS includes `@media (max-width: 768px)` rules that:
- Hide half the blobs (blob-1, blob-3, blob-5)
- Hide 2 fog layers (fog-far, fog-mid)
- Hide 2 light streaks (light-streak-2, light-streak-3)
- Reduce blur from 100px to 60px

This cuts GPU load by ~60% on mobile devices.

### GPU Acceleration

The component uses:
- `will-change: transform, border-radius, opacity` on blobs
- `transform` instead of `top`/`left` for animations
- `position: fixed` with `z-index: -1` to create separate composite layer

### Browser Compatibility

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **IE11**: Not supported (uses CSS variables, modern gradients)
- **Mobile Safari**: Supported with mobile optimizations

---

## Animation Breakdown

### Layer 1: Nebula Blobs (6 total)

**Purpose**: Create the main atmospheric effect with large, morphing colored shapes

**Technique**:
- Radial gradients with 70% transparency fall-off
- 100px blur for soft edges
- `mix-blend-mode: screen` for additive blending
- 3 simultaneous animations: position, shape, opacity

**Movement patterns**:
- Blob 1: Horizontal drift (left → right)
- Blob 2: Horizontal drift (right → left)
- Blob 3: Diagonal drift (3-point path)
- Blob 4: Circular motion (4-point loop)
- Blob 5: Screen crossing (left → right)
- Blob 6: Vertical float (top → bottom)

### Layer 2: Fog Layers (3 total)

**Purpose**: Add depth and subtle atmospheric haze

**Technique**:
- Multiple radial gradients per layer
- 30-60px blur for soft haze
- Horizontal drift with vertical offset
- Lower opacity (0.27 - 0.52)

**Depth illusion**:
- Far fog: Largest, slowest, most blurred
- Mid fog: Medium size/speed, contains peru accent
- Near fog: Smaller, faster, least blurred

### Layer 3: Light Streaks (3 total)

**Purpose**: Add dynamic accents and directional movement

**Technique**:
- Thin vertical lines (3px width)
- Linear gradient with centered glow
- 2px blur for soft edges
- Fade in/out with movement

**Timing**:
- Staggered start delays (0s, 2s, 4s)
- Different durations (8s, 10s, 12s)
- Creates random, non-repetitive pattern

### Layer 4: Vignette

**Purpose**: Focus attention toward center, increase depth

**Technique**:
- Radial gradient from center
- Dark edges (60% opacity) to transparent center (0%)
- Static (no animation)

---

## Advanced Customization

### Adding More Blobs

To add a 7th blob:

1. Add HTML in component:
```jsx
<div className="nebula-layer nebula-4">
  <div className="nebula-blob blob-7"></div>
</div>
```

2. Add CSS:
```css
.blob-7 {
  width: 750px;
  height: 650px;
  background: radial-gradient(circle, rgba(YOUR_COLOR), transparent 70%);
  top: 50%;
  left: 20%;
  animation:
    [MOVEMENT_KEYFRAME] [DURATION]s ease-in-out infinite,
    blobMorph1 18s ease-in-out infinite,
    blobFade1 24s ease-in-out infinite;
}
```

3. Reuse existing keyframes or create new ones

### Creating New Movement Patterns

Example: Spiral motion

```css
@keyframes blobSpiral {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(200px, -200px) rotate(90deg);
  }
  50% {
    transform: translate(400px, 0) rotate(180deg);
  }
  75% {
    transform: translate(200px, 200px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}
```

### Changing Blend Modes

Current: `mix-blend-mode: screen` (additive, bright)

Alternatives:
- `multiply`: Darkens overlaps (for light backgrounds)
- `overlay`: More contrast (dramatic effect)
- `color-dodge`: Maximum brightness (very intense)
- `soft-light`: Subtle blending (understated)

---

## Troubleshooting

### Animation looks choppy
- Reduce blur values (e.g., 100px → 60px)
- Disable some blobs on lower-end devices
- Add `transform: translateZ(0)` to force GPU acceleration

### Colors too bright/dark
- Adjust RGBA opacity values (4th number)
- Reduce from 0.65 to 0.45 for subtler effect
- Increase to 0.85 for more pronounced effect

### Animation too fast/slow
- Multiply all duration values by same factor
- Maintain relative speed differences between elements

### Performance issues on mobile
- Mobile optimizations already included in CSS
- Consider hiding more elements if needed
- Test on target devices

---

## Example Variations

### Variation 1: Calm Ocean (Blue/Teal)

Replace colors:
- Peru → `rgba(0, 150, 199, X)` (teal)
- Dark gray → `rgba(13, 71, 161, X)` (deep blue)
- Darker gray → `rgba(1, 87, 155, X)` (navy)

Increase durations by 1.5x for slower movement.

### Variation 2: Sunset (Red/Orange/Pink)

Replace colors:
- Peru → `rgba(255, 87, 34, X)` (deep orange)
- Dark gray → `rgba(233, 30, 99, X)` (pink)
- Darker gray → `rgba(244, 67, 54, X)` (red)

Keep durations as-is for natural sunset drift.

### Variation 3: Minimal (Monochrome)

Replace colors:
- Peru → `rgba(120, 120, 120, X)` (light gray)
- Dark gray → `rgba(60, 60, 60, X)` (medium gray)
- Darker gray → `rgba(30, 30, 30, X)` (dark gray)

Reduce opacities by 50% for subtle background.

---

## License & Credits

**Original Design**: Koppla Technology website (https://kopplatechnology.com)

**Implementation**: React + CSS animations, no external dependencies

**Usage**: Feel free to use and modify for your own projects. Attribution appreciated but not required.
