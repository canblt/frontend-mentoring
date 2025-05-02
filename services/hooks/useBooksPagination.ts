import { useState } from 'react';
import { useEffect } from 'react';

export function useBooksPagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const nextPage = () => setPage((page) => page + 1);
  const prevPage = () => setPage((page) => Math.max(1, page - 1));
  const resetPage = () => setPage(1);
  return { page, setPage, nextPage, prevPage, resetPage };
}
