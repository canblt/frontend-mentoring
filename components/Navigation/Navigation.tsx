import { Grid2 } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Routes } from '@/config/routes';

export default function Navigation() {
  return (
    <Grid2 container>
      <Link href="/">Home</Link>
      <Link href={Routes.Books}>Books</Link>
    </Grid2>
  );
}
