import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ResponseMessageContext, ResponseMessageContextSetter } from '../../App';
import { Alert, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';

const InsResetPassword = () => {
  // Hooks
  const params = useParams();

  // Contexts
  const responseMessage = React.useContext(ResponseMessageContext);
  const setResponseMessage = React.useContext(ResponseMessageContextSetter);
  
  // States
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState({ newPassword: '', confirmPassword: '', institutionCode: params.institution });

  // Close response message
  setTimeout(()=>{ setResponseMessage({ message: '', visible: false }) }, 5000);

  // Functions
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };
  const handleChange = ({currentTarget: input}) => { setFormData({...formData, [input.name]: input.value}) };
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.newPassword === '') {
      setErrorMessage('New password is required');
      return;
    } else if (formData.confirmPassword === '') {
      setErrorMessage('Confirm Password is required');
      return;
    } else if (formData.confirmPassword !== formData.newPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    } else {

      let newCredentials = { password: formData.newPassword }

      setErrorMessage('');
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institutionPersonnel/resetPassword?id=${params.id}&token=${params.token}`, newCredentials)
      .then(response => {
        if (response.status === 201) {
          setFormData({ newPassword: '', confirmPassword: ''});
          setResponseMessage({visible: true, message: response.data});
          setTimeout(()=>{
            window.location.replace(`http://localhost:3030/${params.institution}/auth/signin`);
          }, 3000)
        } 
      })
      .catch(error => { if (error.response && error.response.status >= 400 && error.response.status <= 500){ setErrorMessage(error.response.data.message) }})
    }
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">Medicase</Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Medicase - Reset Password - Institution Personnel</title>
        <meta name="description" content="Medicase, Reset password."/>
      </Helmet>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {responseMessage.visible && <Alert sx={{marginTop: 5, marginBottom: 5}} severity="success">{responseMessage.message}</Alert>}
          
          <Typography component="h1" variant="h3">MEDICASE</Typography>
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5">Reset password</Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {errorMessage && <Alert sx={{marginTop: 5}} severity="error">{errorMessage}</Alert>}
            
            <Typography component='p' marginTop={2}>Create new password</Typography>
            <FormControl fullWidth size='small' variant="outlined">
              <OutlinedInput id="outlined-adornment-password" name="newPassword" onChange={handleChange} value={formData.newPassword || ''} type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            
            <Typography component='p' marginTop={2}>Confirm Password</Typography>
            <FormControl fullWidth size='small' variant="outlined">
              <OutlinedInput id="outlined-adornment-password2" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword || ''} type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Reset Password</Button>
            <Grid container>
              <Grid item xs>
                <Link href={`/${params.institution}/auth/signin`} variant="body2">Remember your password?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default InsResetPassword
