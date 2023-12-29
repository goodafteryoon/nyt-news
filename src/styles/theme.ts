import { DefaultTheme } from 'styled-components';

const colors = {
  background: '#F0F1F4',
  white: '#FEFEFE',
  whiteChipBorder: '#F2F2F2',
  black: '#000000',
  mainBlue: '#3478F6',
  subBlue: '#82B0F4',
  gray: '#C4C4C4',
  darkGray: '#6D6D6D',
  yellowStar: '#FFB800',
};

export const theme: DefaultTheme = {
  colors,
};

export type Color = typeof colors;
