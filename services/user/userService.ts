'use server';
import { UserModel, openConnection } from './userConnector';
import { User } from '@services/user/interfaces';
import mongoose, { Types } from 'mongoose';

export const getUser = async (_id: string) => {
  await openConnection({});
  const user = await UserModel.findById(_id).lean<User>().exec();
  if (!user) {
    return null;
  }
  return user;
};

export const getUsers = async () => {
  await openConnection({});
  const users = await UserModel.find().lean<User[]>().exec();
  if (!users) {
    return [];
  }
  return users;
};

export const getUserByEmail = async (email: string) => {
  await openConnection({});
  const user = await UserModel.findOne({
    email: email,
  })
    .lean<User>()
    .exec();
  if (!user) {
    return null;
  }
  return user;
};

export const createUser = async (user: Omit<User, '_id'>) => {
  await openConnection({});
  const userWithId: User = {
    ...user,
    _id: new mongoose.Types.ObjectId(),
  };
  const createdUser = await UserModel.create(userWithId).then((result) =>
    result.toObject<User>()
  );
  if (!createdUser) {
    return null;
  }
  return createdUser;
};

export const updateUser = async (_id: Types.ObjectId, user: Partial<User>) => {
  await openConnection({});
  const updateResult = await UserModel.findOneAndUpdate({ _id: _id }, user, {
    returnDocument: 'after',
  })
    .lean<User>()
    .exec();
  if (!updateResult) {
    return null;
  }
  return updateResult;
};

export const deleteUser = async (_id: Types.ObjectId) => {
  await openConnection({});
  const deleteResult = await UserModel.deleteOne({ _id }).exec();
  return deleteResult.deletedCount !== 0;
};
