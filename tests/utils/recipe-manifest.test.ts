import { describe, it, expect } from 'vitest';
import recipeManifest from 'virtual:recipe-manifest';
import { RecipeMetadata } from '@/types/recipe';

describe('Recipe Manifest Generation', () => {
  it('should load recipe manifest', () => {
    expect(recipeManifest).toBeDefined();
    expect(Array.isArray(recipeManifest)).toBe(true);
  });

  it('should have at least 5 sample recipes', () => {
    expect(recipeManifest.length).toBeGreaterThanOrEqual(5);
  });

  it('should extract metadata from all recipes', () => {
    recipeManifest.forEach((recipe: RecipeMetadata) => {
      expect(recipe).toHaveProperty('filename');
      expect(recipe).toHaveProperty('slug');
      expect(recipe).toHaveProperty('title');
      expect(recipe).toHaveProperty('tags');
      expect(typeof recipe.filename).toBe('string');
      expect(typeof recipe.slug).toBe('string');
      expect(typeof recipe.title).toBe('string');
      expect(Array.isArray(recipe.tags)).toBe(true);
    });
  });

  it('should correctly parse tags from comma-separated string', () => {
    const cookieRecipe = recipeManifest.find(r => r.slug === 'chocolate-chip-cookies');
    expect(cookieRecipe).toBeDefined();
    if (cookieRecipe) {
      expect(cookieRecipe.tags).toContain('dessert');
      expect(cookieRecipe.tags).toContain('baking');
      expect(cookieRecipe.tags).toContain('quick');
      expect(cookieRecipe.tags).toContain('vegetarian');
    }
  });

  it('should generate correct slug from filename', () => {
    const carbonaraRecipe = recipeManifest.find(r => r.filename === 'spaghetti-carbonara.md');
    expect(carbonaraRecipe).toBeDefined();
    if (carbonaraRecipe) {
      expect(carbonaraRecipe.slug).toBe('spaghetti-carbonara');
    }
  });

  it('should extract title from frontmatter', () => {
    const salad = recipeManifest.find(r => r.slug === 'greek-salad');
    expect(salad).toBeDefined();
    if (salad) {
      expect(salad.title).toBe('Greek Salad');
    }
  });

  it('should sort recipes alphabetically by title', () => {
    for (let i = 0; i < recipeManifest.length - 1; i++) {
      const current = recipeManifest[i].title;
      const next = recipeManifest[i + 1].title;
      expect(current.localeCompare(next)).toBeLessThanOrEqual(0);
    }
  });
});
