# GBHS Robotics — Website

A static HTML/CSS website for Granite Bay High School Robotics. Pages mirror the structure of placerrobotics.org, with the editorial layout density of overclock.co, in the GBHS palette: white, black, and green.

## Run it
Just open `index.html` in any browser. No build step.

## Pages
- `index.html` — Home / landing
- `about.html` — Mission, values, history
- `team.html` — Captains, members, mentors
- `robots.html` — Season-by-season robot showcase
- `outreach.html` — Programs, events, impact
- `sponsors.html` — Tiers, partner logos, budget
- `contact.html` — Form + direct emails

## File structure
```
gbhs-robotics/
├── index.html
├── about.html
├── team.html
├── robots.html
├── outreach.html
├── sponsors.html
├── contact.html
├── css/styles.css
├── js/main.js
└── images/   (drop logos, photos, infographics here)
```

## Infographic slots
Every page has clearly marked blocks for infographics — look for elements with `class="infographic"` or the dashed `sponsor-slot` boxes. Replace the placeholder text and tag with an `<img>`, embedded SVG, or chart of your choice. Recommended formats: SVG for diagrams/charts, JPG/WebP for photos.

## Colors (edit in `css/styles.css`)
- `--green: #0a5d2a` (GBHS green)
- `--black: #0a0a0a`
- `--white: #ffffff`

## Fonts
Loaded from Google Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels).

## Customize
- Swap the `GB` mark in the nav for your logo (`.brand-mark` in `styles.css`).
- Replace stat numbers, season specs, sponsor logos, and team member placeholders.
- Wire the contact form to Formspree, Netlify Forms, or your email backend.
