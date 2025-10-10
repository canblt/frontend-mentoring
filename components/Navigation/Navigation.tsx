'use client';
import { Grid2, Button, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Routes } from '@/config/routes';

export default function Navigation() {
  const pathname = (usePathname() || '').toLowerCase();
  const items: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Books', href: Routes.Books },
    { label: 'Authors', href: Routes.Authors },
  ];

  return (
    <nav aria-label="Main navigation">
      <Grid2
        container
        wrap="nowrap"
        sx={{
          gap: 1,
          py: 1.5,
          px: 2,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ width: '100%' }}
        >
          {items.map(({ label, href }) => {
            const isActive = pathname === href.toLowerCase();
            return (
              <Button
                key={href}
                component={Link}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                size="small"
                disableElevation
                variant={isActive ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: 2,
                  px: 1.5,
                  color: (theme) =>
                    isActive
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  backgroundColor: (theme) =>
                    isActive ? theme.palette.primary.main : 'transparent',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      isActive
                        ? theme.palette.primary.dark
                        : theme.palette.action.hover,
                    color: (theme) => theme.palette.text.primary,
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: (theme) => theme.palette.primary.dark,
                    outlineOffset: 2,
                  },
                  transition: 'background-color 120ms ease, color 120ms ease',
                }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
      </Grid2>
    </nav>
  );
}
