import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0081c6',
    },
    secondary: {
      main: grey.A700,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
