'use client';
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

interface DetailPanelProps {
  children: ReactNode;
  elevation?: 'sm' | 'md';
  padding?: number;
  sx?: SxProps<Theme>; // allow custom style overrides (e.g., extra left padding)
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  children,
  elevation = 'md',
  padding = 5,
  sx,
}) => {
  const theme = useTheme();
  const custom = (theme as any).custom || {};
  const radii = custom.radii || { lg: 12 };
  const shadows = custom.shadows || { md: 'none', sm: 'none' };
  return (
    <Paper
      sx={{
        p: padding,
        mb: 4,
        borderRadius: radii.lg,
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(4px)',
        // Dark-only glassy gradient
        background:
          'linear-gradient(140deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 80% 18%, rgba(99,102,241,0.22), transparent 60%)',
          pointerEvents: 'none',
        },
        boxShadow: elevation === 'md' ? shadows.md : shadows.sm,
        ...sx,
      }}
      role="group"
    >
      {children}
    </Paper>
  );
};

export default DetailPanel;
