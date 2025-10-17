'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { PaginationControls } from '@shared/components/PaginationControls/PaginationControls';
import BookFilters from '../BookFilters/BookFilters';
import BookLoading from '../BookLoading/BookLoading';
import BookTable from '../BookTable/BookTable';
import { useBooks } from '../../hooks/useBooks';
import { useBooksFilters } from '../../hooks/useBookFilters';
import { useBooksPagination } from '../../hooks/useBooksPagination';

interface BooksProps {
  showHeading?: boolean;
}

export default function Books({ showHeading = true }: BooksProps) {
  const { page, nextPage, prevPage } = useBooksPagination();
  const elementsPerPage = 6;
  const { title, setTitle } = useBooksFilters();
  const { data: booksResult, isLoading } = useBooks({
    page,
    perPage: elementsPerPage,
    title,
  });
  const books = booksResult?.data || [];
  const total = booksResult?.total || 0;
  const hasMore = page * elementsPerPage < total;
  return (
    <Box sx={{ pt: { xs: 1, md: 1 } }}>
      {showHeading && (
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Book List
        </Typography>
      )}
      <BookFilters onFilter={setTitle} />
      {isLoading ? (
        <BookLoading elementsPerPage={elementsPerPage} />
      ) : (
        <BookTable books={books} />
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
