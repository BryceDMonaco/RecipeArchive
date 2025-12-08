# Recipe Archive Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Create a lightweight, static recipe browsing website hosted on GitHub Pages
- Enable users to search recipes by title, tags, and full-text content
- Provide a responsive two-panel layout that works seamlessly on desktop and mobile
- Implement tag-based filtering for recipe categorization (cuisine, meal type, dietary restrictions, etc.)
- Add convenient "Copy Ingredients" functionality for creating shopping lists
- Deliver a clean, minimalist interface using shadcn/ui design philosophy
- Establish git-based content management workflow for recipes

### Background Context

Recipe Archive addresses the need for a personal recipe management solution that prioritizes simplicity and accessibility. Many recipe management tools require complex databases, backend infrastructure, or subscription fees. This project takes a different approach by leveraging static site generation and GitHub Pages to create a zero-cost, version-controlled recipe archive. The markdown-based format ensures recipes remain portable and future-proof, while the modern React/TypeScript stack provides an elegant user experience.

The application serves home cooks who want to maintain their recipe collection without vendor lock-in or ongoing hosting costs. By storing recipes as plain markdown files with frontmatter metadata, users gain the benefits of version control (tracking recipe modifications over time) while maintaining full ownership of their content. The static nature ensures fast load times and eliminates security concerns associated with dynamic backends.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-07 | 0.1 | Initial PRD draft | John (PM) |

## Requirements

### Functional

- **FR1:** The system shall parse markdown files with frontmatter metadata (title, tags) from the recipe repository
- **FR2:** The system shall display recipes in a two-panel layout with a sidebar for navigation and main content area for recipe display
- **FR3:** The sidebar shall contain a searchable list of all available recipes
- **FR4:** The system shall provide unified search functionality across recipe titles, tags, and full document content
- **FR5:** The system shall filter recipes by tags using comma-separated values in frontmatter metadata
- **FR6:** The system shall allow users to browse recipes by multiple tag categories (cuisine type, meal category, dietary restrictions, cooking method)
- **FR7:** The system shall render markdown recipe content including ingredients lists and preparation instructions
- **FR8:** The system shall provide a "Copy Ingredients" button at the bottom of each recipe's ingredients list
- **FR9:** The "Copy Ingredients" button shall copy all ingredients to clipboard with each ingredient on a new line
- **FR10:** The sidebar shall be collapsible on mobile devices to maximize screen space for recipe content
- **FR11:** The sidebar shall remain visible alongside main content on desktop viewports
- **FR12:** Search results shall update in real-time as users type in the search interface

### Non Functional

- **NFR1:** The site shall be deployable to GitHub Pages as a static website
- **NFR2:** The application shall use React with TypeScript for type safety and maintainability
- **NFR3:** The UI shall utilize shadcn/ui components for consistent, accessible interface elements
- **NFR4:** The application shall implement client-side markdown parsing (no backend required)
- **NFR5:** The application shall follow shadcn's design philosophy with clean, minimalist aesthetic
- **NFR6:** The layout shall be fully responsive, adapting gracefully between desktop and mobile viewports
- **NFR7:** Sidebar transitions between collapsed/expanded states shall be smooth with touch-friendly controls
- **NFR8:** The clipboard functionality shall use modern Clipboard API for cross-browser compatibility
- **NFR9:** The application shall use GitHub Actions to automatically build and deploy to GitHub Pages on every commit to the main branch
- **NFR10:** Page load times shall be optimized for fast initial render (static site benefits)
- **NFR11:** The site shall incur zero ongoing hosting costs (GitHub Pages free tier)
- **NFR12:** Recipe pages shall include print-friendly CSS formatting optimized for printing recipes

## User Interface Design Goals

### Overall UX Vision

The Recipe Archive interface prioritizes **clarity and ease of use during cooking**. The design assumes users will frequently access recipes while actively cooking, potentially with messy hands or distracted attention. Therefore, the interface emphasizes:

- **Large, readable text** for recipe instructions (easily visible from counter distance)
- **Minimal chrome and distractions** - the recipe content is the star
- **Quick navigation** - finding the right recipe should take seconds, not minutes
- **One-handed mobile operation** - collapsible sidebar, large touch targets
- **Persistent access to ingredients** - the "Copy Ingredients" feature acknowledges that users often need to reference ingredients while shopping or prepping

The aesthetic follows shadcn's restrained, typography-focused approach rather than image-heavy, Pinterest-style recipe sites.

### Key Interaction Paradigms

- **Search-first discovery** - The sidebar search is the primary entry point for finding recipes
- **Tag-based browsing** - Users can filter by multiple tag categories to discover recipes (e.g., "vegetarian + dinner + quick")
- **Single-column reading flow** - Recipe content displays in a linear, scrollable format (no tabbed sections or complex navigation within a recipe)
- **Copy-on-click utility** - The ingredients list copy button provides instant clipboard access without selection/copy gestures
- **Responsive show/hide** - Sidebar collapses to maximize content space on mobile, easily toggleable

### Core Screens and Views

1. **Home/Recipe List View** - Two-panel layout with sidebar showing all recipes and searchable interface, main area displays blank/empty state with welcome message or instructions
2. **Recipe Detail View** - Main content area displaying the full recipe with rendered markdown (text-only), ingredients list, and copy button
3. **Search/Filter Active View** - Sidebar showing filtered recipe results based on search query or tag selection, main area remains at current state

**Note:** This is intentionally minimal - no login, no user accounts, no recipe editing UI, no settings pages. Pure consumption experience. No recipe images or media - text-focused.

### Accessibility

**Target: WCAG AA compliance**

- Semantic HTML structure for screen reader navigation
- Sufficient color contrast (shadcn components meet AA standards)
- Keyboard navigation for all interactive elements (search, sidebar toggle, copy button)
- Focus indicators clearly visible
- No reliance on color alone to convey information

### Branding

**shadcn's neutral theme** with developer-friendly aesthetic:

- Neutral color palette (grays with single accent color)
- Typography-focused design (system fonts or clean sans-serif)
- Subtle shadows and borders for depth
- No logo, custom illustrations, or branded imagery
- Text-only recipe content (no image support)

### Target Device and Platforms

**Web Responsive - Desktop and Mobile browsers**

Breakpoints:
- **Desktop (>768px):** Sidebar visible alongside content, generous whitespace
- **Tablet (768px-1024px):** Sidebar visible but narrower, touch-optimized
- **Mobile (<768px):** Sidebar collapsed by default, full-width content, touch-optimized controls

**Browser support:**
- Modern desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome on Android)
- No Internet Explorer support

**Print support:**
- Print-friendly CSS for clean recipe printouts

## Technical Assumptions

### Repository Structure: **Monorepo (Single Repository)**

The repository will contain:
- `/src` - React application source code
- `/recipes` - Markdown recipe files
- `/docs` - Project documentation (this PRD, architecture docs)
- `/.github/workflows` - GitHub Actions configuration

### Service Architecture

**Architecture:** Pure static site with no backend services

**Key Technical Decisions:**

1. **Build Tool: Vite**
   - Modern, fast development experience
   - Excellent TypeScript support
   - Optimized production builds
   - Native ESM support

2. **Frontend Framework: React 18+ with TypeScript**
   - Strict mode enabled
   - Functional components with hooks (no class components)

3. **UI Component Library: shadcn/ui**
   - Built on Radix UI primitives (accessibility baked in)
   - Tailwind CSS for styling

4. **Markdown Processing:**
   - Hybrid approach - bundle recipe metadata (title, tags) at build, load full content on-demand
   - Library: `remark` and `react-markdown` for parsing and rendering

5. **Search Implementation:**
   - Client-side search using `fuse.js` (fuzzy search library)
   - Index built from recipe metadata + content
   - Supports full-text search across all fields

6. **State Management:**
   - React Context API + hooks for global state (sidebar open/closed, current recipe, search query)
   - No Redux/Zustand - state is simple and localized

7. **Routing:**
   - React Router for client-side navigation
   - URL structure: `/#/recipe/recipe-name` (hash-based routing for GitHub Pages compatibility)

### Testing Requirements

**Pragmatic testing approach for MVP:**

1. **Unit Testing:**
   - Vitest (Vite's native test runner)
   - Test utility functions (search, markdown parsing helpers)
   - Test React hooks if custom logic exists

2. **Component Testing:**
   - React Testing Library
   - Test critical components: Search, RecipeList, Recipe Copy button
   - Focus on user interactions, not implementation details

3. **No E2E initially** - Can add Playwright later if needed, but for MVP, manual testing is sufficient

4. **Manual Testing Convenience:**
   - Dev mode with hot reload
   - Sample recipe files included in repository for local development

### Additional Technical Assumptions and Requests

1. **Deployment Strategy:**
   - GitHub Actions workflow builds on push to `main` branch
   - Output to `/dist` folder
   - Deploy to `gh-pages` branch automatically
   - Custom domain support (optional, configurable via CNAME)

2. **Development Environment:**
   - Node.js 18+ (LTS)
   - npm or pnpm for package management
   - ESLint + Prettier for code quality

3. **Recipe File Convention:**
   - Markdown files stored in `/recipes` directory
   - Frontmatter format: YAML
   - File naming: kebab-case (e.g., `chocolate-chip-cookies.md`)
   - Build process discovers all `.md` files in `/recipes` automatically

4. **Browser Compatibility:**
   - Modern evergreen browsers (last 2 versions)
   - No polyfills for IE11 or older browsers
   - Use of modern JavaScript features (ES2020+) is acceptable

5. **Performance Considerations:**
   - Code splitting by route (lazy load recipe detail view)
   - Optimize bundle size (tree-shaking, minification)
   - Target <500KB initial bundle size (gzipped)
   - Lighthouse score target: 90+ on Performance

6. **Error Handling:**
   - Graceful handling of missing recipe files
   - User-friendly error messages for failed searches
   - Console warnings for development, silent in production

## Epic List

### Epic 1: Foundation & Core Recipe Display
Establish project infrastructure (Vite, React, TypeScript, shadcn/ui) and implement basic recipe rendering capability with markdown parsing and display of a single recipe.

### Epic 2: Recipe Discovery & Navigation
Build the full browsing experience with searchable sidebar, recipe list, tag-based filtering, and client-side routing between recipes.

### Epic 3: Enhanced UX & Production Polish
Complete the MVP with copy-to-clipboard functionality, mobile-responsive sidebar, print-friendly formatting, error handling, and performance optimization.

## Epic 1: Foundation & Core Recipe Display

**Goal:** Establish the project's technical foundation by setting up the Vite + React + TypeScript development environment, integrating shadcn/ui component library, and implementing the core capability to parse and display recipe markdown files. This epic delivers a deployable site that can render a single recipe with proper styling, validating the entire build and deployment pipeline.

### Story 1.1: Project Initialization and Development Environment Setup

**As a** developer,
**I want** a properly configured Vite + React + TypeScript project with linting and formatting,
**so that** I have a solid foundation for building the Recipe Archive application.

#### Acceptance Criteria

1. Vite project initialized with React and TypeScript templates
2. TypeScript configured with strict mode enabled
3. ESLint and Prettier configured and working
4. Git repository initialized with appropriate `.gitignore` (node_modules, dist, etc.)
5. Package.json includes dev and build scripts
6. Project runs locally with `npm run dev` and displays Vite's default React page
7. Project builds successfully with `npm run build` producing `/dist` output
8. README.md created with basic setup instructions

### Story 1.2: shadcn/ui Integration and Basic Two-Panel Layout

**As a** user,
**I want** to see a clean two-panel layout matching shadcn's design aesthetic,
**so that** the interface looks professional and is ready for content.

#### Acceptance Criteria

1. Tailwind CSS installed and configured
2. shadcn/ui CLI initialized and configured
3. Basic shadcn/ui components installed (at minimum: Button, Card, Separator)
4. Two-panel layout component created with sidebar (left) and main content area (right)
5. Layout is responsive with basic breakpoint at 768px
6. shadcn's neutral theme colors applied
7. Typography follows shadcn's font system
8. Layout component has unit tests verifying it renders both panels
9. Application displays the empty layout when running locally

### Story 1.3: Markdown Recipe Parsing and Display

**As a** user,
**I want** to view a recipe with properly formatted markdown content,
**so that** I can read recipes in a clear, readable format.

#### Acceptance Criteria

1. `remark` and `react-markdown` libraries installed and configured
2. Recipe data structure defined with TypeScript interface (title, tags, content)
3. Frontmatter parsing implemented to extract title and tags from YAML
4. RecipeDisplay component created to render markdown content
5. Sample recipe markdown file created in `/recipes` directory
6. Application loads and displays the sample recipe in the main content area
7. Markdown headings, lists, bold/italic text render correctly
8. Unit tests verify frontmatter parsing extracts title and tags correctly
9. Component tests verify RecipeDisplay renders markdown content

### Story 1.4: GitHub Actions CI/CD Pipeline

**As a** developer,
**I want** automated build and deployment to GitHub Pages on every push to main,
**so that** recipe changes and code updates are automatically published.

#### Acceptance Criteria

1. GitHub Actions workflow file created (`.github/workflows/deploy.yml`)
2. Workflow triggers on push to `main` branch
3. Workflow runs `npm install` and `npm run build`
4. Workflow runs tests (`npm test`) before building
5. Build output (`/dist`) deployed to `gh-pages` branch
6. GitHub Pages configured to serve from `gh-pages` branch
7. Site accessible via GitHub Pages URL after workflow completes
8. Workflow fails if tests fail (preventing broken builds from deploying)
9. Sample recipe visible on deployed site

## Epic 2: Recipe Discovery & Navigation

**Goal:** Transform the single-recipe viewer into a full browsing experience by implementing recipe discovery mechanisms. This epic adds the sidebar recipe list, client-side routing for navigation between recipes, real-time search functionality across titles/tags/content, and tag-based filtering. Upon completion, users can browse their entire recipe collection, search for specific recipes, and filter by categories.

### Story 2.1: Recipe List and Metadata Loading

**As a** user,
**I want** to see a list of all available recipes in the sidebar,
**so that** I know what recipes are in my collection.

#### Acceptance Criteria

1. Build process discovers all `.md` files in `/recipes` directory
2. Recipe metadata (title, tags, filename) extracted from all recipe files
3. Metadata bundled into a JSON manifest file during build
4. RecipeList component created to display recipe titles in sidebar
5. At least 3-5 sample recipes created for testing
6. Recipe list displays in sidebar with proper shadcn styling (Card or List components)
7. Recipe list is scrollable if content exceeds sidebar height
8. Unit tests verify metadata extraction from multiple recipe files
9. Component tests verify RecipeList renders all recipe titles

### Story 2.2: Client-Side Routing and Recipe Navigation

**As a** user,
**I want** to click on a recipe in the sidebar to view it in the main content area,
**so that** I can easily browse between different recipes.

#### Acceptance Criteria

1. React Router installed and configured with hash-based routing
2. Routes defined: `/#/` (home with blank main area) and `/#/recipe/:recipeName`
3. RecipeList items converted to clickable links that navigate to recipe routes
4. Clicking a recipe in sidebar loads and displays it in main content area
5. URL updates to reflect current recipe (e.g., `/#/recipe/chocolate-chip-cookies`)
6. Browser back/forward buttons work correctly
7. Direct navigation to recipe URL loads the correct recipe
8. Active recipe highlighted in sidebar list
9. Component tests verify clicking recipe list item triggers navigation
10. Integration tests verify routing loads correct recipe content

### Story 2.3: Real-Time Search Implementation

**As a** user,
**I want** to search for recipes by typing in a search box,
**so that** I can quickly find specific recipes without scrolling through the entire list.

#### Acceptance Criteria

1. `fuse.js` library installed and configured
2. Search index created from recipe metadata and content
3. SearchBar component added to top of sidebar using shadcn Input component
4. Search filters recipe list in real-time as user types
5. Search matches across recipe titles, tags, and full content
6. Fuzzy search handles minor typos gracefully
7. Empty search shows all recipes
8. Search with no results displays "No recipes found" message
9. Search is case-insensitive
10. Unit tests verify search algorithm matches expected recipes
11. Component tests verify SearchBar updates recipe list on input

### Story 2.4: Tag-Based Filtering

**As a** user,
**I want** to filter recipes by tags,
**so that** I can find recipes by category (e.g., "vegetarian", "dessert", "quick").

#### Acceptance Criteria

1. Tag aggregation extracts all unique tags from recipe metadata
2. TagFilter component displays available tags (can use shadcn Badge components)
3. Tags displayed in sidebar above or below search box
4. Clicking a tag filters recipe list to show only recipes with that tag
5. Multiple tags can be selected (AND logic - recipe must have all selected tags)
6. Selected tags visually indicated (highlighted or different color)
7. Clicking selected tag deselects it
8. "Clear filters" button clears all selected tags
9. Tag filtering works in conjunction with search (filters applied to search results)
10. Unit tests verify tag extraction and filtering logic
11. Component tests verify tag selection updates recipe list

## Epic 3: Enhanced UX & Production Polish

**Goal:** Complete the MVP by adding quality-of-life features and production-ready polish. This epic implements the copy-to-clipboard functionality for ingredients, mobile-responsive sidebar collapse/expand, print-friendly CSS for recipe printouts, comprehensive error handling, and performance optimizations. These enhancements transform the functional application into a production-ready, user-friendly product suitable for daily use.

### Story 3.1: Copy Ingredients to Clipboard

**As a** user,
**I want** to copy all ingredients from a recipe with a single button click,
**so that** I can easily create shopping lists or share ingredient lists with others.

#### Acceptance Criteria

1. "Copy Ingredients" button added below ingredients list in recipe display
2. Button uses shadcn Button component with appropriate styling
3. Clicking button copies all ingredients to clipboard (each ingredient on new line)
4. Clipboard API implementation with fallback for older browsers
5. Success feedback shown after copy (toast notification or button text change)
6. Button disabled state if no ingredients found in recipe
7. Ingredients section identified by markdown heading (e.g., "## Ingredients")
8. Copied text format preserves bullet points or numbering as plain text
9. Unit tests verify ingredient extraction logic
10. Component tests verify button click triggers clipboard copy
11. Manual testing confirms clipboard content is correct across browsers

### Story 3.2: Mobile-Responsive Sidebar with Collapse/Expand

**As a** mobile user,
**I want** the sidebar to collapse by default and expand on demand,
**so that** I have maximum screen space for reading recipes while still accessing navigation when needed.

#### Acceptance Criteria

1. Sidebar collapses to hidden state on mobile viewports (<768px)
2. Hamburger menu button (shadcn Button with icon) visible when sidebar collapsed
3. Clicking hamburger button expands sidebar with smooth animation
4. Expanded sidebar overlays main content (does not push it aside)
5. Clicking outside sidebar or close button collapses it again
6. Sidebar state persists during navigation (stays open/closed as user browses)
7. Touch-friendly button sizes (minimum 44x44px tap targets)
8. Desktop viewport (≥768px) ignores collapse state, sidebar always visible
9. React Context or state management handles sidebar open/closed state
10. Component tests verify sidebar visibility at different viewport sizes
11. Component tests verify button click toggles sidebar state

### Story 3.3: Print-Friendly Recipe Formatting

**As a** user,
**I want** recipes to print cleanly without sidebar or navigation elements,
**so that** I can have physical recipe cards while cooking.

#### Acceptance Criteria

1. Print-specific CSS media query created (`@media print`)
2. Sidebar hidden when printing
3. Navigation elements and buttons hidden when printing
4. Recipe content uses full page width when printing
5. Page breaks avoided within ingredient lists or instruction steps
6. Font sizes optimized for paper readability
7. Background colors removed (ink-saving)
8. Recipe title prints prominently at top of page
9. Browser print preview shows clean, formatted recipe
10. Manual testing across Chrome, Firefox, Safari print functions

### Story 3.4: Error Handling and Loading States

**As a** user,
**I want** clear feedback when recipes fail to load or errors occur,
**so that** I understand what went wrong and can take appropriate action.

#### Acceptance Criteria

1. Loading spinner (shadcn component) displayed while recipe content loads
2. Error message displayed if recipe file not found (404)
3. Error message displayed if markdown parsing fails
4. Graceful handling of malformed frontmatter (use filename as fallback title)
5. "No recipes found" message when search returns zero results
6. Network error handling with user-friendly messages
7. Error boundary component catches React rendering errors
8. Console errors logged in development, suppressed in production
9. Unit tests verify error handling logic
10. Component tests verify loading and error states render correctly

### Story 3.5: Performance Optimization and Accessibility Audit

**As a** user,
**I want** the site to load quickly and be accessible to all users,
**so that** I have a fast, inclusive experience regardless of my device or abilities.

#### Acceptance Criteria

1. Code splitting implemented (lazy load recipe content routes)
2. Bundle size analyzed and optimized (tree-shaking, minification)
3. Total bundle size under 500KB (gzipped)
4. Lighthouse performance score 90+ on mobile and desktop
5. Lighthouse accessibility score 90+ (WCAG AA compliance)
6. All interactive elements have visible focus indicators
7. Semantic HTML used throughout (proper heading hierarchy, landmarks)
8. ARIA labels added where necessary (search input, buttons)
9. Keyboard navigation tested for all functionality
10. Screen reader testing performed on critical user flows
11. Images (if any) have alt text
12. Color contrast verified with automated tools

## Checklist Results Report

### Executive Summary

- **Overall PRD Completeness:** 78%
- **MVP Scope Appropriateness:** Just Right
- **Readiness for Architecture Phase:** Ready with Minor Gaps
- **Most Critical Concerns:** Missing success metrics and MVP validation approach; stakeholder sections N/A for personal project

### Category Analysis

| Category                         | Status  | Critical Issues                                                           |
| -------------------------------- | ------- | ------------------------------------------------------------------------- |
| 1. Problem Definition & Context  | PARTIAL | No measurable success metrics or KPIs; no competitive analysis            |
| 2. MVP Scope Definition          | PARTIAL | Missing future enhancements section and MVP validation criteria           |
| 3. User Experience Requirements  | PASS    | None - comprehensive coverage                                             |
| 4. Functional Requirements       | PASS    | None - well-defined and testable                                          |
| 5. Non-Functional Requirements   | PARTIAL | Missing monitoring needs, documentation requirements (many items N/A)     |
| 6. Epic & Story Structure        | PASS    | None - excellent sequencing and breakdown                                 |
| 7. Technical Guidance            | PARTIAL | No technical risk areas identified; no tech debt guidance                 |
| 8. Cross-Functional Requirements | PARTIAL | Missing data quality requirements, monitoring/alerting                    |
| 9. Clarity & Communication       | PARTIAL | No diagrams/visuals; stakeholder sections N/A for personal project        |

### Top Recommendations

**HIGH PRIORITY:**
1. Add success metrics section defining measurable KPIs for MVP success
2. Add MVP validation approach documenting how to test if it solves the problem
3. Add "Out of Scope" section explicitly documenting excluded features
4. Add "Future Enhancements" list capturing post-MVP ideas

**MEDIUM PRIORITY:**
5. Flag technical risk areas for architect investigation (search performance, markdown parsing edge cases)
6. Add user flow diagrams for visual clarity
7. Define monitoring/analytics approach

### Final Decision

**✅ READY FOR ARCHITECT** (with recommendations)

The PRD is well-structured with excellent epic breakdown, clear requirements, and solid technical direction. Recommended additions would elevate documentation quality but aren't blockers for proceeding to architecture phase.

## Next Steps

### UX Expert Prompt

Review the Recipe Archive PRD at `docs/prd.md` and create detailed UI/UX specifications including component hierarchy, interaction patterns, responsive behavior, and accessibility implementation. Focus on the two-panel layout, sidebar interactions (search, filtering, mobile collapse), recipe display formatting, and copy-to-clipboard UX. Deliver wireframes or component specifications that the architect can translate into technical implementation.

### Architect Prompt

Review the Recipe Archive PRD at `docs/prd.md` and create a comprehensive architecture document. Define the project structure, component architecture, data flow, build pipeline, testing strategy, and deployment configuration. Address the technical decisions outlined in the PRD (Vite + React + TypeScript, shadcn/ui, markdown processing, client-side search with fuse.js, GitHub Actions CI/CD). Pay special attention to recipe metadata bundling strategy, search index optimization, and mobile performance. Document the implementation approach for each epic and identify any technical risks or complexity areas requiring special consideration.

