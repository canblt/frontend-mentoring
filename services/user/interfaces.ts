import mongoose from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  company: string;
  role: string;
}
