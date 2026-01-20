import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, type, organization } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const doc = {
            _type: 'subscriber',
            email,
            type: type || 'newsletter',
            subscribedAt: new Date().toISOString(),
            ...(organization && { organization }),
        };

        // Note: The client in '@/sanity/lib/client' uses process.env.SANITY_API_TOKEN.
        // When running on the server (in this API route), it will have access to that environment variable.
        const result = await client.create(doc);

        return res.status(200).json({ message: 'Successfully subscribed', result });
    } catch (error: any) {
        console.error('Sanity creation error:', error);
        return res.status(error.statusCode || 500).json({
            message: 'Failed to subscribe',
            error: error.message
        });
    }
}
