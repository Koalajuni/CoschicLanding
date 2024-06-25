import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        try {
            const response = await fetch('http://211.216.177.2:18000/api/v1/send_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, subject, message }),
            });

            if (response.ok) {
                res.status(200).json({ message: 'Email sent successfully' });
            } else {
                const errorData = await response.json();
                res.status(response.status).json({ message: 'Failed to send email', error: errorData });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
