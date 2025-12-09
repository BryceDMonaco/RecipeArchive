# Recipe Archive

A lightweight, static recipe browsing website hosted on GitHub Pages. Built with React, TypeScript, and Vite.

## Overview

Recipe Archive is a personal recipe management solution that prioritizes simplicity and accessibility. It leverages static site generation and GitHub Pages to create a zero-cost, version-controlled recipe archive. Recipes are stored as markdown files with frontmatter metadata, ensuring portability and future-proofing.

## Features

- 🔍 Search recipes by title, tags, and full-text content
- 🏷️ Tag-based filtering for recipe categorization
- 📱 Responsive two-panel layout (desktop and mobile)
- 📋 Copy ingredients to clipboard for shopping lists
- 🎨 Clean, minimalist UI using shadcn/ui design philosophy
- 📝 Markdown-based recipe format with version control

## Prerequisites

- **Node.js**: 18+ (LTS)
- **npm**: 10+

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `/dist` directory.

### 4. Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot module replacement |
| `npm run build` | Build production-ready static site to `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking without emitting files |

## Project Structure

```
RecipeArchive/
├── .github/workflows/    # GitHub Actions CI/CD
├── docs/                 # Project documentation
├── public/               # Static assets
├── recipes/              # Markdown recipe files (to be added)
├── src/                  # React application source
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── README.md            # This file
```

## Technology Stack

- **Build Tool**: Vite 5.0+
- **Frontend Framework**: React 18.2+
- **Language**: TypeScript 5.3+ (strict mode)
- **UI Components**: shadcn/ui (to be added)
- **Styling**: Tailwind CSS (to be added)
- **Markdown Processing**: remark + react-markdown (to be added)
- **Search**: fuse.js (to be added)
- **Routing**: React Router (to be added)

## Development Guidelines

- All source files use TypeScript (no `.js` or `.jsx`)
- Functional components only (no class components)
- Strict mode enabled (avoid `any` types)
- ESLint and Prettier enforce code quality and consistency

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions on every push to the `main` branch.

## License

Private personal project.
