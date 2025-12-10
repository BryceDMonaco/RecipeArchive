import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagFilter } from '@/components/filter/TagFilter';
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
    tags: ['salad', 'vegetarian', 'healthy', 'quick'],
  },
];

describe('TagFilter Component', () => {
  it('should render all unique tags', () => {
    render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={[]}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    expect(screen.getByText('dessert')).toBeInTheDocument();
    expect(screen.getByText('baking')).toBeInTheDocument();
    expect(screen.getByText('pasta')).toBeInTheDocument();
    expect(screen.getByText('vegetarian')).toBeInTheDocument();
  });

  it('should render tags alphabetically', () => {
    const { container } = render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={[]}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    const tagButtons = Array.from(
      container.querySelectorAll('button:not([class*="Clear"])')
    );
    const tagTexts = tagButtons.map(btn => btn.textContent);

    // Check that tags are in alphabetical order
    const sortedTags = [...tagTexts].sort();
    expect(tagTexts).toEqual(sortedTags);
  });

  it('should highlight selected tags', () => {
    const { container } = render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={['dessert', 'quick']}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    // Get all tag buttons (first set of elements with these texts)
    const tagButtons = container.querySelectorAll('button[class*="px-3"]');
    const dessertButton = Array.from(tagButtons).find(
      btn => btn.textContent === 'dessert'
    );
    const quickButton = Array.from(tagButtons).find(
      btn => btn.textContent === 'quick'
    );
    const pastaButton = Array.from(tagButtons).find(
      btn => btn.textContent === 'pasta'
    );

    expect(dessertButton?.className).toContain('bg-blue-500');
    expect(quickButton?.className).toContain('bg-blue-500');
    expect(pastaButton?.className).toContain('bg-gray-100');
  });

  it('should call onToggleTag when clicking a tag', async () => {
    const user = userEvent.setup();
    const handleToggleTag = vi.fn();

    render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={[]}
        onToggleTag={handleToggleTag}
        onClearFilters={() => {}}
      />
    );

    const dessertButton = screen.getByText('dessert');
    await user.click(dessertButton);

    expect(handleToggleTag).toHaveBeenCalledWith('dessert');
  });

  it('should show clear filters button when tags are selected', () => {
    render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={['dessert']}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });

  it('should not show clear filters button when no tags selected', () => {
    render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={[]}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
  });

  it('should call onClearFilters when clicking clear button', async () => {
    const user = userEvent.setup();
    const handleClearFilters = vi.fn();

    render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={['dessert', 'baking']}
        onToggleTag={() => {}}
        onClearFilters={handleClearFilters}
      />
    );

    const clearButton = screen.getByText('Clear filters');
    await user.click(clearButton);

    expect(handleClearFilters).toHaveBeenCalled();
  });

  it('should show AND logic description when multiple tags selected', () => {
    render(
      <TagFilter
        recipes={mockRecipes}
        selectedTags={['dessert', 'quick']}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    const description = screen.getByText(/Showing recipes with/);
    expect(description).toBeInTheDocument();
    expect(description.textContent).toContain('dessert');
    expect(description.textContent).toContain('AND');
    expect(description.textContent).toContain('quick');
  });

  it('should render nothing when no recipes provided', () => {
    const { container } = render(
      <TagFilter
        recipes={[]}
        selectedTags={[]}
        onToggleTag={() => {}}
        onClearFilters={() => {}}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
