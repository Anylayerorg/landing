import { StructureBuilder } from 'sanity/structure';
import { Mail, Users, Code, Newspaper, Calendar, Gift } from 'lucide-react';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Anylayer Content')
    .items([
      // Airdrop Reviews Section
      S.listItem()
        .title('Airdrop Reviews')
        .icon(Gift)
        .child(
          S.list()
            .title('Airdrop Reviews')
            .items([
              S.listItem()
                .title('⏳ Pending Review')
                .child(
                  S.documentList()
                    .title('Pending Review')
                    .filter('_type == "airdropSubmission" && status == "pending"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('✅ Approved')
                .child(
                  S.documentList()
                    .title('Approved')
                    .filter('_type == "airdropSubmission" && status == "approved"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('❌ Rejected')
                .child(
                  S.documentList()
                    .title('Rejected')
                    .filter('_type == "airdropSubmission" && status == "rejected"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                ),
              S.divider(),
              S.listItem()
                .title('All Submissions')
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

      // Filter out types that we've already defined custom items for
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'author', 'category', 'subscriber', 'protocolEvent', 'airdropSubmission'].includes(listItem.getId() || '')
      ),
    ]);
