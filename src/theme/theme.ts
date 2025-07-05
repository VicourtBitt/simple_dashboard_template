// Original primary red color variations
export const PRIMARY = {
  lightest: '#fde8ea', // very light tint
  lighter: '#f9c3c6', // lighter tint
  light: '#f7939f', // light tint
  main: '#e60f46', // main color
  dark: '#b40030', // dark tint
  darker: '#8e0025', // darker tint
  darkest: '#67001a', // darkest tint
  contrastText: '#ffffff'
};

// Secondary color variations (gray)
export const SECONDARY = {
  lightest: '#d0d0d0', // very light tint
  lighter: '#a1a1a1', // lighter tint
  light: '#7a7a7a', // light tint
  main: '#4A4A4A', // main color
  dark: '#3d3d3d', // dark tint
  darker: '#2f2f2f', // darker tint
  darkest: '#1f1f1f', // darkest tint
  contrastText: '#ffffff'
};

// Red variations
export const RED_BURGUNDY = {
  lightest: '#f2e6e8',
  lighter: '#e6bdc3',
  light: '#c6727f',
  main: '#9a2639', // Burgundy red
  dark: '#7c1e2e',
  darker: '#5e1723',
  darkest: '#3f0f18',
  contrastText: '#ffffff'
};

export const RED_CORAL = {
  lightest: '#ffecea',
  lighter: '#ffccc7',
  light: '#ff9c93',
  main: '#ff5a5f', // Coral red
  dark: '#e63e42',
  darker: '#c02c30',
  darkest: '#8a1f21',
  contrastText: '#ffffff'
};

// Colorblind-friendly palettes
// Purple-Gold palette (Deuteranopia/Protanopia friendly)
export const COLORBLIND_PURPLE_GOLD = {
  lightest: '#f7f2e4',
  lighter: '#eddcb9',
  light: '#ddbe7a',
  main: '#c6a138', // Gold
  dark: '#9f802d',
  darker: '#786021',
  darkest: '#514016',
  contrastText: '#000000'
};
export const COLORBLIND_PURPLE_GOLD_SECONDARY = {
  lightest: '#f1e9f5',
  lighter: '#d9c6e5',
  light: '#b692cd',
  main: '#8a4fa8', // Purple
  dark: '#6e3f87',
  darker: '#523065',
  darkest: '#352044',
  contrastText: '#ffffff'
};

export const COLORBLIND_PINK_CYAN = {
  lightest: '#fce6f1',
  lighter: '#f7bfdc',
  light: '#f290c4',
  main: '#ec407a', // Pink
  dark: '#c2185b',
  darker: '#991148',
  darkest: '#6d0b33',
  contrastText: '#000000'
};

// Pink-Cyan palette (Tritanopia friendly)
export const COLORBLIND_PINK_CYAN_SECONDARY = {
  lightest: '#e8f7fa',
  lighter: '#b9e6f0',
  light: '#7ad1e3',
  main: '#00b8d4', // Cyan/Light blue
  dark: '#0093a8',
  darker: '#006f7e',
  darkest: '#004a54',
  contrastText: '#ffffff'
};


// Neutral color variations
export const NEUTRAL = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121'
};

// Additional semantic colors
export const INFO = {
  light: '#4fc3f7',
  main: '#29b6f6',
  dark: '#0288d1',
  contrastText: '#ffffff'
};

export const SUCCESS = {
  light: '#81c784',
  main: '#4caf50',
  dark: '#388e3c',
  contrastText: '#ffffff'
};

export const WARNING = {
  light: '#ffb74d',
  main: '#ff9800',
  dark: '#f57c00',
  contrastText: 'rgba(0, 0, 0, 0.87)'
};

export const ERROR = {
  light: '#e57373',
  main: '#f44336',
  dark: '#d32f2f',
  contrastText: '#ffffff'
};

// Usage example for Material UI theme
export const themeColors = {
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  neutral: NEUTRAL
};

export default themeColors;