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
}
