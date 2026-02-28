import { StructureBuilder } from 'sanity/structure';
import { Mail, Users, Code, Newspaper, Calendar, Gift } from 'lucide-react';

const taskSection = (S: StructureBuilder, taskId: string, taskTitle: string, emoji: string) =>
  S.listItem()
    .id(taskId)
    .title(`${emoji} ${taskTitle}`)
    .child(
      S.list()
        .id(`${taskId}-list`)
        .title(taskTitle)
        .items([
          S.listItem()
            .id(`${taskId}-pending`)
            .title('⏳ Pending')
            .child(
              S.documentList()
                .id(`${taskId}-pending-list`)
                .title(`${taskTitle} — Pending`)
                .filter(`_type == "airdropSubmission" && taskId == "${taskId}" && status == "pending"`)
                .defaultOrdering([{ field: 'submittedAt', direction: 'asc' }])
            ),
          S.listItem()
            .id(`${taskId}-approved`)
            .title('✅ Approved')
            .child(
              S.documentList()
                .id(`${taskId}-approved-list`)
                .title(`${taskTitle} — Approved`)
                .filter(`_type == "airdropSubmission" && taskId == "${taskId}" && status == "approved"`)
                .defaultOrdering([{ field: 'submittedAt', direction: 'asc' }])
            ),
          S.listItem()
            .id(`${taskId}-rejected`)
            .title('❌ Rejected')
            .child(
              S.documentList()
                .id(`${taskId}-rejected-list`)
                .title(`${taskTitle} — Rejected`)
                .filter(`_type == "airdropSubmission" && taskId == "${taskId}" && status == "rejected"`)
                .defaultOrdering([{ field: 'submittedAt', direction: 'asc' }])
            ),
        ])
    );

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Anylayer Content')
    .items([
      // ── Airdrop Reviews — per-task categories ─────────────────────────
      S.listItem()
        .title('Airdrop Reviews')
        .icon(Gift)
        .child(
          S.list()
            .id('airdrop-reviews-root')
            .title('Airdrop Reviews')
            .items([
              // Per-task sections
              taskSection(S, 'make_post',       'Make a Post About ANS', '📝'),
              taskSection(S, 'retweet_post',    'Retweet a Post',        '🔁'),
              taskSection(S, 'comment_on_post', 'Comment on a Post',     '💬'),
              taskSection(S, 'add_discord_tag', 'Add Discord Tag',       '🏷️'),

              S.divider(),

              // Cross-task views
              S.listItem()
                .id('all-pending')
                .title('⏳ All Pending')
                .child(
                  S.documentList()
                    .id('all-pending-list')
                    .title('All Pending')
                    .filter('_type == "airdropSubmission" && status == "pending"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'asc' }])
                ),
              S.listItem()
                .id('all-approved')
                .title('✅ All Approved')
                .child(
                  S.documentList()
                    .id('all-approved-list')
                    .title('All Approved')
                    .filter('_type == "airdropSubmission" && status == "approved"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'asc' }])
                ),
              S.listItem()
                .id('all-rejected')
                .title('❌ All Rejected')
                .child(
                  S.documentList()
                    .id('all-rejected-list')
                    .title('All Rejected')
                    .filter('_type == "airdropSubmission" && status == "rejected"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'asc' }])
                ),

              S.divider(),

              S.listItem()
                .id('all-submissions')
                .title('📋 All Submissions')
                .child(
                  S.documentTypeList('airdropSubmission').title('All Submissions')
                ),
            ])
        ),

      S.divider(),

      // Protocol Events Section
      S.listItem()
        .title('Protocol Events')
        .icon(Calendar)
        .child(S.documentTypeList('protocolEvent').title('Protocol Events')),

      S.divider(),

      // Blog Section
      S.listItem()
        .title('Blog Posts')
        .icon(Newspaper)
        .child(S.documentTypeList('post').title('All Posts')),
      S.listItem()
        .title('Authors')
        .icon(Users)
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),

      S.divider(),

      // Waitlists Section
      S.listItem()
        .title('Waitlists & Subscribers')
        .icon(Mail)
        .child(
          S.list()
            .title('Select List')
            .items([
              S.listItem()
                .title('All Subscribers')
                .child(S.documentTypeList('subscriber').title('All')),
              S.divider(),
              S.listItem()
                .title('Newsletter List')
                .icon(Newspaper)
                .child(
                  S.documentList()
                    .title('Newsletter Subscribers')
                    .filter('_type == "subscriber" && type == "newsletter"')
                ),
              S.listItem()
                .title('Attester Waitlist')
                .icon(Users)
                .child(
                  S.documentList()
                    .title('Attester Waitlist')
                    .filter('_type == "subscriber" && type == "attester"')
                ),
              S.listItem()
                .title('Developer Waitlist')
                .icon(Code)
                .child(
                  S.documentList()
                    .title('Developer Waitlist')
                    .filter('_type == "subscriber" && type == "developer"')
                ),
            ])
        ),

      // Remaining types not explicitly handled
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'author', 'category', 'subscriber', 'protocolEvent', 'airdropSubmission'].includes(
            listItem.getId() || ''
          )
      ),
    ]);
