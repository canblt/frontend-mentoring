import { lato } from '@/config/fonts';

export enum BreakPoints {
  XS = 0,
  SM = 390,
  MD = 640,
  LG = 1280,
  XL = 1720,
}

export const FontFamilies = {
  Lato: lato.style.fontFamily,
  SFProDisplay: '"SF Pro Display"',
  SFPro: '"SF Pro"',
};

export enum FontSizes {
  xs = '12px',
  sm = '14px',
  md = '16px',
  lg = '18px',
  xl = '20px',
  xxl = '22px',
  xxxl = '24px',
  fourxl = '28px',
  fivexl = '34px',
  sixxl = '54px',
}
export enum FontWeights {
  normal = 400,
  medium = 500,
  semiBold = 600,
  bold = 700,
}

export enum Colors {
  darkGreen = '#3C7A57',
  green = '#8FDFAB',
  lightGreen = '#EDFFF5',
  celadonGreen = '#A1DDAF',
  white = '#FFFFFF',
  black = '#000000',
  russianBlack = '#000020',
  gray = '#E4E4E4',
  red = '#B33A3A',
  darkGray = '#BDBDBD',
  lightGray = '#F5F5F5',
  // New extended palette (neutrals + accents)
  midnight = '#0F1115',
  charcoal = '#1C1F26',
  slate = '#2A3039',
  steel = '#3E4652',
  smoke = '#64707D',
  cloud = '#CED5DB',
  offWhite = '#F9FAFB',
  accentBlue = '#3A74D9',
  accentIndigo = '#6366F1',
  accentPurple = '#805AD5',
  accentPink = '#EC4899',
  accentOrange = '#F97316',
  warning = '#F59E0B',
  warningBg = '#FEF3C7',
  success = '#16A34A',
  successBg = '#DCFCE7',
  info = '#0EA5E9',
  infoBg = '#E0F2FE',
}

// Spacing scale (multiples of 4px) to keep layout consistent
export enum Spacing {
  none = 0,
  xxs = 2,
  xs = 4,
  sm = 8,
  md = 12,
  lg = 16,
  xl = 24,
  xxl = 32,
  xxxl = 48,
  fourxl = 64,
}

// Border radius tokens
export enum Radii {
  none = 0,
  xs = 2,
  sm = 4,
  md = 8,
  lg = 12,
  xl = 16,
  pill = 9999,
  full = 99999,
}

// Elevation (shadow) tokens – kept minimal for clarity
export const Shadows = {
  xs: '0 1px 2px 0 rgba(0,0,0,0.06)',
  sm: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.04)',
  md: '0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.06)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.05)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.10), 0 10px 10px -5px rgba(0,0,0,0.04)',
};

export type Elevation = keyof typeof Shadows;
