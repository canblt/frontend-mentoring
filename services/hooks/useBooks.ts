'use client';

import { useQuery } from '@tanstack/react-query';
import { BookRaw } from '@/models/book/book.raw';
import { fetchBooks } from '@services/api/books';
import { MapperRegistry } from '@/config/mapper-registry';
import { defaultErrorBook } from '@/models/book/book';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    select: (rawArray: BookRaw[] | undefined) => {
      if (!rawArray || rawArray.length === 0) {
        return [];
      }
      return rawArray.map((raw) => {
        try {
          return MapperRegistry.book(raw);
        } catch (e) {
          console.error('Invalid book data', e, 'raw:', raw);
          // Return a default error book object
          return defaultErrorBook;
        }
      });
    },
  });
}
