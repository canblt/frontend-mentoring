'use client';
import { useState, useCallback } from 'react';

export interface PaginationState {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
  setPage: (page: number) => void;
}

export function usePagination(initialPage = 1): PaginationState {
  const [page, setPage] = useState(initialPage);
  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const resetPage = useCallback(() => setPage(1), []);
  return { page, nextPage, prevPage, resetPage, setPage };
}
