import mongoose, { Schema, Document, Model } from 'mongoose';

enum SubscriptionPlan {
  Free = 'Free',
  Basic = 'Basic',
  Premium = 'Premium',
}

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: Date;
  username: string;
  gender: 'male' | 'female';
  role: 'user' | 'admin';
  subscriptionPlan: SubscriptionPlan;
  jobListingsCount: number;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  role: { type: String, enum: ['user', 'admin'], required: true, default: 'user' },
  subscriptionPlan: { type: String, enum: Object.values(SubscriptionPlan), default: SubscriptionPlan.Free },
  jobListingsCount: { type: Number, default: 0 },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
