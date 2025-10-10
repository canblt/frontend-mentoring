'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../api/authors';
import { MapperRegistry } from '@/config/mapper-registry';
import { defaultErrorAuthor } from '@/models/author/author';

export interface UseAuthorsParams {
  page: number;
  perPage: number;
  name?: string;
  minBooks?: number;
}
export interface UseAuthorsResult {
  data: ReturnType<typeof MapperRegistry.author>[];
  total: number;
}
export function useAuthors(params: UseAuthorsParams) {
  return useQuery<UseAuthorsResult>({
    queryKey: ['authors', params],
    queryFn: async () => {
      const { data: rawArray, total } = await fetchAuthors(params);
      const mapped = rawArray.map((raw) => {
        try {
          return MapperRegistry.author(raw);
        } catch (e) {
          console.error('Invalid author data', e, raw);
          return defaultErrorAuthor;
        }
      });
      return { data: mapped, total };
    },
  });
}
