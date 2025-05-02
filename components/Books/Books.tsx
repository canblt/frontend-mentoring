'use client';

import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useBooks } from '@services/hooks/useBooks';
import { useBooksFilters } from '@services/hooks/useBookFilters';
import { useBooksPagination } from '@services/hooks/useBooksPagination';
import BookFilters from './BookFilters/BookFilters';
import BookLoading from './BookLoading/BookLoading';
import BookTable from './BookTable/BookTable';

export default function Books() {
  const { page, nextPage, prevPage } = useBooksPagination();
  const elementsPerPage = 6;
  const { title, setTitle } = useBooksFilters();
  const { data: books, isLoading } = useBooks({
    page,
    perPage: elementsPerPage,
    title,
  });
  function handleNextPage() {
    if (books?.length === elementsPerPage) {
      nextPage();
    }
  }
  return (
    <Container sx={{ pt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Book List
      </Typography>
      <BookFilters onFilter={setTitle} />
      {isLoading ? (
        <BookLoading elementsPerPage={elementsPerPage} />
      ) : (
        <BookTable books={books} />
      )}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          onClick={prevPage}
          variant="outlined"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          variant="contained"
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
}
