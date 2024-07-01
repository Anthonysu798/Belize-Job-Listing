import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  await dbConnect();

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(200).json({ exists: false });
  }

  return res.status(200).json({ exists: true });
}
