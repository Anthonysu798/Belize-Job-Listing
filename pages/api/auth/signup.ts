// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, firstName, lastName, phone, dob, username, gender } = req.body;

  if (!email || !password || !firstName || !lastName || !phone || !dob || !username || !gender) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      dob,
      username,
      gender,
      role: 'user',
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error as Error);
    return res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
