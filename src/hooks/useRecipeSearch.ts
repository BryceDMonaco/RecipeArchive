import { useMemo, useState } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';
import { SearchableRecipeMetadata } from '@/types/recipe';

const fuseOptions: IFuseOptions<SearchableRecipeMetadata> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'content', weight: 0.2 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function useRecipeSearch(recipes: SearchableRecipeMetadata[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(
    () => new Fuse(recipes, fuseOptions),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) {
      return recipes;
    }

    const results = fuse.search(searchQuery);
    return results.map(result => result.item);
  }, [searchQuery, fuse, recipes]);

  return {
    searchQuery,
    setSearchQuery,
    filteredRecipes,
  };
}
