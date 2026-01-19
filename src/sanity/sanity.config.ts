import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import post from './schema/post';
import author from './schema/author';
import category from './schema/category';
import subscriber from './schema/subscriber';
import { structure } from './lib/structure';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wuo60cqr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Anylayer Content Studio',
  schema: {
    types: [post, author, category, subscriber],
  },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
});
