'use client';

import { extendTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import {
  BreakPoints,
  Colors,
  FontSizes,
  FontWeights,
  FontFamilies,
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

const fontWeight = FontWeights.normal;

const fontSize = FontSizes.sm;

const position = 'relative';

const theme = extendTheme({
  cssVarPrefix: 'oev',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: Colors.gray,
          contrastText: Colors.black,
          dark: Colors.darkGray,
          light: Colors.lightGray,
        },
        secondary: {
          main: Colors.russianBlack,
          dark: Colors.black,
          contrastText: Colors.white,
        },
        info: {
          main: Colors.gray,
        },
        error: {
          main: Colors.red,
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
  typography: {
    allVariants: {
      fontFamily,
      fontWeight,
      fontSize,
      position,
    },
    h1: {
      fontSize: FontSizes.fourxl,
      fontWeight: FontWeights.bold,
      lineHeight: 1.4,
      color: Colors.black,
    },
    h2: {
      fontWeight: FontWeights.semiBold,
    },
    body1: {
      fontSize: FontSizes.md,
      display: 'inline',
    },
    body2: {
      fontSize: FontSizes.xs,
      display: 'inline',
      height: '14px',
    },
    button: {
      fontSize: FontSizes.md,
    },
    caption: {
      fontWeight: FontWeights.semiBold,
    },
    errorText: {
      fontFamily,
      fontWeight,
      fontSize: FontSizes.xs,
      color: Colors.red,
    },
  },
});

export default theme;
