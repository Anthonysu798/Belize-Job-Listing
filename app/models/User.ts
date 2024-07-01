import mongoose, { Schema, Document, Model } from 'mongoose';

enum SubscriptionPlan {
  Free = 'Free',
  Basic = 'Basic',
  Premium = 'Premium',
}

interface IUser extends Document {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dob?: Date;
  gender?: 'male' | 'female';
  role: 'user' | 'admin';
  subscriptionPlan?: SubscriptionPlan;
  jobListingsCount?: number;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String, unique: true },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female'] },
  role: { type: String, enum: ['user', 'admin'], required: true, default: 'user' },
  subscriptionPlan: { type: String, enum: Object.values(SubscriptionPlan), default: SubscriptionPlan.Free },
  jobListingsCount: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
