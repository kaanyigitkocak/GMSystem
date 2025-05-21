import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#CC0000", // IYTE kırmızı rengi (Pantone 186C varsayımıyla)
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffffff", // Beyaz
      contrastText: "#CC0000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: "2.2rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "1.8rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.6rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
