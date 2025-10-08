import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe/dist';
import DashboardPage from '@/app/page';

const setupComponent = async () => {
  return render(<DashboardPage />);
};

describe('Dashboard page', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', async () => {
      await setupComponent();
      expect(screen.getByText(/Starters Pack OEV/)).toBeDefined();
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
