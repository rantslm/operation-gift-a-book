import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A65338",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#68785C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFCF7",
      paper: "#F8EBDD",
    },
    text: {
      primary: "#514238",
      secondary: "#75665B",
    },
    divider: "#E5D6C6",
  },

  typography: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 16,

    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
    },

    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "clamp(2rem, 4vw, 3rem)",
    },

    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1.75rem",
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
          minHeight: 48,
          fontSize: "1rem",
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #E5D6C6",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
      },
    },
  },
});

export default theme;