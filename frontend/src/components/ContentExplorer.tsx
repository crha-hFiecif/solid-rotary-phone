import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const QUESTION_TYPES = [
  'What is this show about?',
  'Who are the main actors?',
  'What genre is this?',
  'Is this show suitable for children?',
  'What are critics saying about this?',
];

const ContentExplorer = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState(QUESTION_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [information, setInformation] = useState('');

  const handleExplore = async () => {
    if (!title) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/content-info', {
        title,
        question,
      });
      setInformation(response.data.information);
    } catch (error) {
      console.error('Error fetching content information:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          Content Explorer
        </Typography>

        <Card sx={{ mb: 3, width: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Show or Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
              
              <FormControl fullWidth>
                <InputLabel>What would you like to know?</InputLabel>
                <Select
                  value={question}
                  label="What would you like to know?"
                  onChange={(e) => setQuestion(e.target.value)}
                >
                  {QUESTION_TYPES.map((q) => (
                    <MenuItem key={q} value={q}>
                      {q}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleExplore}
                disabled={!title || loading}
              >
                Get Information
              </Button>
            </Box>
          </CardContent>
        </Card>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : information ? (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About "{title}"
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
                <ReactMarkdown>{information}</ReactMarkdown>
              </Box>
            </CardContent>
          </Card>
        ) : null}
      </Grid>
      <Grid container item xs={12} md={4}>
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
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
            alt="Movie Information"
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2
            }}
          />
          <Typography variant="h6" align="center" gutterBottom>
            Explore Content Details
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Get detailed information about your favorite shows and movies, from plot summaries to cast details.
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContentExplorer; 