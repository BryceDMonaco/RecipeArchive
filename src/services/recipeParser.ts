import matter from 'gray-matter';
import type { Recipe, RecipeFrontmatter } from '@/types/recipe';
import logger from '@/utils/logger';

/**
 * Generate title from filename by converting kebab-case to Title Case
 */
function filenameToTitle(filename: string): string {
  return filename
    .replace('.md', '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function parseRecipeFile(
  fileContent: string,
  filePath: string
): Recipe {
  // Generate slug from filename
  const filename = filePath.split('/').pop()!;
  const slug = filename.replace('.md', '');

  try {
    const { data, content } = matter(fileContent);
    const frontmatter = data as RecipeFrontmatter;

    // Parse tags (handle both string and array)
    let tags: string[] = [];
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags;
    } else if (typeof frontmatter.tags === 'string') {
      tags = frontmatter.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    return {
      slug,
      title: frontmatter.title || filenameToTitle(filename),
      tags,
      content,
      filePath,
    };
  } catch (error) {
    // If frontmatter parsing fails, return recipe with fallback values
    logger.warn(`Failed to parse frontmatter for ${filePath}:`, error);

    return {
      slug,
      title: filenameToTitle(filename),
      tags: [],
      content: fileContent, // Use raw content as fallback
      filePath,
    };
  }
}
