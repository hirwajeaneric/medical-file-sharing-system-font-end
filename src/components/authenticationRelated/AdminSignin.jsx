import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ResponseMessageContext, ResponseMessageContextSetter } from '../../App';
import { Alert, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';

const AdminSignin = () => {
  const responseMessage = React.useContext(ResponseMessageContext);
  const setResponseMessage = React.useContext(ResponseMessageContextSetter);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  setTimeout(()=>{
    setResponseMessage({
      message: '',
      visible: false
    })
  }, 5000);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = ({currentTarget: input}) => {
    setFormData({...formData, [input.name]: input.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.email === '') {
      setErrorMessage('Email is required');
      return;
    } else if (formData.password === '') {
      setErrorMessage('Password is required');
      return;
    } else {
      setErrorMessage('');
      axios.post('http://localhost:5050/api/mfss/admin/signin', formData)
      .then(response => {
        if (response.status === 200 && response.data.token) {
          setFormData({
            email: '',
            password: ''
          })

          const {token, id, firstName, lastName, email, phone} = response.data;
          localStorage.setItem('admnTok', token);
          localStorage.setItem('usr', JSON.stringify({id, firstName, lastName, email, phone}));

          window.location.replace('/admin/dashboard/hsp');
        } 
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500){
          setErrorMessage(error.response.data.message);
        }
      })
    }
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Medicase
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Medicase - Sign in - Admin</title>
        <meta name="description" content="Medicase, sign up page for System Admin."/> 
      </Helmet>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {responseMessage.visible && <Alert sx={{marginTop: 5, marginBottom: 5}} severity="success">{responseMessage.message}</Alert>}
          <Typography component="h1" variant="h3">
            Admin
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMessage && <Alert sx={{marginTop: 5}} severity="error">{errorMessage}</Alert>}
            <Typography component='p' marginTop={2}>Email address</Typography>
            <TextField
              margin="none"
              required
              fullWidth
              name="email"
              onChange={handleChange}
              value={formData.email || ''}
              autoComplete="email"
              autoFocus
              size='small'
            />
            <Typography component='p' marginTop={2}>Password</Typography>
            <FormControl 
              fullWidth
              size='small'
              variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                onChange={handleChange}
                value={formData.password || ''}   
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/admin/auth/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/admin/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default AdminSignin
