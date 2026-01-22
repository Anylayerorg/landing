export default {
    name: 'event',
    title: 'Protocol Event',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Event Title',
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
            name: 'eventDate',
            title: 'Event Date & Time',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'e.g., "Online", "Dubai, UAE", "Remote"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'rsvpLink',
            title: 'RSVP / Registration Link',
            type: 'url',
            description: 'Link to Luma, Eventbrite, or Zoom',
        },
        {
            name: 'mainImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'excerpt',
            title: 'Short Summary',
            type: 'text',
            rows: 3,
            description: 'Brief overview for the card display',
            validation: (Rule: any) => Rule.max(200),
        },
        {
            name: 'body',
            title: 'Event Details',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
            ],
        },
        {
            name: 'featured',
            title: 'Featured Event',
            type: 'boolean',
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: 'title',
            date: 'eventDate',
            media: 'mainImage',
        },
        prepare(selection: any) {
            const { title, date, media } = selection;
            return {
                title: title,
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
                media: media,
            }
        }
    }
};
