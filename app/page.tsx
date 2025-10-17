'use client';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Box, Chip } from '@mui/material';
import { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import type { AuthorRaw } from '@/models/author/author.raw';
import type { BookRaw } from '@/models/book/book.raw';
import { authorFromRaw } from '@/models/author/author.factory';
import {
  getTopSoldBooks,
  getTopSoldAuthors,
} from '@shared/utils/topByAttribute';
import PageShell from '@shared/components/PageShell/PageShell';
import TrendCard from '../components/TrendCard/TrendCard';
import { getMockAuthors } from '../features/authors/api/authors.mock';
import { getMockBooks } from '../features/books/api/books.mock';

// Fetch full datasets (or large upper bound) then derive top sellers.
const allBooks: BookRaw[] = getMockBooks({ page: 1, perPage: 1000 }).data;
const topBooks = getTopSoldBooks(allBooks, 3);
const trendingBooks = topBooks.map((book: BookRaw) => ({
  title: book.title,
  subtitle: book.published,
  description: `ISBN: ${book.isbn} | Sales: ${book.salesCount.toLocaleString()}`,
  href: `/books/${book.isbn}`,
}));

const allAuthorRaws: AuthorRaw[] = getMockAuthors({
  page: 1,
  perPage: 1000,
}).data;
const mappedAuthors = allAuthorRaws.map((raw) => authorFromRaw(raw));
const topAuthors = getTopSoldAuthors(mappedAuthors, 3);
const trendingAuthors = topAuthors.map((author) => ({
  title: author.name,
  subtitle: `Total Sales: ${author.stats.totalSales.toLocaleString()}`,
  description:
    author.bio || author.nationality || author.birthDate?.toString() || '',
  href: `/authors/${author.id}`,
}));

const lowestRaw = [...allBooks]
  .sort((a, b) => a.salesCount - b.salesCount)
  .slice(0, 3)
  .map((b) => ({ ...b, discount: 0.3 }));
const discountedBooks = lowestRaw.map((book) => {
  const discounted = book.price * (1 - (book.discount ?? 0));
  return {
    title: book.title,
    subtitle: book.published,
    description: `Was $${book.price.toFixed(2)} • Now $${discounted.toFixed(2)} (-30%)`,
    href: `/books/${book.isbn}`,
  };
});

const Home: NextPage = () => {
  const theme = useTheme();
  const custom = (theme as any).custom || {};
  const radii = custom.radii || { lg: 12 };
  const shadows = custom.shadows || { md: 'none' };
  const sectionPaper = {
    p: { xs: 3, md: 8 },
    pb: 5,
    borderRadius: radii.lg,
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(4px)',
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
    '&:before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background:
        'radial-gradient(circle at 85% 15%, rgba(99,102,241,0.18), transparent 65%)',
      pointerEvents: 'none',
    },
    boxShadow: shadows.md,
  } as const;

  return (
    <PageShell
      title="Discover What's Trending"
      subtitle={
        "A snapshot of books & authors readers can't get enough of right now."
      }
      badgeLabel="Marketplace Insights"
      maxWidth={1400}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        justifyContent="center"
        alignItems="stretch"
        sx={{ mt: 0 }}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Paper sx={sectionPaper}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '28px', md: '34px' }, fontWeight: 700 }}
              >
                Top Books
              </Typography>
              <Chip
                size="small"
                label="Top 3"
                color="secondary"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Grid
              container
              spacing={1}
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {trendingBooks.map((book, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                >
                  <TrendCard {...book} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Paper sx={sectionPaper}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '28px', md: '34px' }, fontWeight: 700 }}
              >
                Top Authors
              </Typography>
              <Chip
                size="small"
                label="Top 3"
                color="secondary"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Grid
              container
              spacing={1}
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {trendingAuthors.map((author, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                >
                  <TrendCard {...author} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
        >
          <Paper sx={sectionPaper}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '28px', md: '34px' }, fontWeight: 700 }}
              >
                Low Sales Deals
              </Typography>
              <Chip
                size="small"
                label="30% Off"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Grid
              container
              spacing={1}
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {discountedBooks.map((book, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                >
                  <TrendCard {...book} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default Home;
