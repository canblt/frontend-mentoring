import { expect } from '@playwright/test';
import { User } from '@services/user';
import { openConnection, UserModel } from '@services/user/userConnector';
import {
  createUser,
  deleteUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
} from '@services/user/userService';
import { MongoMemoryServer } from 'mongodb-memory-server';

const DEFAULT_USER: Omit<User, '_id'> = {
  email: 'test@email.com',
  name: 'Test User',
  role: 'user',
  company: 'Test Company',
};

describe('User Service', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({
      auth: {
        enable: true,
        extraUsers: [
          {
            database: 'user_database',
            createUser: 'user',
            pwd: 'admin',
            roles: [
              {
                role: 'readWrite',
                db: 'user_database',
              },
            ],
          },
        ],
      },
    });
    await openConnection({
      mongoUri: mongoServer.getUri(),
      mongoUser: 'user',
      mongoPassword: 'admin',
    });
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it('should create a user', async () => {
    // when a user is created
    const user = await createUser(DEFAULT_USER);
    // then the user is created
    expect(user?.email).toEqual(DEFAULT_USER.email);
    expect(user?.name).toEqual(DEFAULT_USER.name);
    expect(user?.role).toEqual(DEFAULT_USER.role);
    expect(user?.company).toEqual(DEFAULT_USER.company);
  });

  it('should get a user', async () => {
    //given a user exists
    const createdUser = await createUser(DEFAULT_USER);
    // when the user is fetched
    const user = await getUser(createdUser!._id.toString());
    // then the user is returned
    expect(user).toMatchObject(DEFAULT_USER);
  });

  it('should get a user by email', async () => {
    //given a user exists
    await createUser(DEFAULT_USER);
    // when the user is fetched
    const user = await getUserByEmail(DEFAULT_USER.email);
    // then the user is returned
    expect(user).toMatchObject(DEFAULT_USER);
  });

  it('should get all users', async () => {
    //given a user exists
    await createUser(DEFAULT_USER);
    // when all users are fetched
    const user = await getUsers();
    // then the user is returned
    expect(user).toHaveLength(1);
    expect(user[0].email).toEqual(DEFAULT_USER.email);
    expect(user[0].name).toEqual(DEFAULT_USER.name);
    expect(user[0].role).toEqual(DEFAULT_USER.role);
    expect(user[0].company).toEqual(DEFAULT_USER.company);
  });

  it('should delete a user', async () => {
    //given a user exists
    const createdUser = await createUser(DEFAULT_USER);
    // when the user is deleted
    await deleteUser(createdUser!._id);
    // then the user is not found
    const user = await getUser(createdUser!._id.toString());
    expect(user).toBeNull();
  });

  it('should update a user', async () => {
    //given a user exists
    const createdUser = await createUser(DEFAULT_USER);
    // when the user is updated
    const updatedUser = { ...createdUser, name: 'Updated User' };
    await updateUser(createdUser!._id, updatedUser);
    // then the user is updated
    const user = await getUser(createdUser!._id.toString());
    expect(user).toMatchObject(updatedUser);
  });
});
