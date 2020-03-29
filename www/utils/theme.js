import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#44B244',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#44B244',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
    },
    action: {
      active: '#44B244',
    }
  },
});

export default theme;