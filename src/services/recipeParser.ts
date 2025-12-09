import matter from 'gray-matter';
import type { Recipe, RecipeFrontmatter } from '@/types/recipe';

export function parseRecipeFile(
  fileContent: string,
  filePath: string
): Recipe {
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

  // Generate slug from filename
  const slug = filePath.split('/').pop()!.replace('.md', '');

  return {
    slug,
    title: frontmatter.title || slug.replace(/-/g, ' '),
    tags,
    content,
    filePath,
  };
}
