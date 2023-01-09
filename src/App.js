import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminAuthentication from './pages/admin/authentication/AdminAuthentication';
import AdminSignin from './components/authenticationRelated/AdminSignin';
import AdminSignup from './components/authenticationRelated/AdminSignup';
import Dashboard from './pages/admin/dashboard/dashboard';
import HospitalAuthentication from './pages/admin/authentication/AdminAuthentication';
import HospitalSignin from './components/authenticationRelated/HPSignin';
import HospitalSignup from './components/authenticationRelated/HPSignup';
import HospitalDashboard from './pages/admin/dashboard/dashboard';
import HospitalPersonelAccount from './pages/admin/dashboard/dashboard';
import PatientAuthentication from './pages/admin/authentication/AdminAuthentication';
import PatientSignin from './components/authenticationRelated/PatientSignin';
import PatientSignup from './components/authenticationRelated/PatientSignup';
import PatientAccount from './pages/admin/dashboard/dashboard';
import AdminForgotPassword from './components/authenticationRelated/AdminForgotPassword';
import HospitalForgotPassword from './components/authenticationRelated/HospitalForgotPassword';
import PatientForgotPassword from './components/authenticationRelated/PatientForgotPassword';
import Institutions from './pages/Institutions';
import LandingPage from './pages/LandingPage';

export var ResponseMessageContext = createContext();
export var ResponseMessageContextSetter = createContext();

function App() {

  const [responseMessage, setResponseMessage] = useState({
    message: '',
    visible: false
  });

  return (
    <ResponseMessageContext.Provider value={responseMessage}>
      <ResponseMessageContextSetter.Provider value={setResponseMessage}>
        <Router>
          <Routes>
            
            {/* Admin routes  */}
            <Route path='/' element={<Home/>}>
              <Route path='' element={<LandingPage/>} />
              <Route path='institutions/' element={<Institutions/>}/>
            </Route>
            <Route path='/admin/' element={<AdminAuthentication/>}>
              <Route path='signin/' element={<AdminSignin/>}/>
              <Route path='signup/' element={<AdminSignup/>}/>
              <Route path='forgotPassword/' element={<AdminForgotPassword/>}/>
            </Route>
            <Route path='/admin/dashboard/' element={<Dashboard/>}>
            </Route>

            {/* Hospital and hospital Personel routes  */}
            <Route path='/hp/' element={<HospitalAuthentication/>}>
              <Route path='signin/' element={<HospitalSignin/>}/>
              <Route path='signup/' element={<HospitalSignup/>}/>
              <Route path='forgotPassword/' element={<HospitalForgotPassword/>}/>
            </Route>
            <Route path='/hp/dashboard/' element={<HospitalDashboard/>}>
            </Route>
            <Route path='/hp/user/' element={<HospitalPersonelAccount/>}>
            </Route>
            
            {/* User routes  */}
            <Route path='/user/' element={<PatientAuthentication/>}>
              <Route path='signin/' element={<PatientSignin/>}/>
              <Route path='signup/' element={<PatientSignup/>}/>
              <Route path='forgotPassword/' element={<PatientForgotPassword/>}/>
            </Route>
            <Route path='/user/account/' element={<PatientAccount/>}>
            </Route>

          </Routes>
        </Router>
      </ResponseMessageContextSetter.Provider>
    </ResponseMessageContext.Provider>
  );
}

export default App;
