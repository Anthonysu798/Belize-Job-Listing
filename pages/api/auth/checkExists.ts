import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  const { field, value } = req.body;

  if (!field || !value) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const query: { [key: string]: string } = {};
    query[field] = value.toLowerCase();

    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error: unknown) {
    console.error('Error checking user:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
  }
}
