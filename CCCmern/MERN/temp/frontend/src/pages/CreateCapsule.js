import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateCapsule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      sendTo: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .required('Title is required'),
      content: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required'),
      sendTo: Yup.string()
        .email('Invalid email address')
        .required('Recipient email is required'),
    }),
    onSubmit: async (values) => {
      if (!selectedDate) {
        toast.error('Please select a delivery date');
        return;
      }

      try {
        await axios.post(
          '/api/capsules',
          {
            ...values,
            unlockDate: selectedDate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        toast.success('Time capsule created successfully!');
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to create time capsule');
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create Time Capsule
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" paragraph>
            Write a message to be delivered in the future
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="content"
                  name="content"
                  label="Message"
                  multiline
                  rows={6}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  error={formik.touched.content && Boolean(formik.errors.content)}
                  helperText={formik.touched.content && formik.errors.content}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="sendTo"
                  name="sendTo"
                  label="Recipient Email"
                  type="email"
                  value={formik.values.sendTo}
                  onChange={formik.handleChange}
                  error={formik.touched.sendTo && Boolean(formik.errors.sendTo)}
                  helperText={formik.touched.sendTo && formik.errors.sendTo}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Delivery Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    minDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!selectedDate}
                        helperText={!selectedDate ? 'Please select a delivery date' : ''}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!selectedDate}
              >
                Create Capsule
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateCapsule;