import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRecipeSearch } from '@/hooks/useRecipeSearch';
import { SearchableRecipeMetadata } from '@/types/recipe';

const mockRecipes: SearchableRecipeMetadata[] = [
  {
    filename: 'chocolate-chip-cookies.md',
    slug: 'chocolate-chip-cookies',
    title: 'Chocolate Chip Cookies',
    tags: ['dessert', 'baking', 'quick'],
    content: '## Ingredients\n- 2 cups flour\n- 1 cup sugar\n- chocolate chips',
  },
  {
    filename: 'spaghetti-carbonara.md',
    slug: 'spaghetti-carbonara',
    title: 'Spaghetti Carbonara',
    tags: ['pasta', 'dinner', 'italian'],
    content: '## Ingredients\n- 1 lb spaghetti\n- 6 oz pancetta\n- eggs',
  },
  {
    filename: 'greek-salad.md',
    slug: 'greek-salad',
    title: 'Greek Salad',
    tags: ['salad', 'vegetarian', 'healthy'],
    content: '## Ingredients\n- lettuce\n- tomatoes\n- feta cheese',
  },
];

describe('useRecipeSearch Hook', () => {
  it('should return all recipes when search is empty', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    expect(result.current.filteredRecipes).toEqual(mockRecipes);
    expect(result.current.searchQuery).toBe('');
  });

  it('should filter recipes by title', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('chocolate');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Chocolate Chip Cookies'
    );
  });

  it('should filter recipes by tag', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('pasta');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Spaghetti Carbonara'
    );
  });

  it('should filter recipes by content', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('feta');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe('Greek Salad');
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('CHOCOLATE');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Chocolate Chip Cookies'
    );
  });

  it('should handle fuzzy search for typos', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('spagetti'); // typo: missing 'h'
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Spaghetti Carbonara'
    );
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('nonexistent');
    });

    expect(result.current.filteredRecipes).toHaveLength(0);
  });

  it('should return all recipes when search is cleared', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('chocolate');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);

    act(() => {
      result.current.setSearchQuery('');
    });

    expect(result.current.filteredRecipes).toEqual(mockRecipes);
  });

  it('should handle partial matches', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('carbonara');
    });

    expect(result.current.filteredRecipes.length).toBeGreaterThanOrEqual(1);
    const carbonara = result.current.filteredRecipes.find(
      r => r.title === 'Spaghetti Carbonara'
    );
    expect(carbonara).toBeDefined();
  });

  it('should prioritize title matches over content', () => {
    const { result } = renderHook(() => useRecipeSearch(mockRecipes));

    act(() => {
      result.current.setSearchQuery('chocolate');
    });

    // Should find the recipe with "chocolate" in the title
    expect(result.current.filteredRecipes[0].title).toBe(
      'Chocolate Chip Cookies'
    );
  });
});
