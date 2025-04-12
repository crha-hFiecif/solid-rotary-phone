import { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const MOCK_HISTORY = [
  'Stranger Things',
  'The Crown',
  'Breaking Bad',
  'The Mandalorian',
];

const Recommendations = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string>('');

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/recommendations', {
        viewingHistory: MOCK_HISTORY,
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Box sx={{ flex: '1 1 60%', minWidth: '300px' }}>
        <Typography variant="h5" gutterBottom>
          Personalized Recommendations
        </Typography>
        
        <Card sx={{ mb: 3, width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Your Viewing History
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {MOCK_HISTORY.map((show) => (
                <Chip key={show} label={show} color="primary" />
              ))}
            </Box>
            <Button
              variant="contained"
              onClick={getRecommendations}
              disabled={loading}
            >
              Get Recommendations
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : recommendations ? (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recommended for You
              </Typography>
              <Box sx={{ 
                '& p': { margin: '8px 0', lineHeight: 1.6 },
                '& h1, & h2, & h3': { 
                  margin: '16px 0 8px',
                  color: '#1976d2',
                  fontWeight: 600
                },
                '& ul, & ol': { 
                  paddingLeft: '20px',
                  '& li': {
                    marginBottom: '8px',
                  }
                },
                '& code': { 
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                },
                '& a': {
                  color: '#2196f3',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                },
                '& blockquote': {
                  borderLeft: '4px solid #64b5f6',
                  margin: '16px 0',
                  padding: '8px 16px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '4px'
                }
              }}>
                <ReactMarkdown>{recommendations}</ReactMarkdown>
              </Box>
            </CardContent>
          </Card>
        ) : null}
      </Box>
      <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
        <Card sx={{ 
          height: '100%',
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backgroundColor: 'rgba(33, 150, 243, 0.05)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            alt="Workspace with laptop and notebook"
            style={{ 
              width: '100%',
              maxWidth: '300px',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '16px'
            }}
          />
          <Typography variant="body1" color="text.secondary" align="center">
            Get personalized recommendations based on your interests and preferences.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default Recommendations; 