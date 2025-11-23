# CMSR Consultants Website

A modern, responsive website for CMSR Consultants built with React and Tailwind CSS.

## Features

- 🎨 Modern design with custom color scheme (#0C4A8C and #FFBF00)
- 📱 Fully responsive layout
- 🎭 Full-width hero slider with smooth transitions
- 🧭 Fixed top navigation with smooth scrolling
- 📄 Multiple pages: Home, Who we are, What we do, Our Thinking, Our team, Careers, Location
- ⚡ Fast and optimized with Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
CMSR Website/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Fixed top navigation
│   │   └── HeroSlider.jsx      # Hero slider component
│   ├── pages/
│   │   ├── Home.jsx            # Homepage
│   │   ├── WhoWeAre.jsx        # Who we are page
│   │   ├── WhatWeDo.jsx        # What we do page
│   │   ├── OurThinking.jsx     # Our Thinking page
│   │   ├── OurTeam.jsx         # Our team page
│   │   ├── Careers.jsx         # Careers page
│   │   └── Location.jsx        # Location/Contact page
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Color Scheme

- Primary: `#0C4A8C` (Blue)
- Secondary: `#FFBF00` (Yellow/Orange)

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

