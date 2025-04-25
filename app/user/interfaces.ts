import { ReactNode } from 'react';

export interface UserLayoutProps {
  children: ReactNode;
}

export interface UserDetailPageProps {
  params: {
    _id: string;
  };
}
