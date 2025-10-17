'use client';

import { useState } from 'react';
export function useBooksFilters() {
  const [title, setTitle] = useState('');
  return { title, setTitle };
}
