import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Chip,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const COMMON_QUESTIONS = [
  'How do I connect to Wi-Fi?',
  'How do I adjust picture settings?',
  'How do I set up parental controls?',
  'How do I connect a Bluetooth device?',
  'How do I update my TV software?',
];

const FeatureGuide = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState('');

  const handleAskQuestion = async (q: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/feature-guide', {
        question: q,
      });
      setGuide(response.data.guide);
    } catch (error) {
      console.error('Error fetching guide:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        TV Feature Guide
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Common Questions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {COMMON_QUESTIONS.map((q) => (
              <Chip
                key={q}
                label={q}
                onClick={() => {
                  setQuestion(q);
                  handleAskQuestion(q);
                }}
                clickable
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Ask Your Own Question
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="What would you like help with?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            <Button
              variant="contained"
              onClick={() => handleAskQuestion(question)}
              disabled={!question || loading}
              sx={{ minWidth: '120px' }}
            >
              Get Help
            </Button>
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : guide ? (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Guide
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
              <ReactMarkdown>{guide}</ReactMarkdown>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
};

export default FeatureGuide; 