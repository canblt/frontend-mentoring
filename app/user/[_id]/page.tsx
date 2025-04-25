import { FC } from 'react';
import { UserDetailPageProps } from '@/app/user/interfaces';
import { UserCard } from '@/app/user/_partials/UserCard';
import { UserCardFailed } from '@/app/user/_partials/UserCardFailed';
import { getUser } from '@services/user';

export const metadata = {
  title: 'What a nice User!',
};

const Page: FC<UserDetailPageProps> = async ({
  params,
}: UserDetailPageProps) => {
  const user = await getUser(params._id);

  if (!user) {
    return <UserCardFailed />;
  }

  return <UserCard user={user} />;
};

export default Page;
