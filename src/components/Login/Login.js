import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { LockOutlined, PersonOutline } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import  logo from "../Images/logo512.png"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic
    navigate('/dashboard');
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={styles.main}>
      <img className={styles.logo} src={logo} height={50} width={50} title='PK Pani Wala'  alt='PK Pani Wala' />
      <Container maxWidth="sm" className={styles.container}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar className={styles.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" className={styles.title}>
            Admin Login
          </Typography>
        </Box>
        <Divider variant="middle" className={styles.divider} />
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
                className={styles.input}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={styles.input}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={styles.button}
          >
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
