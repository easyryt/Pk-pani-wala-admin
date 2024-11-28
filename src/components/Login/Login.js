import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.backend.thenewstale.com/admin/auth/logInAdmin', {
        email: username,
        password,
      });

      if (response.data.status) {
        Cookies.set('token', response.data.token);
        navigate('/dashboard');
      } 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response.data.message;
        alert(errorMessage);
      } else {
        // Network error (e.g., no internet connection)
        alert("Something went wrong");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.main}>
      <Container maxWidth="xs" className={styles.container}>
        <Typography variant="h4" className={styles.title}>Admin Login</Typography>
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            className={styles.input}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className={styles.button}>
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
