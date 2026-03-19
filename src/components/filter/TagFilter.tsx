import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract all unique tags from recipes, excluding TEST tags
  const allTags = Array.from(
    new Set(recipes.flatMap(recipe => recipe.tags))
  )
    .filter(tag => tag !== 'TEST')
    .sort();

  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          />
          Filter by Tags
          {selectedTags.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-selected text-white">
              {selectedTags.length}
            </span>
          )}
        </button>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 text-xs"
          >
            Clear
          </Button>
        )}
      </div>
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => {
              const isSelected = selectedTags.includes(tag);
              const isTestTag = tag === 'TEST';
              return (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    isTestTag
                      ? isSelected
                        ? 'bg-red-700 text-white hover:bg-red-800'
                        : 'bg-red-600 text-white hover:bg-red-700'
                      : isSelected
                        ? 'bg-selected text-white hover:bg-selected-hover'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
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
      )}
    </div>
  );
}
