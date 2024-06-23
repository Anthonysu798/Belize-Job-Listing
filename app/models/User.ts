import mongoose, { Schema, Document } from 'mongoose';

enum SubscriptionPlan {
  Free = 'Free',
  Basic = 'Basic',
  Premium = 'Premium',
}

interface IUser extends Document {
  email: string;
  password: string;
  role: 'user' | 'admin';
  subscriptionPlan: SubscriptionPlan;
  jobListingsCount: number;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  subscriptionPlan: { type: String, enum: Object.values(SubscriptionPlan), default: SubscriptionPlan.Free },
  jobListingsCount: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
