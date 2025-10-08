'use client';

import { useState } from 'react';
export function useBooksPagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const resetPage = () => setPage(1);
  return { page, setPage, nextPage, prevPage, resetPage };
}

