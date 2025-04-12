import { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import Recommendations from './components/Recommendations';
import ContentExplorer from './components/ContentExplorer';
import FeatureGuide from './components/FeatureGuide';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3', // Bright blue
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff9800', // Orange for accents
      light: '#ffb74d',
      dark: '#f57c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
      color: '#1976d2',
    },
    h5: {
      fontWeight: 600,
      color: '#1976d2',
    },
    h6: {
      fontWeight: 600,
      color: '#2196f3',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(33, 150, 243, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(33, 150, 243, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.MuiChip-outlined': {
            borderColor: '#2196f3',
            color: '#2196f3',
          },
        },
      },
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('recommendations');

  const renderContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return <Recommendations />;
      case 'explorer':
        return <ContentExplorer />;
      case 'guide':
        return <FeatureGuide />;
      default:
        return <Recommendations />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Smart TV Assistant
            </Typography>
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <Paper sx={{ 
              mt: 3, 
              p: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
              {renderContent()}
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
