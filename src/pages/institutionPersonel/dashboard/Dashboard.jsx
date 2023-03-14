import React, { useEffect, useState } from 'react'
import { BiBuilding, BiFileBlank, BiHomeAlt, BiHotel, BiMenuAltLeft, BiPaperPlane, BiUserCheck, BiUserCircle, BiUserX } from 'react-icons/bi'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { DashboardContainer, HospitalName, MainContent, MenuButton, MenuPopup, Mfss, NavigationComponents, NavItem, NavItemContainer, NavItemContainerHome, OutletSpace, SideBar, TitleContainer, TopBar, User } from '../../../components/Dashboard/DashboardComponents'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Helmet } from 'react-helmet-async';
import SearchBoxForPatients from '../../../components/Dashboard/SearchBoxForPatients';

const Dashboard = () => {
  const params = useParams();
  const navigate = useNavigate(); 
  const [userIdentity, setUserIdentity] = useState({});

  useEffect(()=>{
    let isAdminSignedIn = localStorage.getItem('insttAdmTok');
    let isDoctorSignedIn = localStorage.getItem('insttDocTok');
    let isNurseSignedIn = localStorage.getItem('insttNurTok');
    let isLabTechnicianSignedIn = localStorage.getItem('insttLabTok');

    let userData = {};

    if (params.role === 'r' && isAdminSignedIn !== '') {
      userData = JSON.parse(localStorage.getItem('instAdmPe'))
    } else if (params.role === 'd' && isDoctorSignedIn !== '') {
      userData = JSON.parse(localStorage.getItem('instDocPe'));
    } else if (params.role === 'n' && isNurseSignedIn !== '') {
      userData = JSON.parse(localStorage.getItem('instNurPe'));
    }  else if (params.role === 'l' && isLabTechnicianSignedIn !== '') {
      userData = JSON.parse(localStorage.getItem('instLabPe'));
    } else if (userData === null) {
      window.location.replace(`/${params.institution}/auth/signin`)
    }

    setUserIdentity(userData);
  },[params.institution, params.role])

  useEffect(()=>{
    // Setting up the filters:
    if (!localStorage.getItem('filter')) {
      let currentTime = new Date().getTime();
      let midNight = new Date(currentTime + (1 * 24 * 60 * 60 * 1000))
      let updatedTime = new Date(currentTime - (1 * 24 * 60 * 60 * 1000));
      let filter = { 
        from: updatedTime.toLocaleDateString(), 
        to: midNight.toLocaleDateString(), 
      }
      localStorage.setItem('filter', JSON.stringify(filter));
    }
  },[])


  const [isOpen, setIsOpen] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  const minimizeView = (e) => {
    setIsOpen(!isOpen);
  }

  const popup = () => {
    setOpenPopup(!openPopup);
  }

  const logOut = () => {
    setOpenPopup(!openPopup);
    if (userIdentity.role === 'Representative') {
      localStorage.removeItem('insttAdmTok');
      localStorage.removeItem('instAdmPe');
    } else if (userIdentity.role === 'doctor') {
      localStorage.removeItem('insttDocTok');
      localStorage.removeItem('instDocPe');
    } else if (userIdentity.role === 'nurse') {
      localStorage.removeItem('insttNurTok');
      localStorage.removeItem('instNurPe');
    } else if (userIdentity.role === 'lab technician') {
      localStorage.removeItem('insttLabTok');
      localStorage.removeItem('insttLabPe');
    }
    
    localStorage.removeItem('filter');

    navigate(`/${params.institution}/auth/signin`)
  }  

  return (
    <DashboardContainer>
      <Helmet>
        <title>Dashboard Home - Medicase</title>
        <meta name="description" content="Medicase, this is the home page for the insitution. The dashboard."/> 
      </Helmet>
      <SideBar style={{background: userIdentity.institutionType === 'pharmacy' && 'green'}}>
        <TitleContainer>
          <MedicalInformationIcon />
          {isOpen && <Mfss>MFSS</Mfss>}
        </TitleContainer>
        {isOpen && <HospitalName>{userIdentity.institutionName}</HospitalName>}
        {isOpen && userIdentity.role === 'doctor' && <p style={{ fontSize: '85%', fontWeight: '700'}}>Doctor</p>}
        {isOpen && userIdentity.role === 'Representative' && <p style={{ fontSize: '85%', fontWeight: '700'}}>Admin</p>}
        {isOpen && userIdentity.role === 'nurse' && <p style={{ fontSize: '85%', fontWeight: '700'}}>Nurse</p>}
        {isOpen && userIdentity.role === 'lab technician' && <p style={{ fontSize: '85%', fontWeight: '700'}}>Lab Technician</p>}
        <NavigationComponents>
          <NavItemContainerHome to={'rec'}>
            <BiHomeAlt />
            {isOpen && <NavItem>Dashboard</NavItem>}
          </NavItemContainerHome>
          {(userIdentity.role === 'Representative' && userIdentity.institutionType !== 'pharmacy' ) &&
            <>
              <NavItemContainer to={'reports'}>
                <BiPaperPlane />
                {isOpen && <NavItem>Reports</NavItem>}
              </NavItemContainer>
            </>
          }
          <NavItemContainer to={'patients'}>
            <BiUserCircle />
            {isOpen && <NavItem>Patients</NavItem>}
          </NavItemContainer>
          {(userIdentity.role === 'nurse' || userIdentity.role === 'doctor' || userIdentity.role === 'lab technician') ? <></> : 
            <NavItemContainer to={'records'}>
              <BiFileBlank />
              {isOpen && <NavItem>Records</NavItem>}
            </NavItemContainer>
          }
          {userIdentity.role === 'Representative' && 
            <>
              <NavItemContainer to={'personnel'}>
                <BiUserCheck />
                {isOpen && <NavItem>Personnel</NavItem>}
              </NavItemContainer>
              <NavItemContainer to={'institution'}>
                <BiBuilding />
                {isOpen && <NavItem>My hospital</NavItem>}
              </NavItemContainer>
            </>
          }
          <NavItemContainer to={'account'}>
            <BiUserX />
            {isOpen && <NavItem>My account</NavItem>}
          </NavItemContainer>
        </NavigationComponents>
      </SideBar>
      <MainContent>
        <TopBar>
          <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems:'center', justifyContent: 'flex-start', gap: '40px' }}>
            <MenuButton onClick={minimizeView}>
              <BiMenuAltLeft />
            </MenuButton>
            <SearchBoxForPatients />
          </div>
          <User>
            <BiUserCircle/>
            <p>{userIdentity.firstName+" "+userIdentity.lastName}</p>
            <button onClick={popup}>
              <KeyboardArrowDownIcon />
            </button>
            {openPopup && 
              <MenuPopup>
                <p>{userIdentity.firstName+" "+userIdentity.lastName}</p>
                <button onClick={()=> {
                  navigate('account');
                  setOpenPopup(!openPopup);
                  }}>Account</button>
                <button onClick={logOut}>Log out</button>
              </MenuPopup>}
          </User>
        </TopBar>
        <OutletSpace>
          <Outlet />
        </OutletSpace>
      </MainContent> 
    </DashboardContainer>
  )
}

export default Dashboard