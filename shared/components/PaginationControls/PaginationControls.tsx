import { Button, Stack } from '@mui/material';
import React from 'react';

export interface PaginationControlsProps {
  page: number;
  hasMore: boolean;
  onNext: () => void;
  onPrev: () => void;
  size?: 'small' | 'medium';
  labels?: { previous?: string; next?: string };
  sx?: any;
}

export function PaginationControls({
  page,
  hasMore,
  onNext,
  onPrev,
  size = 'medium',
  labels = {},
  sx,
}: PaginationControlsProps) {
  const { previous = 'Previous', next = 'Next' } = labels;
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={sx}>
      <Button
        onClick={onPrev}
        variant="outlined"
        color="primary"
        disabled={page === 1}
        aria-disabled={page === 1}
        size={size}
        sx={{
          minWidth: 110,
          fontWeight: 500,
          textTransform: 'none',
          borderColor: (theme) => (page === 1 ? theme.palette.divider : theme.palette.primary.dark),
          color: (theme) => (page === 1 ? theme.palette.text.secondary : theme.palette.primary.contrastText),
          '&:hover': page === 1 ? {} : {
            borderColor: (theme) => theme.palette.primary.dark,
            backgroundColor: (theme) => theme.palette.action.hover,
          },
          '&.Mui-disabled': {
            opacity: 1,
            color: (theme) => theme.palette.text.secondary,
            borderColor: (theme) => theme.palette.divider,
          },
          transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
        }}
      >
        {previous}
      </Button>
      <Button
        onClick={onNext}
        variant="contained"
        disabled={!hasMore}
        aria-disabled={!hasMore}
        size={size}
        sx={{
          minWidth: 110,
          fontWeight: 500,
          textTransform: 'none',
          '&.Mui-disabled': {
            opacity: 1,
            backgroundColor: (theme) => theme.palette.action.disabledBackground,
            color: (theme) => theme.palette.text.secondary,
          },
        }}
      >
        {next}
      </Button>
    </Stack>
  );
}
