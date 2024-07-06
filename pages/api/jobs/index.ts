import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/utils/dbConnect';
import Job from '@/app/models/Job';
import User from '@/app/models/User';

interface PlanLimits {
  Free: number;
  Basic: number;
  Premium: number;
}

const planLimits: PlanLimits = {
  Free: 1,
  Basic: 5,
  Premium: 10,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const user = await User.findById(req.body.userId); // Assume user ID is sent in the request body
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Ensure jobListingsCount is defined
        const jobListingsCount = user.jobListingsCount ?? 0;

        const maxListings = planLimits[user.subscriptionPlan as keyof PlanLimits];
        if (jobListingsCount >= maxListings) {
          return res.status(403).json({ success: false, message: `Upgrade your plan to post more than ${maxListings} job listings.` });
        }

        const job = await Job.create(req.body);
        user.jobListingsCount = jobListingsCount + 1;
        await user.save();

        res.status(201).json({ success: true, data: job });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        res.status(400).json({ success: false, message: errorMessage });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
};

export default handler;
