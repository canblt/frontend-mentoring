'use client';

import { extendTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import {
  BreakPoints,
  Colors,
  FontSizes,
  FontWeights,
  FontFamilies,
  Radii,
  Spacing,
  Shadows,
} from '@/config/styles';

const fontFamily = Object.values(FontFamilies).join(',');

declare module '@mui/material/styles' {
  interface TypographyVariants {
    errorText: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    errorText?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    menuText: true;
    errorText: true;
  }
}

// Extend module for custom design tokens & new variant
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      radii: typeof Radii;
      spacingScale: typeof Spacing;
      shadows: typeof Shadows;
      colors: {
        accents: {
          blue: string;
          indigo: string;
          purple: string;
          pink: string;
          orange: string;
        };
        feedback: {
          success: string;
          successBg: string;
          warning: string;
          warningBg: string;
          info: string;
          infoBg: string;
          error: string;
        };
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: Partial<Theme['custom']>;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true; // new custom variant
  }
}

const fontWeight = FontWeights.normal;

const position = 'relative';

// Map minimal MUI shadows (length 25) using our tokens for first tiers
const muiShadows: string[] = [
  'none',
  Shadows.xs,
  Shadows.sm,
  Shadows.md,
  Shadows.lg,
  Shadows.xl,
  Shadows.sm,
  Shadows.md,
  Shadows.lg,
  Shadows.xl,
  Shadows.sm,
  Shadows.md,
  Shadows.lg,
  Shadows.xl,
  Shadows.sm,
  Shadows.md,
  Shadows.lg,
  Shadows.xl,
  Shadows.sm,
  Shadows.md,
  Shadows.lg,
  Shadows.xl,
  Shadows.md,
  Shadows.lg,
  Shadows.xl,
];

const theme = extendTheme({
  cssVarPrefix: 'oev',
  // Single color scheme (dark only) – light mode removed per requirements
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: Colors.accentIndigo,
          contrastText: Colors.white,
          dark: Colors.accentPurple,
          light: '#7C83F4',
        },
        secondary: {
          main: Colors.accentOrange,
          dark: '#EA580C',
          contrastText: Colors.black,
        },
        error: { main: Colors.red },
        info: { main: Colors.info },
        success: { main: Colors.success },
        warning: { main: Colors.warning },
        background: {
          default: Colors.midnight,
          paper: Colors.charcoal,
        },
        divider: Colors.steel,
        text: {
          primary: Colors.offWhite,
          secondary: Colors.cloud,
        },
        action: {
          hover: Colors.slate,
          selected: Colors.steel,
          active: Colors.accentIndigo,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: BreakPoints.XS,
      sm: BreakPoints.MD,
      md: BreakPoints.MD,
      lg: BreakPoints.LG,
      xl: BreakPoints.XL,
    },
  },
  // Provide base spacing function (factor * 4)
  spacing: 4,
  shape: { borderRadius: Radii.md },
  shadows: muiShadows as any,
  typography: {
    allVariants: { fontFamily, fontWeight, position },
    h1: {
      fontSize: FontSizes.fourxl,
      fontWeight: FontWeights.bold,
      lineHeight: 1.25,
      color: Colors.offWhite,
    },
    h2: {
      fontSize: FontSizes.xxxl,
      fontWeight: FontWeights.semiBold,
      lineHeight: 1.3,
      color: Colors.offWhite,
    },
    h3: {
      fontSize: FontSizes.xxl,
      fontWeight: FontWeights.semiBold,
      lineHeight: 1.35,
      color: Colors.offWhite,
    },
    body1: { fontSize: FontSizes.md, lineHeight: 1.6 },
    body2: { fontSize: FontSizes.sm, lineHeight: 1.5 },
    button: {
      fontSize: FontSizes.md,
      textTransform: 'none',
      fontWeight: FontWeights.semiBold,
    },
    caption: { fontWeight: FontWeights.semiBold },
    errorText: {
      fontFamily,
      fontWeight: FontWeights.normal,
      fontSize: FontSizes.xs,
      color: Colors.red,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.custom.radii.md,
          paddingInline: theme.spacing(2),
          paddingBlock: theme.spacing(1),
          boxShadow: 'none',
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: theme.palette.primary.main,
            outlineOffset: 2,
          },
          transition: 'background-color 140ms ease, box-shadow 140ms ease',
        }),
      },
      variants: [
        {
          props: { variant: 'soft', color: 'primary' },
          style: {
            backgroundColor: 'var(--oev-palette-primary-light)',
            color: 'var(--oev-palette-primary-contrastText)',
            '&:hover': { backgroundColor: 'var(--oev-palette-primary-main)' },
          },
        },
        {
          props: { variant: 'soft', color: 'secondary' },
          style: {
            backgroundColor: 'var(--oev-palette-secondary-main)',
            color: 'var(--oev-palette-secondary-contrastText)',
            opacity: 0.9,
            '&:hover': {
              opacity: 1,
              backgroundColor: 'var(--oev-palette-secondary-dark)',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.custom.radii.lg,
          boxShadow: Shadows.sm,
          backgroundImage: 'none',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.custom.radii.md,
          backgroundImage: 'none',
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiTypography-colorTextSecondary': {
            color: theme.palette.text.secondary,
          },
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (t) => ({
        ':root': { '--app-max-content-width': '1200px' },
        'html, body': {
          backgroundColor: t.palette.background?.default,
          color: t.palette.text?.primary,
          fontFamily,
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'optimizeLegibility',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: { margin: 0, minHeight: '100vh', lineHeight: 1.4 },
        a: {
          color: t.palette.primary.main,
          textDecoration: 'none',
          transition: 'color 120ms ease',
        },
        'a:hover, a:focus-visible': {
          textDecoration: 'underline',
          outline: 'none',
        },
        '::selection': {
          background: t.palette.primary.light,
          color: t.palette.primary.contrastText,
        },
      }),
    },
  },
  custom: {
    radii: Radii,
    spacingScale: Spacing,
    shadows: Shadows,
    colors: {
      accents: {
        blue: Colors.accentBlue,
        indigo: Colors.accentIndigo,
        purple: Colors.accentPurple,
        pink: Colors.accentPink,
        orange: Colors.accentOrange,
      },
      feedback: {
        success: Colors.success,
        successBg: Colors.successBg,
        warning: Colors.warning,
        warningBg: Colors.warningBg,
        info: Colors.info,
        infoBg: Colors.infoBg,
        error: Colors.red,
      },
    },
  },
});

export default theme;
