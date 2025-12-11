import { useMemo, useState } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';
import { SearchableRecipeMetadata } from '@/types/recipe';

const fuseOptions: IFuseOptions<SearchableRecipeMetadata> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'content', weight: 0.2 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 3,
};

export function useRecipeFilter(recipes: SearchableRecipeMetadata[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fuse = useMemo(() => new Fuse(recipes, fuseOptions), [recipes]);

  const filteredRecipes = useMemo(() => {
    let results = recipes;

    // Apply search filter first
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      results = searchResults.map(result => result.item);
    }

    // Then apply tag filter (AND logic)
    if (selectedTags.length > 0) {
      results = results.filter(recipe =>
        selectedTags.every(tag => recipe.tags.includes(tag))
      );
    }

    return results;
  }, [searchQuery, selectedTags, fuse, recipes]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearTagFilters = () => {
    setSelectedTags([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearTagFilters,
    filteredRecipes,
  };
}
