import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRecipeFilter } from '@/hooks/useRecipeFilter';
import { SearchableRecipeMetadata } from '@/types/recipe';

const mockRecipes: SearchableRecipeMetadata[] = [
  {
    filename: 'chocolate-chip-cookies.md',
    slug: 'chocolate-chip-cookies',
    title: 'Chocolate Chip Cookies',
    tags: ['dessert', 'baking', 'quick'],
    content: '## Ingredients\n- flour\n- sugar\n- chocolate chips',
  },
  {
    filename: 'spaghetti-carbonara.md',
    slug: 'spaghetti-carbonara',
    title: 'Spaghetti Carbonara',
    tags: ['pasta', 'dinner', 'italian', 'quick'],
    content: '## Ingredients\n- spaghetti\n- eggs\n- pancetta',
  },
  {
    filename: 'greek-salad.md',
    slug: 'greek-salad',
    title: 'Greek Salad',
    tags: ['salad', 'vegetarian', 'healthy'],
    content: '## Ingredients\n- lettuce\n- tomatoes\n- feta cheese',
  },
];

describe('useRecipeFilter Hook', () => {
  it('should return all recipes initially', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    expect(result.current.filteredRecipes).toEqual(mockRecipes);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedTags).toEqual([]);
  });

  it('should filter by search query', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.setSearchQuery('chocolate');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Chocolate Chip Cookies'
    );
  });

  it('should filter by single tag', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.toggleTag('dessert');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Chocolate Chip Cookies'
    );
  });

  it('should filter by multiple tags with AND logic', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.toggleTag('pasta');
      result.current.toggleTag('quick');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Spaghetti Carbonara'
    );
  });

  it('should combine search and tag filters', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.setSearchQuery('quick');
      result.current.toggleTag('dessert');
    });

    // Search for "quick" returns cookies and carbonara
    // Then filter by "dessert" tag leaves only cookies
    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe(
      'Chocolate Chip Cookies'
    );
  });

  it('should toggle tag selection on and off', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    // Select tag
    act(() => {
      result.current.toggleTag('dessert');
    });

    expect(result.current.selectedTags).toContain('dessert');

    // Deselect tag
    act(() => {
      result.current.toggleTag('dessert');
    });

    expect(result.current.selectedTags).not.toContain('dessert');
  });

  it('should clear all tag filters', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.toggleTag('dessert');
      result.current.toggleTag('baking');
    });

    expect(result.current.selectedTags).toHaveLength(2);

    act(() => {
      result.current.clearTagFilters();
    });

    expect(result.current.selectedTags).toHaveLength(0);
    expect(result.current.filteredRecipes).toEqual(mockRecipes);
  });

  it('should return empty array when filters match no recipes', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.toggleTag('dessert');
      result.current.toggleTag('italian'); // No recipe has both
    });

    expect(result.current.filteredRecipes).toHaveLength(0);
  });

  it('should apply tag filter to search results', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    // First search, then filter
    act(() => {
      result.current.setSearchQuery('salad');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);

    act(() => {
      result.current.toggleTag('vegetarian');
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].title).toBe('Greek Salad');
  });

  it('should maintain search when adding tags', () => {
    const { result } = renderHook(() => useRecipeFilter(mockRecipes));

    act(() => {
      result.current.setSearchQuery('quick');
    });

    const searchResultsCount = result.current.filteredRecipes.length;

    act(() => {
      result.current.toggleTag('dessert');
    });

    expect(result.current.searchQuery).toBe('quick');
    expect(result.current.filteredRecipes.length).toBeLessThanOrEqual(
      searchResultsCount
    );
  });
});
