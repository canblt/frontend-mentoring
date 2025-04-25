import { cleanup, render } from '@testing-library/react';
import { axe } from 'vitest-axe/dist';
import { CardContainer } from '@/components/Card';

const CONTENT = 'This is content';

const setupComponent = async () => {
  return render(
    await CardContainer({
      red: true,
      children: <div>{CONTENT}</div>,
    })
  );
};

describe('CardContainer', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', async () => {
      const screen = await setupComponent();
      expect(screen.getByText(CONTENT)).toBeDefined();
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
