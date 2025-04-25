import { cleanup, render } from '@testing-library/react';
import { axe } from 'vitest-axe/dist';
import { Button } from '@/components/Button';

global.alert = vi.fn();

const setupComponent = () => {
  return render(
    Button({
      label: 'Example button',
      title: 'an example button',
    })
  );
};

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', () => {
      const screen = setupComponent();
      expect(screen.getByText(/Example button/)).toBeDefined();
    });

    it('should alert when clicked', () => {
      const screen = setupComponent();
      const button = screen.getByText(/Example button/);
      button.click();
      expect(window.alert).toHaveBeenCalledWith(
        'We want to buy an example button'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const screen = setupComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
