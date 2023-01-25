import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// Home pages
import Home from './pages/Home';
import Institutions from './pages/Institutions';
import LandingPage from './pages/LandingPage';

// Patient pages
import PatientAuthentication from './pages/patient/authentication/Authentication';
import PatientSignin from './components/authenticationRelated/PatientSignin';
import PatientSignup from './components/authenticationRelated/PatientSignup';
import PatientAccount from './pages/admin/dashboard/Dashboard';
import AdminForgotPassword from './components/authenticationRelated/AdminForgotPassword';
import PatientForgotPassword from './components/authenticationRelated/PatientForgotPassword';

// System Admin pages
import Admin from './pages/admin/Admin';
import AdminAuthentication from './pages/admin/authentication/AdminAuthentication';
import AdminSignin from './components/authenticationRelated/AdminSignin';
import AdminSignup from './components/authenticationRelated/AdminSignup';
import Dashboard from './pages/admin/dashboard/Dashboard';
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

// Institution pages
import InstitutionPersonnel from './pages/institutionPersonel/InstitutionPersonnel';
import InstitutionAuthentication from './pages/institutionPersonel/authentication/InstitutionAuthentication';
import InstitutionSignin from './components/authenticationRelated/InsSignin';
import InstitutionSignup from './components/authenticationRelated/InsSignup';
import InstitutionForgotPassword from './components/authenticationRelated/InstitutionForgotPassword';
import InstitutionDashboard from './pages/institutionPersonel/dashboard/Dashboard';
import InstitutionDashBoardHome from './pages/institutionPersonel/dashboard/DashBoardHome';
import InstitutionReports from './pages/institutionPersonel/dashboard/Reports';
import InstitutionIndividuals from './pages/institutionPersonel/dashboard/Personnel';
import InstitutionPatients from './pages/institutionPersonel/dashboard/Patients';
import InstitutionRecords from './pages/institutionPersonel/dashboard/Records';
import InstitutionDoctors from './pages/institutionPersonel/dashboard/Doctors';
import InstitutionNurses from './pages/institutionPersonel/dashboard/Nurses';
import InstitutionPharmacists from './pages/institutionPersonel/dashboard/Pharmacists';
import InstitutionAccount from './pages/institutionPersonel/dashboard/Account';
import ErrorPage from './pages/ErrorPage';

// Contexts declaration 
export var ResponseMessageContext = createContext();
export var ResponseMessageContextSetter = createContext();

export var ShowModalContext = createContext();
export var ShowModalContextSetter = createContext();

export var PopupPayLoadContext = createContext();
export var PopupPayLoadContextSetter = createContext();


function App() {

  // Local data
  const adminToken = localStorage.getItem('admnTok');
  const insttToken = localStorage.getItem('insttTok');
  const patToken = localStorage.getItem('patTok');
  
  // States
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
                      <Route path='institutions' element={<Institutions/>}/>
                    </Route>

                    {/* Admin routes  */} 
                    <Route path='/admin/' element={<Admin/>}>
                      {adminToken &&
                        <Route path='dashboard' element={<Dashboard/> } errorElement={<ErrorPage />}>
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

                      <Route path='dashboard' exact element={<Navigate replace to='/admin/auth/signin/' />} >
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
                      </Route>
                    </Route>

                    {/* Institution and institution Personel routes  */}
                    <Route path={`/:institution`} element={<InstitutionPersonnel/>}>
                      <Route exact path='*' element={<ErrorPage />} />
                      <Route exact path='dashboard' element={insttToken ? <InstitutionDashboard/> : <Navigate replace to={`../auth/signin`} />}>
                        <Route path='' element={insttToken ? <InstitutionDashBoardHome /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='reports' element={insttToken ? <InstitutionReports /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='patients' element={insttToken ? <InstitutionPatients /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='records' element={insttToken ? <InstitutionRecords /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='personnel' element={insttToken ? <InstitutionIndividuals /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='doctors' element={insttToken ? <InstitutionDoctors /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='nurses' element={insttToken ? <InstitutionNurses /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='pharmacists' element={insttToken ? <InstitutionPharmacists /> : <Navigate replace to={`auth/signin`} />} />
                        <Route path='account' element={insttToken ? <InstitutionAccount /> : <Navigate replace to={`auth/signin`} />} />
                      </Route>
                      <Route path='auth' element={<InstitutionAuthentication/>}>
                        <Route path='' element={<InstitutionSignin/>}/>
                        <Route path='signin' element={<InstitutionSignin/>}/>
                        <Route path='signup' element={<InstitutionSignup/>}/>
                        <Route path='forgotPassword' element={<InstitutionForgotPassword/>}/>
                      </Route>
                    </Route>

                    {/* User/Patient routes  */}
                    {patToken && 
                      <Route path='/user/account/' element={<PatientAccount/>}>
                      
                      </Route>
                    }
                    <Route path='/user/' element={<PatientAuthentication/>}>
                      <Route path='signin/' element={<PatientSignin/>}/>
                      <Route path='signup/' element={<PatientSignup/>}/>
                      <Route path='forgotPassword/' element={<PatientForgotPassword/>}/>
                    </Route>

                    {/* Error page */}
                    <Route path='*' element={<Navigate to='/' />} />   

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
