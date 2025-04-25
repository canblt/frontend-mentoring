import { User } from '@services/user/interfaces';
import mongoose, { Model, Schema } from 'mongoose';

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

let cached: MongooseCache = (global as any).mongooseCache;

if (!cached) {
  cached = (global as any).mongooseCache = { conn: null, promise: null };
}

export const openConnection = async ({
  mongoUser,
  mongoUri,
  mongoPassword,
}: {
  mongoUri?: string;
  mongoUser?: string;
  mongoPassword?: string;
}) => {
  if (cached.conn) {
    return cached.conn;
  }

  const MONGO_URI = mongoUri || process.env.MONGO_URI;
  const MONGO_USER = mongoUser || process.env.MONGO_USER;
  const MONGO_PASSWORD = mongoPassword || process.env.MONGO_PASSWORD;
  if (!MONGO_URI || !MONGO_USER || !MONGO_PASSWORD) {
    throw new Error('MONGO_URI or MONGO_USER or MONGO_PASSWORD is not set');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        auth: {
          username: MONGO_USER,
          password: MONGO_PASSWORD,
        },
        dbName: 'user_database',
        authSource: 'user_database',
      })
      .then((mongoose) => {
        return mongoose.connection;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

const UserSchema: Schema<User> = new Schema({
  _id: String,
  email: String,
  name: String,
  company: String,
  role: String,
});

export const UserModel: Model<User> =
  mongoose.models?.User || mongoose.model('User', UserSchema);
