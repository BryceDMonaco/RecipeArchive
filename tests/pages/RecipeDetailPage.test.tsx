import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RecipeDetailPage from '@/pages/RecipeDetailPage';

// Mock the dynamic import for recipes
vi.mock('../../recipes/chocolate-chip-cookies.md?raw', () => ({
  default: `---
title: Chocolate Chip Cookies
tags: dessert, baking
---

## Ingredients
- 2 cups flour
- 1 cup sugar

## Instructions
1. Mix ingredients
2. Bake at 350°F`,
}));

describe('RecipeDetailPage Component', () => {
  it('should show loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/recipe/chocolate-chip-cookies']}>
        <Routes>
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display recipe content after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/chocolate-chip-cookies']}>
        <Routes>
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(
          screen.getByText('Chocolate Chip Cookies')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should show error for non-existent recipe', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/non-existent']}>
        <Routes>
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Recipe "non-existent" not found/i)
      ).toBeInTheDocument();
    });
  });

  it('should show error when no recipe slug provided', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/']}>
        <Routes>
          <Route path="/recipe/:recipeSlug?" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No recipe specified/i)).toBeInTheDocument();
    });
  });
});
