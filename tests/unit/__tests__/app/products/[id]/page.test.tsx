import { cleanup, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { axe } from 'vitest-axe/dist';
import ProductPage from '@/app/products/[id]/page';
import { ProductProps } from '@/app/interfaces';

global.fetch = vi.fn();

function createFetchResponse(data: ProductProps) {
  return {
    json: () =>
      new Promise((resolve) => {
        resolve(data);
      }),
  };
}

const setupComponent = async () => {
  return render(
    await ProductPage({
      params: { id: 1 },
    })
  );
};

describe('Product page', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', async () => {
      const productResponse = {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
        images: [
          'https://cdn.dummyjson.com/product-images/1/1.jpg',
          'https://cdn.dummyjson.com/product-images/1/2.jpg',
          'https://cdn.dummyjson.com/product-images/1/3.jpg',
          'https://cdn.dummyjson.com/product-images/1/4.jpg',
          'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
        ],
        discounterPercentage: 12.96,
      };

      fetch.mockResolvedValue(createFetchResponse(productResponse));

      await setupComponent();
      expect(screen.getByText(productResponse.title)).toBeDefined();
      expect(screen.getByText(productResponse.description)).toBeDefined();
      expect(screen.getByAltText(productResponse.title)).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const screen = await setupComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
