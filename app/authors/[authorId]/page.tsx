import { Typography, Box, Chip, Stack } from '@mui/material';
import type { AuthorRaw } from '@/models/author/author.raw';
import { getMockAuthors } from '@features/authors/api/authors.mock';
import { getMockBooks } from '@features/books/api/books.mock';
import PageShell from '@shared/components/PageShell/PageShell';
import DetailPanel from '@shared/components/DetailPanel/DetailPanel';

export default function AuthorDetailPage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = decodeURIComponent(params?.authorId ?? '');
  const author: AuthorRaw | undefined = getMockAuthors({
    page: 1,
    perPage: 1000,
  }).data.find((a: AuthorRaw) => a.id === authorId);

  if (!author) {
    return (
      <PageShell
        title="Author Not Found"
        subtitle="We couldn't locate that author."
        badgeLabel="Error"
        maxWidth={900}
      >
        <DetailPanel>
          <Typography variant="body1">
            Try returning to the authors list.
          </Typography>
        </DetailPanel>
      </PageShell>
    );
  }

  const totalSales = getMockBooks({ page: 1, perPage: 1000 })
    .data.filter((b) => b.author === author.name)
    .reduce((sum, b) => sum + (b.salesCount ?? 0), 0);

  return (
    <PageShell
      title={author.name}
      subtitle={author.bio || author.nationality || undefined}
      badgeLabel="Author"
      maxWidth={1000}
    >
      <DetailPanel
        padding={6}
        sx={{ px: { xs: 6, md: 12 }, py: { xs: 5, md: 6 } }}
      >
        <Stack spacing={2}>
          {author.birthDate && (
            <Typography variant="subtitle1">
              Birth Date: {author.birthDate}
            </Typography>
          )}
          {author.nationality && (
            <Typography variant="subtitle1">
              Nationality: {author.nationality}
            </Typography>
          )}
          {author.deathDate && (
            <Typography variant="subtitle1">
              Died: {author.deathDate}
              {author.deathPlace ? ` in ${author.deathPlace}` : ''}
            </Typography>
          )}
          {author.spouse && author.spouse.length > 0 && (
            <Typography variant="subtitle1">Spouse: {author.spouse}</Typography>
          )}
          <Typography variant="subtitle1">
            Total Sales: {totalSales.toLocaleString()}
          </Typography>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              gutterBottom
            >
              Genres
            </Typography>
            {author.primaryGenres?.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              gutterBottom
            >
              Books
            </Typography>
            {author.bookIsbns?.map((isbn) => (
              <Chip
                key={isbn}
                label={isbn}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </Stack>
      </DetailPanel>
    </PageShell>
  );
}
