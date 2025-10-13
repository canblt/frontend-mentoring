import { Typography, Box, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import type { BookRaw } from '@/models/book/book.raw';
import { AddToCartButton } from '@/shared/components/AddToCartButton/AddToCartButton';
import { getMockAuthors } from '@features/authors/api/authors.mock';
import { getMockBooks } from '@features/books/api/books.mock';
import PageShell from '@shared/components/PageShell/PageShell';
import DetailPanel from '@shared/components/DetailPanel/DetailPanel';

export default function BookDetailPage({
  params,
}: {
  params: { bookId: string };
}) {
  const rawBookId = params?.bookId;
  const bookId = decodeURIComponent(
    Array.isArray(rawBookId) ? rawBookId[0] : rawBookId ?? ''
  );
  const book: BookRaw | undefined = getMockBooks({
    page: 1,
    perPage: 1000,
  }).data.find((b: BookRaw) => b.isbn === bookId);

  if (!book) {
    return (
      <PageShell
        title="Book Not Found"
        subtitle="We couldn't locate that book."
        badgeLabel="Error"
        maxWidth={900}
      >
        <DetailPanel>
          <Typography variant="body1">
            Try returning to the books list.
          </Typography>
        </DetailPanel>
      </PageShell>
    );
  }

  const authors = getMockAuthors({ page: 1, perPage: 1000 }).data;
  const matchedAuthor = authors.find((a) => a.name === book.author);
  const authorHref = matchedAuthor
    ? `/authors/${matchedAuthor.id}`
    : `/authors/${encodeURIComponent(book.author)}`;

  return (
    <PageShell
      title={book.title}
      subtitle={`Published ${book.published} • ISBN ${book.isbn}`}
      badgeLabel="Book"
      maxWidth={1000}
    >
      {(() => {
        const discount = (book as any).discount as number | undefined;
        const hasDiscount = typeof discount === 'number' && discount > 0;
        const effectivePrice = hasDiscount
          ? book.price * (1 - discount)
          : book.price;
        return (
          <DetailPanel
            padding={6}
            sx={{ px: { xs: 6, md: 8 }, py: { xs: 5, md: 6 } }}
          >
            <Stack spacing={2}>
              <Typography variant="subtitle1">
                Sales: {book.salesCount.toLocaleString?.() ?? book.salesCount}
              </Typography>
              {hasDiscount ? (
                <Typography variant="subtitle1">
                  Price:{' '}
                  <Box
                    component="span"
                    sx={{ textDecoration: 'line-through', opacity: 0.6, mr: 1 }}
                  >
                    ${book.price.toFixed(2)}
                  </Box>
                  <Box
                    component="span"
                    color="success.main"
                    fontWeight={600}
                  >
                    ${effectivePrice.toFixed(2)}
                  </Box>
                  <Chip
                    size="small"
                    color="primary"
                    label={`-${Math.round(discount * 100)}%`}
                    sx={{ ml: 1, fontWeight: 600 }}
                  />
                </Typography>
              ) : (
                <Typography variant="subtitle1">
                  Price: $
                  {book.price?.toFixed ? book.price.toFixed(2) : book.price}
                </Typography>
              )}
              <Typography variant="subtitle1">
                Author:{' '}
                <Link
                  href={authorHref}
                  data-testid="book-author-link"
                  data-author-href={authorHref}
                  style={{ textDecoration: 'underline' }}
                >
                  {book.author}
                </Link>
              </Typography>
              <AddToCartButton
                isbn={book.isbn}
                title={book.title}
                price={effectivePrice as unknown as number}
                sx={{ mt: 1, alignSelf: 'flex-start' }}
              />
              <Box sx={{ pl: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  Tags
                </Typography>
                <Chip
                  size="small"
                  label={book.published}
                  sx={{ mr: 1, mb: 1 }}
                />
                <Chip
                  size="small"
                  label={`Sales ${book.salesCount}`}
                  sx={{ mr: 1, mb: 1 }}
                />
                {hasDiscount && (
                  <Chip
                    size="small"
                    label={`Was $${book.price.toFixed(2)}`}
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
                <Chip
                  size="small"
                  label={`$${effectivePrice.toFixed(2)}`}
                  sx={{ mr: 1, mb: 1 }}
                />
              </Box>
            </Stack>
          </DetailPanel>
        );
      })()}
    </PageShell>
  );
}
