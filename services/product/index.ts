import { ProductProps } from '@/app/interfaces';

export async function getProducts() {
  const products = await fetch('https://dummyjson.com/products?limit=10');
  // custom delay to avoid flickering loading state
  setTimeout(() => {}, 1000);
  return products.json();
}

export async function getProduct(id: number): Promise<ProductProps> {
  // increase/decrease the revalidate time if you are fetching data from a real API which may can change frequently
  const product = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 },
  });
  // custom delay to avoid flickering loading state
  setTimeout(() => {}, 1500);
  return product.json();
}
