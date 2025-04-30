'use client';
import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useBooks } from '@services/hooks/useBooks';

export default function Books() {
  const { data: books, isLoading } = useBooks();

  if (isLoading) return <CircularProgress />;
  return (
    <>
      {books ? (
        <ul>
          {books.map((book) => (
            <li key={book.isbn}>
              {book.title} ({book.published.getFullYear()})
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="h1">No books found</Typography>
      )}
    </>
  );
}
