import { createTheme } from '@mui/material/styles';

import styles from "../global.scss";

export const theme = createTheme({
  typography: {
    fontFamily: "urbanist",
    h1: {
      fontWeight: 900,
      fontSize: "148px"
    },
    h2: {
      fontWeight: 800,
      fontSize: "108px"
    },
    h3: {
      fontWeight: 700,
      fontSize: "72px"
    },
    h4: {
      fontWeight: 600,
      fontSize: "48px"
    },
    h5: {
      fontWeight: 600,
      fontSize: "32px"
    },
    h6: {
      fontWeight: 600,
      fontSize: "24px"
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "20px"
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "18px"
    },
    body1: {
      fontWeight: 500,
      fontSize: "18px"
    },
    body2: {
      fontWeight: 500,
      fontSize: "16px"
    },
    button: {
      fontWeight: 700,
      fontSize: "16px"
    },
    caption: {
      fontWeight: 500,
      fontSize: "14px"
    }
  },
  breakpoints: {
    keys:  ['xs', 'sm', 'ms', 'md', 'lg', 'xl'],
    values: {xs: 0, sm: 600, ms: 698, md: 900, lg: 1200, xl: 1536}
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "48px",
          minWidth: "80px",
          borderRadius: "12px",
          padding: "0px 15px"
        },
        outlined: {
          borderWidth: "1px",
          borderColor: "#0f1922",
          color: "#0f1922",
          "&: hover": {
            borderWidth: "1px",
            borderColor: "#0f1922",
            backgroundColor: "#e1e1e1"
          }
        },
        contained: {
          backgroundColor: "#0f1922",
          "&: hover": {
            backgroundColor: "#eb4034"
          }
        },
        text: {
          color: "#0f1922",
          backgroundColor: "#fce095",
          "&: hover": {
            backgroundColor: "#ffc324"
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: "#eb4034",
          textDecorationColor: "#eb4034",
          fontSize: "18px",
          "&: hover": {
            cursor: "pointer",
            textDecorationColor: "#0f1922",
          }
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: "rgba( 58, 58, 58, 0.25 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4.5px )",
          "-webkit-backdrop-filter": "blur( 4.5px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "12px 15px",
          borderRadius: "12px",
          '& fieldset': {
            borderColor: '#e1e1e1',
          },
          // '&:hover fieldset': {
          //   borderColor: 'white',
          // },
          // '&Mui-focused fieldset': {
          //   borderColor: 'yellow',
          // },
        },
        input: { padding: "0px" }
      }
    },
  },
});

console.log(theme)