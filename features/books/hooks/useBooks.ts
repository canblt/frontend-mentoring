'use client';

import { MapperRegistry } from '@/config/mapper-registry';
import { defaultErrorBook } from '@/models/book/book';
import { fetchBooks } from '../api/books';
import { useQuery } from '@tanstack/react-query';

export function useBooks(params: { page: number; perPage: number; title?: string }) {
  return useQuery({
    queryKey: ['books', params],
    queryFn: async () => {
      const rawArray = await fetchBooks(params);
      if (!rawArray || rawArray.length === 0) {
        return [];
      }
      return rawArray.map((raw) => {
        try {
          return MapperRegistry.book(raw);
        } catch (e) {
          console.error('Invalid book data', e, 'raw:', raw);
          return defaultErrorBook;
        }
      });
    },
  });
}

