'use client';

import { Container, Typography } from '@mui/material';
import { useAuthors } from '../../hooks/useAuthors';
import { useAuthorsFilters } from '../../hooks/useAuthorsFilters';
import { useAuthorsPagination } from '../../hooks/useAuthorsPagination';
import AuthorFilters from '../AuthorFilters/AuthorFilters';
import LoadingState from '../LoadingState/LoadingState';
import AuthorTable from '../AuthorTable/AuthorTable';
import { PaginationControls } from '@shared/components/PaginationControls/PaginationControls';

export default function Authors() {
  const { page, nextPage, prevPage, resetPage } = useAuthorsPagination();
  const elementsPerPage = 6;
  const { name, setName, minBooks, setMinBooks } = useAuthorsFilters();
  const { data: authorsResult, isLoading } = useAuthors({ page, perPage: elementsPerPage, name, minBooks });
  const authors = authorsResult?.data || [];
  const total = authorsResult?.total || 0;
  const hasMore = page * elementsPerPage < total;

  function handleFilter(newName: string, newMinBooks: number) {
    setName(newName);
    setMinBooks(newMinBooks);
    if (page !== 1) resetPage();
  }

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Authors List
      </Typography>
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
    </Container>
  );
}
