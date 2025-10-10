'use client';

import { useState } from 'react';
export function useAuthorsFilters() {
  const [name, setName] = useState('');
  const [minBooks, setMinBooks] = useState(0);
  const reset = () => {
    setName('');
    setMinBooks(0);
  };
  return { name, setName, minBooks, setMinBooks, reset };
}
