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
import HospitalPersonnels from './pages/admin/dashboard/Personnel';
import Hospitals from './pages/admin/dashboard/Hospitals';
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
import InstitutionPatients from './pages/institutionPersonel/dashboard/ListOfPatients';
import ListPatients from './pages/institutionPersonel/dashboard/Patients';
import InstitutionRecords from './pages/institutionPersonel/dashboard/Records';
import AddPatient from './pages/institutionPersonel/dashboard/AddPatient';
import ListOfPersonnel from './pages/institutionPersonel/dashboard/ListOfPersonnel';
import InstitutionPharmacists from './pages/institutionPersonel/dashboard/Pharmacists';
import InstitutionAccount from './pages/institutionPersonel/dashboard/Account';
import ErrorPage from './pages/ErrorPage';
import PatientDetails from './pages/institutionPersonel/dashboard/PatientDetails';
import PatientFilesAndRecords from './pages/institutionPersonel/dashboard/PatientFilesAndRecords';
import NewFile from './pages/institutionPersonel/dashboard/NewFile';
import PatientsStats from './pages/institutionPersonel/dashboard/PatientsStats';
import RecordAndFilesStats from './pages/institutionPersonel/dashboard/RecordAndFilesStats';
import PersonnelStats from './pages/institutionPersonel/dashboard/PersonnelStats';
import InsResetPassword from './components/authenticationRelated/InsResetPassword';
import Institution from './pages/institutionPersonel/dashboard/Institution';

// Contexts declaration 
export var ResponseMessageContext = createContext();
export var ResponseMessageContextSetter = createContext();

export var ShowModalContext = createContext();
export var ShowModalContextSetter = createContext();

export var PopupPayLoadContext = createContext();
export var PopupPayLoadContextSetter = createContext();

export var RecordDetailsContext = createContext();
export var RecordDetailsContextSetter = createContext();


function App() {

  // Local data
  const adminToken = localStorage.getItem('admnTok');
  const insttAdminToken = localStorage.getItem('insttAdmTok');
  const insttDoctorToken = localStorage.getItem('insttDocTok');
  const insttNurseToken = localStorage.getItem('insttNurTok');
  const insttLabTechnitianToken = localStorage.getItem('insttLabTok');
  const patToken = localStorage.getItem('patTok');
  
  // States
  const [responseMessage, setResponseMessage] = useState({ message: '', visible: false });
  const [showModal, setShowModal] = useState(false);
  const [popupPayLoad, setPopupPayLoad] = useState({ type: '', id: ''});
  const [recordDetails, setRecordDetails] = useState('');

  return (
    <ResponseMessageContext.Provider value={responseMessage}>
      <ResponseMessageContextSetter.Provider value={setResponseMessage}>
        <ShowModalContext.Provider value={showModal}>
          <ShowModalContextSetter.Provider value={setShowModal}>
            <PopupPayLoadContext.Provider value={popupPayLoad}>
              <PopupPayLoadContextSetter.Provider value={setPopupPayLoad}>
                <RecordDetailsContext.Provider value={recordDetails}>
                  <RecordDetailsContextSetter.Provider value={setRecordDetails}>
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
                              <Route path='personnel' element={<HospitalPersonnels />} />
                              <Route path='hospitals' element={<Hospitals />} />
                              <Route path='requests' element={<Requests />} />
                              <Route path='account' element={<Account />} />
                            </Route>
                          }

                          <Route path='auth' element={<AdminAuthentication/>}>
                            <Route path='' element={<AdminSignin/>}/>
                            <Route path='signin' element={<AdminSignin/>}/>
                            <Route path='signup' element={<AdminSignup/>}/>
                            <Route path='forgotPassword' element={<AdminForgotPassword/>}/>
                            {/* <Route path='resetPassword' element={<AdminForgotPassword/>}/> */}
                          </Route>

                          <Route path='dashboard' exact element={<Navigate replace to='/admin/auth/signin/' />} >
                            <Route path='' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='reports' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='patients' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='records' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='personnel' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='hospitals' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='requests' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                            <Route path='account' exact element={<Navigate replace to='/admin/auth/signin/' />} />
                          </Route>
                        </Route>

                        {/* Institution and institution Personel routes  */}
                        <Route path={`/:institution/`} element={<InstitutionPersonnel/>}>
                          <Route exact path='*' element={<ErrorPage />} />
                          <Route exact path=':role/' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionDashboard/> : <Navigate replace to={`../auth/signin`} />}>
                            <Route path='' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionDashBoardHome /> : <Navigate replace to={`auth/signin`} />} >
                              <Route path='' element={<PatientsStats/>}/>
                              <Route path='pa' element={<PatientsStats/>}/>
                              <Route path='per' element={<PersonnelStats/>}/>
                              <Route path='rec' element={<RecordAndFilesStats/>}/>
                            </Route>
                            <Route path='reports' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionReports /> : <Navigate replace to={`auth/signin`} />} />
                            <Route path='patients' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <ListPatients /> : <Navigate replace to={`auth/signin`} />} >
                              <Route path='' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionPatients /> : <Navigate replace to={`auth/signin`} />} />
                              <Route path='new' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <AddPatient /> : <Navigate replace to={`auth/signin`} />} />
                              <Route path=':id' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <PatientFilesAndRecords /> : <Navigate replace to={`auth/signin`} />}>
                                <Route path='' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <PatientDetails /> : <Navigate replace to={`auth/signin`} />} />
                                <Route path='new' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <NewFile /> : <Navigate replace to={`auth/signin`} />} />
                              </Route>
                            </Route>
                            <Route path='records' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionRecords /> : <Navigate replace to={`auth/signin`} />} />
                            <Route path='personnel' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionIndividuals /> : <Navigate replace to={`auth/signin`} />}>
                              <Route path='' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <ListOfPersonnel /> : <Navigate replace to={`auth/signin`} />} />
                            </Route>
                            <Route path='pharmacists' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionPharmacists /> : <Navigate replace to={`auth/signin`} />} />
                            <Route path='account' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <InstitutionAccount /> : <Navigate replace to={`auth/signin`} />} />
                            <Route path='institution' element={(insttAdminToken || insttDoctorToken || insttLabTechnitianToken || insttNurseToken) ? <Institution /> : <Navigate replace to={`auth/signin`} />} />
                          </Route>
                          <Route path='auth' element={<InstitutionAuthentication/>}>
                            <Route path='' element={<InstitutionSignin/>}/>
                            <Route path='signin' element={<InstitutionSignin/>}/>
                            <Route path='signup' element={<InstitutionSignup/>}/>
                            <Route path='forgotPassword' element={<InstitutionForgotPassword/>}/>
                            <Route path='resetPassword/:token/:id' element={<InsResetPassword/>}/>
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
                  </RecordDetailsContextSetter.Provider>
                </RecordDetailsContext.Provider>
              </PopupPayLoadContextSetter.Provider>
            </PopupPayLoadContext.Provider>
          </ShowModalContextSetter.Provider>  
        </ShowModalContext.Provider>
      </ResponseMessageContextSetter.Provider>
    </ResponseMessageContext.Provider>
  );
}

export default App;
