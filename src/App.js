import './App.scss';
import Router from './router/routes';

import { 
  ThemeProvider 
} from '@mui/material';

import { theme } from './theme/MuiTheme';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="1087559917363-oa6isa4tlaqcbsb3dnpm5rjb4ehpo66o.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
