import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { RecipeMetadata } from '../src/types/recipe';

export function recipeManifestPlugin(): Plugin {
  const virtualModuleId = 'virtual:recipe-manifest';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'recipe-manifest',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        const recipesDir = path.resolve(__dirname, '../recipes');
        const manifest = generateRecipeManifest(recipesDir);
        return `export default ${JSON.stringify(manifest, null, 2)}`;
      }
    },

    handleHotUpdate({ file, server }) {
      // Reload manifest when recipe files change
      if (file.includes('/recipes/') && file.endsWith('.md')) {
        const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      }
    },
  };
}

interface SearchableRecipeMetadata extends RecipeMetadata {
  content: string;
}

function generateRecipeManifest(recipesDir: string): SearchableRecipeMetadata[] {
  if (!fs.existsSync(recipesDir)) {
    console.warn(`Recipes directory not found: ${recipesDir}`);
    return [];
  }

  const files = fs.readdirSync(recipesDir);
  const recipeFiles = files.filter(file => file.endsWith('.md'));

  const manifest: SearchableRecipeMetadata[] = recipeFiles.map(filename => {
    const filePath = path.join(recipesDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    // Extract slug from filename
    const slug = filename.replace('.md', '');

    // Parse tags (handle both string and array formats)
    let tags: string[] = [];
    if (typeof data.tags === 'string') {
      tags = data.tags.split(',').map(tag => tag.trim());
    } else if (Array.isArray(data.tags)) {
      tags = data.tags;
    }

    return {
      filename,
      slug,
      title: data.title || slug,
      tags,
      content: content.trim(),
    };
  });

  // Sort alphabetically by title
  manifest.sort((a, b) => a.title.localeCompare(b.title));

  return manifest;
}
