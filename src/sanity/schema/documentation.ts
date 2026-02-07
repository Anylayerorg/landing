export default {
    name: 'documentation',
    title: 'Documentation',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'date',
            options: {
                dateFormat: 'MMM YYYY',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                    ],
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
                {
                    type: 'code',
                    title: 'Code Block',
                    options: {
                        withLineNumbers: true,
                    },
                },
                {
                    type: 'table',
                    title: 'Table',
                },
            ],
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
            initialValue: 0,
        },
    ],
    orderings: [
        {
            title: 'Manual Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
};
