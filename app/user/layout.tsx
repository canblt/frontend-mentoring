import { FC, Suspense } from 'react';
import { UserLayoutProps } from '@/app/user/interfaces';
import Users from '@/app/user/_partials/Users';
import UsersLoading from '@/app/user/_partials/UsersLoading';

export const metadata = {
  title: 'Work with users',
};
const Layout: FC<UserLayoutProps> = ({ children }: UserLayoutProps) => {
  return (
    <div>
      <Suspense fallback={<UsersLoading />}>
        <Users />
      </Suspense>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
