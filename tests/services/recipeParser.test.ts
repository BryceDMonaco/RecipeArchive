import { describe, it, expect } from 'vitest';
import { parseRecipeFile } from '@/services/recipeParser';

describe('recipeParser', () => {
  it('extracts title and tags from frontmatter', () => {
    const markdown = `---
title: Test Recipe
tags: tag1, tag2, tag3
---
# Content`;

    const result = parseRecipeFile(markdown, 'test-recipe.md');

    expect(result.title).toBe('Test Recipe');
    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(result.slug).toBe('test-recipe');
    expect(result.content).toBe('# Content');
  });

  it('handles tags as array', () => {
    const markdown = `---
title: Test Recipe
tags:
  - dessert
  - baking
  - quick
---
Content here`;

    const result = parseRecipeFile(markdown, 'test.md');

    expect(result.tags).toEqual(['dessert', 'baking', 'quick']);
  });

  it('handles tags as comma-separated string', () => {
    const markdown = `---
title: Test Recipe
tags: dessert, baking, quick
---
Content`;

    const result = parseRecipeFile(markdown, 'test.md');

    expect(result.tags).toEqual(['dessert', 'baking', 'quick']);
  });

  it('trims whitespace from tags', () => {
    const markdown = `---
title: Test Recipe
tags:  dessert ,  baking  , quick
---
Content`;

    const result = parseRecipeFile(markdown, 'test.md');

    expect(result.tags).toEqual(['dessert', 'baking', 'quick']);
  });

  it('handles missing frontmatter with filename as title', () => {
    const markdown = 'Just content, no frontmatter';

    const result = parseRecipeFile(markdown, 'chocolate-chip-cookies.md');

    expect(result.title).toBe('chocolate chip cookies');
    expect(result.tags).toEqual([]);
    expect(result.slug).toBe('chocolate-chip-cookies');
  });

  it('handles missing tags field', () => {
    const markdown = `---
title: Test Recipe
---
Content`;

    const result = parseRecipeFile(markdown, 'test.md');

    expect(result.tags).toEqual([]);
  });

  it('handles missing title field', () => {
    const markdown = `---
tags: tag1, tag2
---
Content`;

    const result = parseRecipeFile(markdown, 'my-recipe.md');

    expect(result.title).toBe('my recipe');
  });

  it('generates slug from full file path', () => {
    const markdown = `---
title: Test Recipe
---
Content`;

    const result = parseRecipeFile(markdown, 'recipes/subfolder/test-recipe.md');

    expect(result.slug).toBe('test-recipe');
    expect(result.filePath).toBe('recipes/subfolder/test-recipe.md');
  });

  it('handles empty tags string', () => {
    const markdown = `---
title: Test Recipe
tags: ""
---
Content`;

    const result = parseRecipeFile(markdown, 'test.md');

    expect(result.tags).toEqual([]);
  });

  it('filters out empty tags from comma-separated list', () => {
    const markdown = `---
title: Test Recipe
tags: tag1, , tag2,  , tag3
---
Content`;

    const result = parseRecipeFile(markdown, 'test.md');

    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3']);
  });
});
