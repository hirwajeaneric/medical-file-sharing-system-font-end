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
import { useNavigate } from 'react-router-dom';
import { ResponseMessageContext, ResponseMessageContextSetter } from '../../App';
import { Alert, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';

const AdminSignup = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const setResponseMessage = React.useContext(ResponseMessageContextSetter);
  const responseMessage = React.useContext(ResponseMessageContext);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = ({currentTarget: input}) => {
    setFormData({...formData, [input.name]: input.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.firstName === '') {
      setErrorMessage('First name is required');
      return;
    } else if (formData.lastName === '') {
      setErrorMessage('Last name is required');
      return;
    } else if (formData.email === '') {
      setErrorMessage('Email is required');
      return;
    } else if (formData.phone === '') {
      setErrorMessage('Phone number is required');
      return;
    } else if (formData.password === '') {
      setErrorMessage('Password is required');
      return;
    } else {
      
      setErrorMessage('');

      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mfss/admin/signup`, formData)
      .then(response => {
        if(response.data) {
          
          setResponseMessage({
            message: "Admin account Created!",
            visible: true
          });

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: ''
          })

          navigate('/admin/auth/signin');
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500){
          setErrorMessage(error.response.data.message);
        }
      })
    }

    if (responseMessage.visible) {
      setTimeout(()=>{
        setResponseMessage({
          message: '',
          visible: false,
        })
      },10000)
    }
  };

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
        <title>Medicase - Sign Up - Admin</title>
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
          <Typography component="h1" variant="h3">
            Admin
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMessage && <Alert sx={{marginTop: 5}} severity="error">{errorMessage}</Alert>}
            <Typography component='p' marginTop={2}>First Name</Typography>
            <TextField
              margin="none"
              required
              fullWidth
              name="firstName"
              onChange={handleChange}
              value={formData.firstName || ''}
              autoComplete="firstName"
              autoFocus
              size='small'
            />
            <Typography component='p' marginTop={2}>Last Name</Typography>
            <TextField
              margin="none"
              required
              fullWidth
              name="lastName"
              onChange={handleChange}
              value={formData.lastName || ''}
              autoComplete="lastName"
              autoFocus
              size='small'
            />
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
            <Typography component='p' marginTop={2}>Phone number</Typography>
            <TextField
              margin="none"
              required
              fullWidth
              name="phone"
              onChange={handleChange}
              value={formData.phone || ''}
              autoComplete="phone"
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/admin/auth/signin" variant="body2">
                  {"Aleardy have an account? Sign In"}
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

export default AdminSignup
