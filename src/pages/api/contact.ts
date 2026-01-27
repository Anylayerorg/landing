import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, category, message } = req.body;

    if (!name || !email || !category || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const doc = {
            _type: 'contactSubmission',
            name,
            email,
            category,
            message,
            submittedAt: new Date().toISOString(),
        };

        // Note: The client in '@/sanity/lib/client' uses process.env.SANITY_API_TOKEN.
        // When running on the server (in this API route), it will have access to that environment variable.
        const result = await client.create(doc);

        return res.status(200).json({
            message: 'Your message has been sent.',
            success: true,
            result
        });
    } catch (error: any) {
        console.error('Contact form submission error:', error);
        return res.status(500).json({
            message: 'Failed to send message. Please try again later.',
            success: false,
            error: error.message
        });
    }
}
