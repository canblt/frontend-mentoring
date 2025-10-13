import { render, screen } from '@testing-library/react';
import { CssVarsProvider } from '@mui/material/styles';
import BookDetailPage from '@/app/books/[bookId]/page';
import { getMockBooks } from '@/features/books/api/books.mock';
import { getMockAuthors } from '@/features/authors/api/authors.mock';
import '@testing-library/jest-dom';
import theme from '@/config/theme';
import { CartProvider } from '@/shared/contexts/CartContext';

describe('BookDetailPage author link', () => {
  const sampleBook = getMockBooks({ page: 1, perPage: 1 }).data[0];
  const authors = getMockAuthors({ page: 1, perPage: 1000 }).data;
  const matchedAuthor = authors.find((a) => a.name === sampleBook.author);
  const expectedHref = matchedAuthor
    ? `/authors/${matchedAuthor.id}`
    : `/authors/${encodeURIComponent(sampleBook.author)}`;
  it('renders an inline link to the author detail by name/id', () => {
    render(
      <CssVarsProvider
        theme={theme}
        defaultMode="dark"
      >
        <CartProvider>
          <BookDetailPage params={{ bookId: sampleBook.isbn }} />
        </CartProvider>
      </CssVarsProvider>
    );
    const button = screen.getByTestId('book-author-link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(sampleBook.author);
    expect(button).toHaveAttribute('data-author-href', expectedHref);
  });

  it('shows not found message for unknown ISBN', () => {
    render(
      <CssVarsProvider
        theme={theme}
        defaultMode="dark"
      >
        <CartProvider>
          <BookDetailPage params={{ bookId: 'unknown-isbn-123' }} />
        </CartProvider>
      </CssVarsProvider>
    );
    expect(screen.getByText(/book not found/i)).toBeInTheDocument();
  });
});
