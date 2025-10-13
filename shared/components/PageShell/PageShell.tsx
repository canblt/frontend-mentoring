'use client';

import React, { ReactNode } from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface PageShellProps {
  title?: string;
  subtitle?: ReactNode;
  badgeLabel?: string;
  actions?: ReactNode;
  children: ReactNode;
  maxWidth?: number | string;
  disableHero?: boolean;
}

/**
 * PageShell: Provides a consistent padded background, optional hero (title/subtitle/badge), and content container.
 * Ensures visual consistency across home, author, and book pages.
 */
const PageShell: React.FC<PageShellProps> = ({
  title,
  subtitle,
  badgeLabel,
  actions,
  children,
  maxWidth = 1200,
  disableHero,
}) => {
  const theme = useTheme();
  const custom = (theme as any).custom || {};
  const accents = custom.colors?.accents || {
    indigo: '#6366F1',
    purple: '#805AD5',
    orange: '#F97316',
  };
  const gradientText = {
    background: `linear-gradient(90deg, ${accents.indigo} 0%, ${accents.purple} 50%, ${accents.orange} 100%)`,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  } as const;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100%',
        py: { xs: 5, md: 8 },
        px: { xs: 2, sm: 4 },
        background:
          'linear-gradient(180deg, #0F1115 0%, #1C1F26 60%, #1C1F26 100%)',
        '&:after': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(circle at 22% 18%, rgba(99,102,241,0.12), transparent 55%), radial-gradient(circle at 78% 72%, rgba(249,115,22,0.08), transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ maxWidth, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {!disableHero && (title || subtitle || badgeLabel) && (
          <Box
            sx={{
              mb: { xs: 5, md: 7 },
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              animation: 'fadeIn 700ms ease both',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(12px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {badgeLabel && (
              <Chip
                label={badgeLabel}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600, letterSpacing: 0.5 }}
              />
            )}
            {title && (
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '38px', md: '52px' },
                  fontWeight: 800,
                  lineHeight: 1.05,
                  ...gradientText,
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="h3"
                component="p"
                sx={{
                  fontSize: { xs: '18px', md: '22px' },
                  fontWeight: 500,
                  maxWidth: 760,
                  color: 'text.secondary',
                }}
              >
                {subtitle}
              </Typography>
            )}
            {(title || subtitle) && (
              <Divider
                flexItem
                sx={{
                  width: 110,
                  borderColor: theme.palette.divider,
                  opacity: 0.5,
                }}
              />
            )}
            {actions && <Box>{actions}</Box>}
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default PageShell;
