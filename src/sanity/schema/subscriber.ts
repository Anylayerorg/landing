export default {
  name: 'subscriber',
  title: 'Subscribers & Waitlists',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'type',
      title: 'Subscription Type',
      type: 'string',
      options: {
        list: [
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Attester Waitlist', value: 'attester' },
          { title: 'Developer Waitlist', value: 'developer' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'organization',
      title: 'Organization (Optional)',
      type: 'string',
    }
  ],
}
