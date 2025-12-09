import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeDisplay } from '@/components/recipe/RecipeDisplay';
import type { Recipe } from '@/types/recipe';

describe('RecipeDisplay', () => {
  it('renders recipe title', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: 'Recipe content',
      filePath: 'test.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    expect(
      screen.getByRole('heading', { name: 'Test Recipe' })
    ).toBeInTheDocument();
  });

  it('renders markdown headings', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: '## Ingredients\n\n## Instructions',
      filePath: 'test.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    expect(
      screen.getByRole('heading', { name: 'Ingredients' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Instructions' })
    ).toBeInTheDocument();
  });

  it('renders bulleted lists', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: '## Ingredients\n\n- Item 1\n- Item 2\n- Item 3',
      filePath: 'test.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders numbered lists', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: '## Instructions\n\n1. Step one\n2. Step two\n3. Step three',
      filePath: 'test.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    expect(screen.getByText('Step one')).toBeInTheDocument();
    expect(screen.getByText('Step two')).toBeInTheDocument();
    expect(screen.getByText('Step three')).toBeInTheDocument();
  });

  it('renders bold text', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: 'This is **bold text**',
      filePath: 'test.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    const boldElement = screen.getByText('bold text');
    expect(boldElement.tagName).toBe('STRONG');
  });

  it('renders italic text', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: 'This is *italic text*',
      filePath: 'test.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    const italicElement = screen.getByText('italic text');
    expect(italicElement.tagName).toBe('EM');
  });

  it('renders complete recipe with multiple sections', () => {
    const recipe: Recipe = {
      slug: 'cookies',
      title: 'Chocolate Chip Cookies',
      tags: ['dessert', 'baking'],
      content: `## Ingredients

- 2 cups flour
- 1 cup sugar
- 2 eggs

## Instructions

1. Preheat oven
2. Mix ingredients
3. Bake for 10 minutes

## Notes

Store in an **airtight container**.`,
      filePath: 'cookies.md',
    };

    render(<RecipeDisplay recipe={recipe} />);

    expect(
      screen.getByRole('heading', { name: 'Chocolate Chip Cookies' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Ingredients' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Instructions' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Notes' })).toBeInTheDocument();
    expect(screen.getByText('2 cups flour')).toBeInTheDocument();
    expect(screen.getByText('Preheat oven')).toBeInTheDocument();
    expect(screen.getByText('airtight container')).toBeInTheDocument();
  });

  it('applies typography styles', () => {
    const recipe: Recipe = {
      slug: 'test',
      title: 'Test Recipe',
      tags: [],
      content: 'Content',
      filePath: 'test.md',
    };

    const { container } = render(<RecipeDisplay recipe={recipe} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('prose');
    expect(article).toHaveClass('prose-zinc');
  });
});
