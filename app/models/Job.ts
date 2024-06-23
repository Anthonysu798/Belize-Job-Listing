import mongoose, { Schema, Document } from 'mongoose';

interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
