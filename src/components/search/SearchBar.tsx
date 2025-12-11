import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search recipes...',
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 px-3 py-2 border rounded-md transition-colors ${
          isFocused
            ? 'border-blue-400 ring-1 ring-blue-400 dark:border-blue-500 dark:ring-blue-500'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        {value && (
          <button
            onClick={handleClear}
            className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}
