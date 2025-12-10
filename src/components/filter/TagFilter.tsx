import { RecipeMetadata } from '@/types/recipe';
import { Button } from '@/components/ui/button';

interface TagFilterProps {
  recipes: RecipeMetadata[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearFilters: () => void;
}

export function TagFilter({
  recipes,
  selectedTags,
  onToggleTag,
  onClearFilters,
}: TagFilterProps) {
  // Extract all unique tags from recipes
  const allTags = Array.from(
    new Set(recipes.flatMap(recipe => recipe.tags))
  ).sort();

  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 text-xs"
          >
            Clear filters
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
      {selectedTags.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          Showing recipes with{' '}
          {selectedTags.map((tag, i) => (
            <span key={tag}>
              {i > 0 && ' AND '}
              <span className="font-medium">{tag}</span>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
