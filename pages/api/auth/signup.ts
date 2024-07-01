import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/utils/dbConnect';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  const { email, password, firstName, lastName, phone, dob, gender } = req.body;

  if (!email || !password || !firstName || !lastName || !phone || !dob || !gender) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const existingUserByEmail = await User.findOne({ email: normalizedEmail });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const existingUserByPhone = await User.findOne({ phone });
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'User already exists with this phone number' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: normalizedEmail,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      dob,
      gender,
      role: 'user',
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
  }
}
