export default {
    name: 'contactSubmission',
    title: 'Contact Submissions',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule: any) => Rule.required().email(),
        },
        {
            name: 'category',
            title: 'Inquiry Category',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'message',
            title: 'Message Content',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
        }
    }
}
