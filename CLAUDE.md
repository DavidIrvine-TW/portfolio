# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React and Vite. It showcases projects, skills, and provides contact functionality. The site is deployed to GitHub Pages and uses a simple, clean design philosophy.

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Vite development server with hot module replacement.

### Building for Production
```bash
npm run build
```
Creates an optimized production build in the `dist` directory.

### Deploying to GitHub Pages
```bash
npm run deploy
```
Builds the project and deploys it to GitHub Pages. The `predeploy` script automatically runs `npm run build` before deployment.

### Linting
```bash
npm run lint
```
Runs ESLint with React-specific rules. Max warnings is set to 0.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build.

## Architecture

### Application Structure

The application uses a single-page design with all sections rendered in `App.jsx`:
- **Header** - Navigation with mobile menu toggle
- **Hero** - Landing section with animated text and skills showcase
- **About** - About me section
- **Projects** - Portfolio showcase with individual project cards
- **Contact** - Contact form powered by EmailJS
- **Footer** - Social links and copyright

### Smooth Scrolling

The app implements smooth scrolling using **Lenis** (initialized in `App.jsx:15-32`). The Lenis instance is configured with custom easing and runs on `requestAnimationFrame`. Navigation uses `react-scroll` for smooth section transitions.

### Project Data Architecture

Projects are managed through JSON files in `src/data/`:
- Each project has its own JSON file (e.g., `kanban.json`, `vapester.json`, `photosnap.json`, `trailerview.json`)
- Each JSON file exports an array with a single project object
- `Projects.jsx` imports these JSON files and maps through them to render `SingleProject` components

**Project Data Schema:**
```json
{
  "id": "unique-id",
  "name": "Project Name",
  "nameIcon": "./assets/icon.png",
  "nameIconAlt": "icon alt text",
  "blurb": "Project description",
  "tech": ["react", "firebase", "tailwind"],
  "features": "",
  "livelink": "https://...",
  "github": "https://github.com/...",
  "tags": ["#tag1", "#tag2"],
  "images": ["./assets/image.png"],
  "align": "right"
}
```

### Styling Architecture

The codebase is transitioning from Tailwind CSS to component-specific CSS files:
- Legacy components use Tailwind classes
- Newer components have dedicated CSS files (e.g., `About.css`, `Contact.css`, `Hero.css`, `Projects.css`)
- Custom Tailwind configuration extends default theme with custom colors, fonts, and breakpoints (`tailwind.config.js`)

**Custom Tailwind Extensions:**
- Colors: `bgOffWhite`, `header-txt`, `babyblue`, `babybluelight`
- Fonts: Roboto, Rubik, Mulish
- Breakpoints: `mob` (375px), `tb500` (500px), `tb900` (900px), `dk` (1440px)

### Contact Form

The contact form uses **EmailJS** for email functionality:
- Environment variables required: `VITE_EMAILJS_SERVICEID`, `VITE_EMAILJS_TEMPLATEID`, `VITE_EMAILJS_PUBLICKEY`
- Form validation with real-time error messages
- Email copy-to-clipboard functionality for the displayed email address

### Skills Data

Skills displayed in the Hero section are managed in `src/data/heroSkillsData.json`. The skills array uses identifiers that map to icons from [SkillIcons.dev](https://skillicons.dev/).

### Image Carousels

Project images use **SwiperJS** for carousel functionality (referenced in README but implemented in `SingleProject.jsx`).

## Key Technical Details

### State Management
- Simple prop drilling for menu state (`App.jsx` manages menu open/closed state)
- No Redux or Context API (except for one project that uses Redux as a feature showcase)

### Asset Paths
- Public assets referenced with leading slash: `/assets/...`
- Asset paths in JSON use relative paths: `./assets/...`

### Environment Setup
Create a `.env` file with EmailJS credentials:
```
VITE_EMAILJS_SERVICEID=your_service_id
VITE_EMAILJS_TEMPLATEID=your_template_id
VITE_EMAILJS_PUBLICKEY=your_public_key
```

## Adding New Projects

1. Create a new JSON file in `src/data/` following the project schema
2. Import the JSON file in `src/components/Projects.jsx`
3. Add a new mapping section in the Projects component JSX
4. Ensure project images are available in `public/assets/`
