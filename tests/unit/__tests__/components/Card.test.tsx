import { cleanup, render } from '@testing-library/react';
import { axe } from 'vitest-axe/dist';
import { Card } from '@/components/Card';

const setupComponent = async () => {
  return render(
    await Card({
      imageSrc: '/image.jpeg',
      imageAlt: 'imageAlt',
      title: 'Example',
      content: 'This is a card component.',
    })
  );
};

describe('Card', () => {
  afterEach(() => {
    cleanup();
  });

  describe('UI Tests', () => {
    it('should render', async () => {
      const screen = await setupComponent();
      expect(screen.getByText(/Example/)).toBeDefined();
      expect(screen.getByText(/This is a card component./)).toBeDefined();
      expect(screen.getByAltText(/imageAlt/)).toBeDefined();
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
