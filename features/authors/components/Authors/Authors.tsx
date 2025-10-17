'use client';

import { Box, Typography } from '@mui/material';
import { PaginationControls } from '@shared/components/PaginationControls/PaginationControls';
import AuthorFilters from '../AuthorFilters/AuthorFilters';
import LoadingState from '../LoadingState/LoadingState';
import AuthorTable from '../AuthorTable/AuthorTable';
import { useAuthors } from '../../hooks/useAuthors';
import { useAuthorsFilters } from '../../hooks/useAuthorsFilters';
import { useAuthorsPagination } from '../../hooks/useAuthorsPagination';

interface AuthorsProps {
  showHeading?: boolean;
}

export default function Authors({ showHeading = true }: AuthorsProps) {
  const { page, nextPage, prevPage, resetPage } = useAuthorsPagination();
  const elementsPerPage = 6;
  const { name, setName, minBooks, setMinBooks } = useAuthorsFilters();
  const { data: authorsResult, isLoading } = useAuthors({
    page,
    perPage: elementsPerPage,
    name,
    minBooks,
  });
  const authors = authorsResult?.data || [];
  const total = authorsResult?.total || 0;
  const hasMore = page * elementsPerPage < total;

  function handleFilter(newName: string, newMinBooks: number) {
    setName(newName);
    setMinBooks(newMinBooks);
    if (page !== 1) resetPage();
  }

  return (
    <Box sx={{ pt: { xs: 1, md: 1 } }}>
      {showHeading && (
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Authors List
        </Typography>
      )}
      <AuthorFilters onFilter={handleFilter} />
      {isLoading ? (
        <LoadingState elementsPerPage={elementsPerPage} />
      ) : (
        <AuthorTable authors={authors} />
      )}
      <PaginationControls
        page={page}
        hasMore={hasMore}
        onPrev={prevPage}
        onNext={nextPage}
        sx={{ mt: 4 }}
      />
    </Box>
  );
}
