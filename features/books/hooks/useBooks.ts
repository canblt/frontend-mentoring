'use client';

import { MapperRegistry } from '@/config/mapper-registry';
import { defaultErrorBook } from '@/models/book/book';
import { fetchBooks } from '../api/books';
import { useQuery } from '@tanstack/react-query';

export interface UseBooksParams { page: number; perPage: number; title?: string }
export interface UseBooksResult {
  data: ReturnType<typeof MapperRegistry.book>[];
  total: number;
}
export function useBooks(params: UseBooksParams) {
  return useQuery<UseBooksResult>({
    queryKey: ['books', params],
    queryFn: async () => {
      const { data: rawArray, total } = await fetchBooks(params);
      const mapped = rawArray.map((raw) => {
        try {
          return MapperRegistry.book(raw);
        } catch (e) {
          console.error('Invalid book data', e, 'raw:', raw);
          return defaultErrorBook;
        }
      });
      return { data: mapped, total };
    },
  });
}
