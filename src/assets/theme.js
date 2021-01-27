import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightUltraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: 72,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 32,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: 28,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  },
  palette: {
    primary: {
      main: '#1FA1F1',

    },
    secondary: {
      main: '#14202B',
    },
    white: {
      main: '#fff'
    },
    lines: {
      main: 'rgb(56,68,77)'
    }
  },

})

// responsive theme
theme.typography.h1 = {
  ...theme.typography.h1,
  [theme.breakpoints.down('md')]: {
    fontSize: 56,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 40,
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 24,
  },
}

export default theme
