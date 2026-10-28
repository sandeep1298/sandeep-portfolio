# Sandeep M — Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and react-three-fiber.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the EmailJS keys
npm run dev
```

> Don't install with `sudo`. A root-owned `node_modules` stops Vite from writing its cache and the dev server fails to start.

## Environment variables

| Variable                       | Used by          |
| ------------------------------ | ---------------- |
| `VITE_APP_EMAILJS_SERVICE_ID`  | Contact form     |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | Contact form     |
| `VITE_APP_EMAILJS_PUBLIC_KEY`  | Contact form     |

## Scripts

- `npm run dev`: start the dev server (`npm run host` exposes it on your network)
- `npm run build`: type-check, then production build into `dist/`
- `npm run typecheck`: TypeScript check only (`tsc --noEmit`, strict mode)
- `npm run preview`: serve the production build
- `npm run lint`: ESLint

## Structure

```
src/
  components/
    layout/    Navbar, NavLinks, Section, BackToTop, Footer
    sections/  Hero, Tech, Experience, Works, Contact
    ui/        Button, SectionHeading, GradientText, FormField, SocialLinks, TechChip, ThemeButton, PageLoader
    canvas/    BaseCanvas + LazyCanvas (shared 3D setup), Stars, Computers, Earth
  constants/   page content (tech, experience, projects, links) and model paths
  types.ts     shared content types (Technology, Experience, Project, SocialLink)
  context/     theme provider + useTheme
  hooks/       shared scroll store, scroll-spy, viewport, media-query and spotlight hooks
```

The 3D scenes only render while they're on screen and the page isn't scrolling. The models are skipped below 768px.
