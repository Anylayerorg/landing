import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import post from './schema/post';
import author from './schema/author';
import category from './schema/category';
import subscriber from './schema/subscriber';
import event from './schema/event';
import contactSubmission from './schema/contactSubmission';
import documentation from './schema/documentation';
import { structure } from './lib/structure';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wuo60cqr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Anylayer Content Studio v2',
  schema: {
    types: [event, post, author, category, subscriber, contactSubmission, documentation],
  },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    codeInput(),
  ],
});
