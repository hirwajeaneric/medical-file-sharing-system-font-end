import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminAuthentication from './pages/admin/authentication/AdminAuthentication';
import AdminSignin from './components/authenticationRelated/AdminSignin';
import AdminSignup from './components/authenticationRelated/AdminSignup';
import Dashboard from './pages/admin/dashboard/Dashboard';
import HospitalAuthentication from './pages/admin/authentication/AdminAuthentication';
import HospitalSignin from './components/authenticationRelated/HPSignin';
import HospitalSignup from './components/authenticationRelated/HPSignup';
import HospitalDashboard from './pages/admin/dashboard/Dashboard';
import HospitalPersonelAccount from './pages/admin/dashboard/Dashboard';
import PatientAuthentication from './pages/patient/authentication/Authentication';
import PatientSignin from './components/authenticationRelated/PatientSignin';
import PatientSignup from './components/authenticationRelated/PatientSignup';
import PatientAccount from './pages/admin/dashboard/Dashboard';
import AdminForgotPassword from './components/authenticationRelated/AdminForgotPassword';
import HospitalForgotPassword from './components/authenticationRelated/HospitalForgotPassword';
import PatientForgotPassword from './components/authenticationRelated/PatientForgotPassword';
import Institutions from './pages/Institutions';
import LandingPage from './pages/LandingPage';
import DashBoardHome from './pages/admin/dashboard/DashBoardHome';
import Reports from './pages/admin/dashboard/Reports';
import Patients from './pages/admin/dashboard/Patients';
import Records from './pages/admin/dashboard/Records';
import Doctors from './pages/admin/dashboard/Doctors';
import Nurses from './pages/admin/dashboard/Nurses';
import Hospitals from './pages/admin/dashboard/Hospitals';
import Pharmacies from './pages/admin/dashboard/Pharmacies';
import Requests from './pages/admin/dashboard/Requests';
import Account from './pages/admin/dashboard/Account';
import Admin from './pages/admin/Admin';

// Contexts declaration 
export var ResponseMessageContext = createContext();
export var ResponseMessageContextSetter = createContext();

export var ShowModalContext = createContext();
export var ShowModalContextSetter = createContext();

export var PopupPayLoadContext = createContext();
export var PopupPayLoadContextSetter = createContext();


function App() {
  // States
  const adminToken = localStorage.getItem('admnTok');
  const [responseMessage, setResponseMessage] = useState({ message: '', visible: false });
  const [showModal, setShowModal] = useState(false);
  const [popupPayLoad, setPopupPayLoad] = useState({ type: '', id: ''});

  return (
    <ResponseMessageContext.Provider value={responseMessage}>
      <ResponseMessageContextSetter.Provider value={setResponseMessage}>
        <ShowModalContext.Provider value={showModal}>
          <ShowModalContextSetter.Provider value={setShowModal}>
            <PopupPayLoadContext.Provider value={popupPayLoad}>
              <PopupPayLoadContextSetter.Provider value={setPopupPayLoad}>
                
                {/* Routing  */}
                <Router>
                  <Routes>
                    
                    {/* Home  */}
                    <Route path='/' element={<Home/>}>
                      <Route path='' element={<LandingPage/>} />
                      <Route path='institutions/' element={<Institutions/>}/>
                    </Route>

                    {/* Admin routes  */} 
                    <Route path='/admin/' element={<Admin/>}>
                      {adminToken &&
                        <Route path='dashboard' element={<Dashboard/>}>
                          <Route path='' element={<DashBoardHome />} />
                          <Route path='reports' element={<Reports />} />
                          <Route path='patients' element={<Patients />} />
                          <Route path='records' element={<Records />} />
                          <Route path='doctors' element={<Doctors />} />
                          <Route path='nurses' element={<Nurses />} />
                          <Route path='hospitals' element={<Hospitals />} />
                          <Route path='pharmacies' element={<Pharmacies />} />
                          <Route path='requests' element={<Requests />} />
                          <Route path='account' element={<Account />} />
                        </Route>
                      }

                      <Route path='auth' element={<AdminAuthentication/>}>
                        <Route path='' element={<AdminSignin/>}/>
                        <Route path='signin' element={<AdminSignin/>}/>
                        <Route path='signup' element={<AdminSignup/>}/>
                        <Route path='forgotPassword' element={<AdminForgotPassword/>}/>
                      </Route>

                      {/* <Route path='dashboard' exact element={<Navigate replace to='/admin/auth/signin/' />} >
                        <Route path='' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='reports' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='patients' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='records' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='doctors' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='nurses' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='pharmacies' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='hospitals' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='requests' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                        <Route path='account' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                      </Route> */}
                    </Route>


                    {/* Hospital and hospital Personel routes  */}
                    <Route path='/hp/:name' element={<HospitalAuthentication/>}>
                      <Route path='signin/' element={<HospitalSignin/>}/>
                      <Route path='signup/' element={<HospitalSignup/>}/>
                      <Route path='forgotPassword/' element={<HospitalForgotPassword/>}/>
                    </Route>
                    <Route path='/hp/:name/dashboard/' element={<HospitalDashboard/>}>
                    </Route>
                    <Route path='/hp/:name/user/:userCode' element={<HospitalPersonelAccount/>}>
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

              </PopupPayLoadContextSetter.Provider>
            </PopupPayLoadContext.Provider>
          </ShowModalContextSetter.Provider>  
        </ShowModalContext.Provider>
      </ResponseMessageContextSetter.Provider>
    </ResponseMessageContext.Provider>
  );
}

export default App;
