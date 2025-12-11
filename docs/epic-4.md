# Epic 4: Bug Fixes and UX Enhancements - Brownfield Enhancement

## Epic Goal

Resolve critical mobile and functionality bugs affecting user experience while adding key UX improvements including dark mode support, dismissible banner, and improved ingredient copy accessibility. This epic addresses production issues discovered during testing and adds highly-requested quality-of-life features to enhance the Recipe Archive application.

## Epic Description

### Existing System Context

- **Current relevant functionality:** Recipe Archive is a React + TypeScript static site using shadcn/ui components with a responsive two-panel layout (sidebar + main content). The application includes mobile sidebar collapse/expand, search, tag filtering, copy ingredients button, and print-friendly formatting.
- **Technology stack:** Vite, React 18+, TypeScript, shadcn/ui, Tailwind CSS, react-markdown, fuse.js
- **Integration points:**
  - Sidebar component with mobile sheet overlay (shadcn/ui Sheet component)
  - RecipeDisplay component with markdown rendering
  - SearchBar component with fuse.js search indexing
  - CopyIngredientsButton component with Clipboard API
  - DevBanner component (red WIP banner)
  - Print CSS media queries
  - SidebarContext for state management

### Enhancement Details

**What's being added/changed:**

This epic addresses two categories of work:

**Bug Fixes (Critical UX Issues):**
1. **Mobile Sidebar - Duplicate X Buttons:** In mobile mode, two X buttons appear to collapse the sidebar (should be one)
2. **Mobile Sidebar - Incomplete Vertical Fill:** On some mobile devices, sidebar doesn't fill full screen height, showing recipe content at bottom
3. **Print View Pagination:** Print view stops at one page even when recipe content is longer
4. **Mobile Scroll Accessibility:** In portrait view, users cannot scroll far enough to reach copy ingredients button
5. **Search Inconsistency:** Search returns incorrect results (e.g., searching "bread" or "asian" returns all recipes when only specific recipes contain these terms)

**New Features:**
1. **Dark Mode:** Implement dark mode enabled by default with simple toggle in sidebar (using shadcn's theming system)
2. **Dismissible WIP Banner:** Add X button to close the red work-in-progress banner in top left
3. **Improved Copy Button Placement:** Move copy ingredients button to immediately below "Ingredients" header for better accessibility

**How it integrates:**

- Bug fixes require modifications to existing components (Sidebar, RecipeDisplay, SearchBar)
- Dark mode integrates with shadcn/ui's built-in theme provider system
- Banner dismissal adds state management (localStorage persistence)
- Copy button repositioning requires RecipeDisplay component refactoring

**Success criteria:**

- All 5 bugs resolved and verified across multiple mobile devices
- Dark mode toggle functional with smooth theme transitions
- WIP banner can be dismissed and preference persists across sessions
- Copy button accessible on all mobile viewports
- Search returns accurate, expected results
- Print functionality works for multi-page recipes
- No regressions to existing features

## Stories

### Story 4.1: Mobile Sidebar UX Bug Fixes

Fix critical mobile sidebar issues including duplicate close buttons, incomplete vertical fill, and scroll accessibility problems that prevent users from accessing key functionality on mobile devices.

**Addresses bugs:** Duplicate X buttons, sidebar vertical space, scroll accessibility to copy button

### Story 4.2: Print and Search Functionality Fixes

Resolve print pagination issues preventing multi-page recipe printing and fix search algorithm returning incorrect/irrelevant results when filtering recipes.

**Addresses bugs:** Print view single-page limitation, search inconsistency

### Story 4.3: Dark Mode Implementation

Implement dark mode using shadcn/ui theming system with a toggle control in the sidebar. Dark mode should be enabled by default and preference should persist across sessions.

**New feature:** Dark mode with sidebar toggle

### Story 4.4: UI/UX Polish and Refinements

Add dismissible functionality to the WIP banner and improve copy ingredients button accessibility by repositioning it immediately below the Ingredients header.

**New features:** Dismissible WIP banner, improved copy button placement

## Compatibility Requirements

- [x] Existing APIs remain unchanged (no API surface)
- [x] Database schema changes are backward compatible (no database)
- [x] UI changes follow existing shadcn/ui patterns
- [x] Performance impact is minimal (dark mode CSS variables, minor DOM changes)
- [x] Mobile responsiveness maintained across all viewports
- [x] Print functionality enhanced (not broken)

## Risk Mitigation

**Primary Risk:** Dark mode implementation could introduce visual inconsistencies or accessibility issues with color contrast

**Mitigation:**
- Use shadcn/ui's built-in theme provider and CSS variables
- Test color contrast in both modes with automated tools (Lighthouse accessibility audit)
- Verify all components (buttons, cards, inputs) adapt correctly to theme changes
- Maintain WCAG AA compliance in both light and dark modes

**Secondary Risk:** Search algorithm changes could break existing search functionality or degrade performance

**Mitigation:**
- Review fuse.js configuration and search index construction
- Add comprehensive unit tests for search accuracy
- Test search performance with larger recipe datasets
- Maintain search debouncing to prevent performance issues

**Rollback Plan:**
- Each story's changes are isolated to specific components
- Git revert commits for individual stories if issues arise
- Dark mode can be disabled via simple config change if critical issues found
- Search fixes can be rolled back to previous fuse.js configuration

## Definition of Done

- [x] All stories completed with acceptance criteria met
- [x] All 5 bugs verified fixed on multiple mobile devices (iOS Safari, Chrome Android)
- [x] Dark mode toggle functional with theme persistence
- [x] WIP banner dismissal working with localStorage persistence
- [x] Copy button accessible and repositioned correctly
- [x] Search returns accurate results for test queries ("bread", "asian", etc.)
- [x] Print functionality verified for multi-page recipes
- [x] Existing functionality verified through testing (no regressions)
- [x] Integration points working correctly (sidebar, search, print, themes)
- [x] Lighthouse accessibility score maintains 90+ in both light and dark modes
- [x] Manual testing completed across desktop and mobile viewports
- [x] All tests passing (unit and component tests updated)

---

## Validation Checklist

### Scope Validation

- [x] Epic can be completed in 1-4 stories (4 stories planned)
- [x] No architectural documentation is required (follows existing patterns)
- [x] Enhancement follows existing patterns (shadcn/ui, React hooks, Tailwind)
- [x] Integration complexity is manageable (component-level changes)

### Risk Assessment

- [x] Risk to existing system is low (isolated component changes)
- [x] Rollback plan is feasible (git revert per story)
- [x] Testing approach covers existing functionality (regression testing included)
- [x] Team has sufficient knowledge of integration points (existing codebase familiar)

### Completeness Check

- [x] Epic goal is clear and achievable
- [x] Stories are properly scoped (bugs grouped logically, features separated)
- [x] Success criteria are measurable (specific bugs fixed, features functional)
- [x] Dependencies are identified (shadcn theme provider, fuse.js config, component refactoring)

---

## Story Manager Handoff

Please develop detailed user stories for this brownfield epic. Key considerations:

- **This is an enhancement to an existing system running:** Vite + React 18 + TypeScript + shadcn/ui + Tailwind CSS
- **Integration points:**
  - Sidebar component (mobile Sheet overlay, SidebarContext)
  - RecipeDisplay component (markdown rendering, copy ingredients)
  - SearchBar component (fuse.js search algorithm)
  - DevBanner component (WIP banner)
  - Print CSS media queries
  - shadcn/ui theme provider system
- **Existing patterns to follow:**
  - shadcn/ui components for all UI elements
  - React Context for shared state (sidebar, theme preference)
  - localStorage for preference persistence
  - Tailwind CSS for styling
  - TypeScript strict mode
  - Component-based testing with React Testing Library
- **Critical compatibility requirements:**
  - Maintain mobile responsiveness (existing breakpoints at 768px)
  - Preserve existing search functionality while fixing accuracy
  - Ensure print CSS doesn't break desktop/mobile views
  - Dark mode must maintain WCAG AA contrast ratios
  - No breaking changes to component APIs
- **Each story must include:**
  - Verification that existing functionality remains intact
  - Mobile and desktop testing requirements
  - Accessibility testing (especially for dark mode)
  - Unit and component test updates

The epic should maintain system integrity while delivering bug fixes and UX enhancements that improve mobile usability, search accuracy, theming options, and overall polish.
