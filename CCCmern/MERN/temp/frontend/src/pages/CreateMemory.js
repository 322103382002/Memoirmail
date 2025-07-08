import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const CreateMemory = () => {
  const [memory, setMemory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/memories', { description: memory });
      
      // Check if the memory was created successfully
      if (response.data && response.data._id) {
        navigate(`/gallery/${response.data._id}`);
      } else {
        throw new Error('Failed to create memory');
      }
    } catch (err) {
      console.error('Memory creation error:', err);
      setError(err.response?.data?.message || 'Failed to create memory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Memory
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Share a childhood memory, and we'll transform it into a beautiful animation.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Your Memory"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            placeholder="Describe your childhood memory in detail..."
            required
            disabled={loading}
            sx={{ mb: 3 }}
          />
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ width: '100%' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Animation'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateMemory; 