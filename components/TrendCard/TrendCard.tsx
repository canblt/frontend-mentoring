'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';

interface TrendCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  title,
  subtitle,
  description,
  href,
}) => {
  const theme = useTheme();
  const custom = (theme as any).custom || {};
  const radii = custom.radii || { md: 8 };
  const customShadows = custom.shadows || {
    xs: 'none',
    md: 'none',
    sm: 'none',
  };
  const bg = theme.palette.background.paper;
  const hoverBg = theme.palette.action.hover;
  const borderColor = theme.palette.divider;

  const radius = radii.md; // smaller radius for less rounded look

  const cardContent = (
    <Card
      sx={{
        minWidth: 220,
        minHeight: 180,
        m: 1,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: radius,
        bgcolor: bg,
        position: 'relative',
        boxShadow: customShadows.xs,
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        transition:
          'background-color 160ms ease, box-shadow 220ms ease, transform 220ms cubic-bezier(.4,0,.2,1)',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(140deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%)',
          pointerEvents: 'none',
        },
        '&:hover': {
          bgcolor: hoverBg,
          boxShadow: customShadows.md,
          transform: 'translateY(-3px)',
        },
        '&:active': {
          transform: 'translateY(-1px) scale(.995)',
          boxShadow: customShadows.sm,
        },
        '&:focus-within': {
          outline: '2px solid',
          outlineColor: theme.palette.primary.main,
          outlineOffset: 2,
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 3,
          gap: 0.5,
        }}
      >
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ fontWeight: 600, lineHeight: 1.3 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            component="p"
            color="text.secondary"
            sx={{ fontSize: theme.typography.body2.fontSize }}
          >
            {subtitle}
          </Typography>
        )}
        {description && (
          <Box mt={1}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.4 }}
            >
              {description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return href ? (
    <Link
      href={href}
      passHref
      legacyBehavior
    >
      <ButtonBase
        sx={{
          width: '100%',
          textAlign: 'left',
          borderRadius: radius,
          alignItems: 'stretch',
        }}
      >
        {cardContent}
      </ButtonBase>
    </Link>
  ) : (
    cardContent
  );
};

export default TrendCard;
