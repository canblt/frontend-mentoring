import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface ProductPageProps {
  params: {
    id: number;
  };
}

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discounterPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
