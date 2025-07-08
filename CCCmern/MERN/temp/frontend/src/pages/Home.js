import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import { Add, AccessTime, PhotoCamera, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = localStorage.getItem('token');

  const features = [
    {
      icon: <AccessTime sx={{ fontSize: 60 }} />,
      title: 'Set Future Delivery',
      description: 'Choose when you want your time capsule to be delivered. It could be next month, next year, or even decades from now.',
    },
    {
      icon: <PhotoCamera sx={{ fontSize: 60 }} />,
      title: 'Add Media',
      description: 'Include photos, videos, or audio recordings to make your time capsule even more special and memorable.',
    },
    {
      icon: <Send sx={{ fontSize: 60 }} />,
      title: 'Automatic Delivery',
      description: 'Your time capsule will be automatically delivered via email on the specified date, ensuring your message reaches its destination.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Typography
                component="h1"
                variant={isMobile ? 'h3' : 'h2'}
                gutterBottom
                sx={{
                  fontWeight: 300,
                  mb: 2,
                  letterSpacing: '0.05em',
                }}
              >
                Digital Time Capsule
              </Typography>
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                paragraph
                sx={{
                  maxWidth: 800,
                  mb: 4,
                  fontWeight: 300,
                  opacity: 0.9,
                }}
              >
                Preserve your memories and messages for the future. Create a digital time
                capsule and set it to be delivered to yourself or loved ones at a
                specific date.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Add />}
                  onClick={() => navigate(isAuthenticated ? '/create-capsule' : '/register')}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 0,
                    fontSize: '1.1rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {isAuthenticated ? 'Create New Capsule' : 'Get Started'}
                </Button>
              </motion.div>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in timeout={1000 + index * 200}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 0,
                      bgcolor: 'white',
                      border: '1px solid rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: '#2c3e50',
                        mb: 3,
                        p: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{ 
                        fontWeight: 300,
                        color: '#2c3e50',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      sx={{ 
                        fontWeight: 300,
                        lineHeight: 1.8,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: '#2c3e50',
          py: { xs: 6, md: 8 },
          mt: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              Ready to Preserve Your Memories?
            </Typography>
            <Typography 
              variant="h6" 
              paragraph 
              sx={{ 
                mb: 4,
                fontWeight: 300,
                opacity: 0.9,
              }}
            >
              Start creating your digital time capsule today and send messages to the future.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(isAuthenticated ? '/create-capsule' : '/register')}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 0,
                  fontSize: '1.1rem',
                  letterSpacing: '0.05em',
                }}
              >
                {isAuthenticated ? 'Create New Capsule' : 'Get Started'}
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;