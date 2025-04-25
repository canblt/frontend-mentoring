import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe/dist';
import ProductsPage from '@/app/products/page';

const setupComponent = () => {
  return render(<ProductsPage />);
};

describe('Products page', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', () => {
      setupComponent();
      expect(screen.getByText(/Select a product/)).toBeDefined();
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
