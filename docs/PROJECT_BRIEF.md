# Recipe Archive - Project Brief

## Overview
Recipe Archive is a lightweight, static website for managing and browsing a personal collection of recipes stored as markdown files. The site will be hosted on GitHub Pages, providing a simple yet elegant interface for discovering recipes through search and tag-based filtering. Built with React and TypeScript using shadcn/ui components, the application emphasizes simplicity and usability while maintaining a modern, responsive design that works seamlessly across desktop and mobile devices.

## Core Features
The application features a two-panel layout: a main content area displaying recipe details and a collapsible sidebar containing a searchable recipe list. Each recipe is stored as an individual markdown file with metadata (tags, title) embedded at the top in a frontmatter-style format. Users can search recipes by title, tags, or full document content through a unified search interface in the sidebar. The tag system uses comma-separated values in the recipe metadata, allowing recipes to be categorized and filtered by multiple attributes such as cuisine type, meal category, dietary restrictions, or cooking method.

Recipe display includes enhanced functionality for practical cooking use. Each recipe's ingredients list features a convenient "Copy Ingredients" button at the bottom, allowing users to quickly copy all ingredients to their clipboard with each ingredient on a new line—perfect for creating shopping lists or sharing with others.

## Design & User Experience
The interface follows shadcn's design philosophy with a clean, minimalist aesthetic using a simple color scheme inspired by shadcn's example pages. The responsive layout adapts gracefully between desktop and mobile viewports: on desktop, the sidebar remains visible alongside the main content area, while on mobile devices, it collapses to maximize screen space for reading recipes. The collapsible sidebar ensures the interface remains clean and focused, with smooth transitions and touch-friendly controls for mobile users.

## Technical Architecture
The site leverages React with TypeScript for type safety and maintainability, utilizing shadcn/ui components for a consistent, accessible UI. Since GitHub Pages serves static content, the application will implement client-side markdown parsing and search functionality. Recipe markdown files will be processed at build time or loaded dynamically, with metadata extracted from frontmatter. The search implementation will support filtering across recipe titles, tags, and content, providing instant results as users type. The clipboard functionality uses the modern Clipboard API to ensure reliable copying across different browsers and devices.

## Deployment & Workflow
Hosted on GitHub Pages, the site benefits from automatic deployment via GitHub Actions whenever recipe files are added or modified in the repository. This workflow enables a git-based content management system where recipes can be added, edited, or removed through simple markdown file commits. The static nature of the site ensures fast load times, zero hosting costs, and easy version control of recipe content alongside the application code.
