import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminAuthentication from './pages/admin/authentication/AdminAuthentication';
import AdminSignin from './components/authenticationRelated/AdminSignin';
import AdminSignup from './components/authenticationRelated/AdminSignup';
import Dashboard from './pages/admin/dashboard/dashboard';
import HospitalAuthentication from './pages/admin/authentication/AdminAuthentication';
import HospitalSignin from './components/authenticationRelated/AdminSignin';
import HospitalSignup from './components/authenticationRelated/AdminSignup';
import HospitalDashboard from './pages/admin/dashboard/dashboard';
import HospitalPersonelAccount from './pages/admin/dashboard/dashboard';
import PatientAuthentication from './pages/admin/authentication/AdminAuthentication';
import PatientSignin from './components/authenticationRelated/AdminSignin';
import PatientSignup from './components/authenticationRelated/AdminSignup';
import PatientAccount from './pages/admin/dashboard/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Admin routes  */}
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/' element={<AdminAuthentication/>}>
          <Route path='signin/' element={<AdminSignin/>}/>
          <Route path='signup/' element={<AdminSignup/>}/>
        </Route>
        <Route path='/admin/dashboard/' element={<Dashboard/>}>
        </Route>

        {/* Hospital and hospital Personel routes  */}
        <Route path='/hp/' element={<HospitalAuthentication/>}>
          <Route path='signin/' element={<HospitalSignin/>}/>
          <Route path='signup/' element={<HospitalSignup/>}/>
        </Route>
        <Route path='/hp/dashboard/' element={<HospitalDashboard/>}>
        </Route>
        <Route path='/hp/user/' element={<HospitalPersonelAccount/>}>
        </Route>
        
        {/* User routes  */}
        <Route path='/user/' element={<PatientAuthentication/>}>
          <Route path='signin/' element={<PatientSignin/>}/>
          <Route path='signup/' element={<PatientSignup/>}/>
        </Route>
        <Route path='/user/account/' element={<PatientAccount/>}>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
