import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe/dist';
import { CssVarsProvider } from '@mui/material/styles';
import DashboardPage from '@/app/page';
import theme from '@/config/theme';

const setupComponent = async () => {
  return render(
    <CssVarsProvider
      theme={theme}
      defaultMode="dark"
    >
      <DashboardPage />
    </CssVarsProvider>
  );
};

describe('Dashboard page', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', async () => {
      await setupComponent();
      expect(screen.getByText(/discover what's trending/i)).toBeDefined();
      expect(screen.getByText(/low sales deals/i)).toBeDefined();
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
