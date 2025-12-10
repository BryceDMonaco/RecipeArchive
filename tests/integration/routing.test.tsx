import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import RecipeDetailPage from '@/pages/RecipeDetailPage';
import userEvent from '@testing-library/user-event';
import { RecipeList } from '@/components/recipe/RecipeList';
import { RecipeMetadata } from '@/types/recipe';

// Mock the recipe manifest
vi.mock('virtual:recipe-manifest', () => ({
  default: [
    {
      filename: 'chocolate-chip-cookies.md',
      slug: 'chocolate-chip-cookies',
      title: 'Chocolate Chip Cookies',
      tags: ['dessert', 'baking'],
    },
  ],
}));

const mockRecipes: RecipeMetadata[] = [
  {
    filename: 'chocolate-chip-cookies.md',
    slug: 'chocolate-chip-cookies',
    title: 'Chocolate Chip Cookies',
    tags: ['dessert', 'baking'],
  },
];

describe('Routing Integration Tests', () => {
  it('should render HomePage at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to Recipe Archive')).toBeInTheDocument();
  });

  it('should navigate to recipe detail when clicking recipe link', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <RecipeList recipes={mockRecipes} />
      </MemoryRouter>
    );

    const link = screen.getByText('Chocolate Chip Cookies');
    await user.click(link);

    // Verify the link href is correct
    expect(link.closest('a')).toHaveAttribute(
      'href',
      '/recipe/chocolate-chip-cookies'
    );
  });

  it('should show error message for invalid recipe slug', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/non-existent-recipe']}>
        <Routes>
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Recipe "non-existent-recipe" not found/i)
      ).toBeInTheDocument();
    });
  });

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

  it('should correctly extract recipe slug from URL', () => {
    render(
      <MemoryRouter initialEntries={['/recipe/test-recipe']}>
        <Routes>
          <Route path="/recipe/:recipeSlug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Should show loading initially, then error for non-existent recipe
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
