import { createTheme } from '@mui/material/styles';

const darkPalette = createTheme({
  palette: {
    mode: 'dark',

    background: {
      primary: '#0D0D0D',
      secondary: '#3F3F45',
      default: '#272727',
    },

    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1A3',
      error: '#F43D50',
      success: '#28FFBB',
      link: '#00d0ffc2',
      highlight: '#007C82',
    },

    component: {
      highlight: '#007C82',
    }
  },

  typography: {
    h1: { fontWeight: 600, fontSize: 'clamp(2rem, 4vw + 1rem, 2.5rem)', color: '#E5E5E7' },
    h2: { fontWeight: 500, fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2rem)', color: '#E5E5E7' },
    h3: { fontWeight: 500, fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 1.75rem)', color: '#E5E5E7' },
    h4: { fontWeight: 500, fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)', color: '#E5E5E7' },
    h5: { fontWeight: 500, fontSize: 'clamp(1.1rem, 1.5vw + 0.4rem, 1.25rem)', color: '#E5E5E7' },
    h6: { fontWeight: 500, fontSize: 'clamp(0.9rem, 1.2vw + 0.3rem, 1rem)', color: '#E5E5E7' },
    body1: { fontWeight: 400, fontSize: 'clamp(0.9rem, 1vw + 0.3rem, 1rem)', lineHeight: 1.6, color: '#A1A1A3' },
    p: { fontWeight: 500, fontSize: 'clamp(0.8rem, 0.8vw + 0.3rem, 0.875rem)', color: '#A1A1A3' },
  },
});

export default darkPalette;
