import { FC } from 'react';
import { getProduct } from '@/services/product';
import { ProductPageProps } from '@/app/interfaces';
import { Card } from '@/components/Card';

export const metadata = {
  title: 'Choose a product',
};

const Page: FC<ProductPageProps> = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.id);

  return (
    <Card
      title={product.title}
      imageSrc={product.thumbnail}
      imageAlt={product.title}
      content={product.description}
    />
  );
};

export default Page;
