import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  await dbConnect();

  const user = await User.findOne({ email });

  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
}
