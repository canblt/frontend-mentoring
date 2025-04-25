import Link from 'next/link';
import { ProductProps } from '@/app/interfaces';
import { getProducts } from '@services/product';

const Products = async () => {
  const { products } = await getProducts();
  return (
    <ul>
      {products.map(({ id, title }: ProductProps) => (
        <li key={id}>
          <Link href={`/products/${id}`}>
            {id} | {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Products;
