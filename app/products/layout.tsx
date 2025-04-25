import { FC, Suspense } from 'react';
import { LayoutProps } from '@/app/interfaces';
import Products from '@/app/products/_partials/Products';
import ProductsLoading from '@/app/products/_partials/ProductsLoading';

export const metadata = {
  title: 'Choose a product',
};
const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  // To avoid breaking the rule: https://vercel.com/docs/workflow-collaboration/conformance/rules/NEXTJS_NO_ASYNC_LAYOUT
  // Parallel Routes would not be a good solution in this case, because the Products component has a dynamic route and cannot
  // keep the selected subroute.
  // See: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#active-state-and-navigation
  return (
    <div>
      <Suspense fallback={<ProductsLoading />}>
        <Products />
      </Suspense>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
