import { render, screen, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { axe } from 'vitest-axe/dist';
import { Authors } from '@/features/authors';

describe('Authors feature', () => {
  const setup = () => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <Authors />
      </QueryClientProvider>
    );
  };
  afterEach(() => cleanup());

  it('renders heading', () => {
    setup();
    expect(screen.getByText(/authors list/i)).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const ui = setup();
    const results = await axe(ui.container);
    expect(results).toHaveNoViolations();
  });
});
