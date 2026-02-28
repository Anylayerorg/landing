import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { definePlugin } from 'sanity';
import post from './schema/post';
import author from './schema/author';
import category from './schema/category';
import subscriber from './schema/subscriber';
import event from './schema/event';
import contactSubmission from './schema/contactSubmission';
import documentation from './schema/documentation';
import airdropSubmission from './schema/airdropSubmission';
import { structure } from './lib/structure';
import { ApproveAction, RejectAction } from './actions/approveRejectAction';
import { BatchApproveTool } from './tools/BatchApproveTool';

const batchApprovePlugin = definePlugin({
  name: 'batch-approve',
  tools: [
    {
      name: 'batch-approve',
      title: 'Batch Review',
      component: BatchApproveTool,
    },
  ],
});

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wuo60cqr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Anylayer Content Studio v2',
  schema: {
    types: [event, post, author, category, subscriber, contactSubmission, documentation, airdropSubmission],
  },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    codeInput(),
    table(),
    batchApprovePlugin(),
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType !== 'airdropSubmission') return prev;
      return [ApproveAction, RejectAction, ...prev.filter((a) => a.action === 'delete')];
    },
  },
});
