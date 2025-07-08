import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import ReactPlayer from 'react-player';
import axios from 'axios';

const MemoryGallery = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get('/api/memories');
        setMemories(response.data);
      } catch (err) {
        setError('Failed to load memories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Memory Gallery
      </Typography>
      
      <Grid container spacing={4}>
        {memories.map((memory) => (
          <Grid item xs={12} sm={6} md={4} key={memory._id}>
            <Card>
              <CardMedia>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <ReactPlayer
                    url={memory.animationUrl}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    controls
                  />
                </Box>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {memory.description.substring(0, 50)}...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created on {new Date(memory.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MemoryGallery; 