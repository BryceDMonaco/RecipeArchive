import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeList } from '@/components/recipe/RecipeList';
import { RecipeMetadata } from '@/types/recipe';

const mockRecipes: RecipeMetadata[] = [
  {
    filename: 'chocolate-chip-cookies.md',
    slug: 'chocolate-chip-cookies',
    title: 'Chocolate Chip Cookies',
    tags: ['dessert', 'baking', 'quick'],
  },
  {
    filename: 'spaghetti-carbonara.md',
    slug: 'spaghetti-carbonara',
    title: 'Spaghetti Carbonara',
    tags: ['pasta', 'dinner', 'italian'],
  },
  {
    filename: 'greek-salad.md',
    slug: 'greek-salad',
    title: 'Greek Salad',
    tags: ['salad', 'vegetarian', 'healthy'],
  },
];

describe('RecipeList Component', () => {
  it('should render all recipe titles', () => {
    render(<RecipeList recipes={mockRecipes} />);

    expect(screen.getByText('Chocolate Chip Cookies')).toBeInTheDocument();
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Greek Salad')).toBeInTheDocument();
  });

  it('should render correct number of recipe items', () => {
    const { container } = render(<RecipeList recipes={mockRecipes} />);

    // Each recipe has a title
    const recipeTitles = container.querySelectorAll('h3');
    expect(recipeTitles.length).toBe(3);
  });

  it('should display recipe tags', () => {
    render(<RecipeList recipes={mockRecipes} />);

    expect(screen.getByText('dessert')).toBeInTheDocument();
    expect(screen.getByText('baking')).toBeInTheDocument();
    expect(screen.getByText('pasta')).toBeInTheDocument();
    expect(screen.getByText('italian')).toBeInTheDocument();
  });

  it('should show "No recipes found" message when list is empty', () => {
    render(<RecipeList recipes={[]} />);

    expect(screen.getByText('No recipes found')).toBeInTheDocument();
  });

  it('should render recipe without tags gracefully', () => {
    const recipesWithoutTags: RecipeMetadata[] = [
      {
        filename: 'test.md',
        slug: 'test',
        title: 'Test Recipe',
        tags: [],
      },
    ];

    render(<RecipeList recipes={recipesWithoutTags} />);

    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  });

  it('should apply hover styling classes', () => {
    const { container } = render(<RecipeList recipes={mockRecipes} />);

    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
