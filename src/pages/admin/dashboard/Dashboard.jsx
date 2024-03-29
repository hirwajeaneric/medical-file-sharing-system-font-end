import React, { useEffect, useState } from 'react'
import { BiBuilding, BiFileBlank, BiFileFind,   BiHomeAlt, BiMenuAltLeft, BiUserCheck, BiUserCircle, BiUserX } from 'react-icons/bi'
import { Outlet, useNavigate } from 'react-router-dom'
import { DashboardContainer, HospitalName, MainContent, MenuButton, MenuPopup, Mfss, NavigationComponents, NavItem, NavItemContainer, NavItemContainerHome, OutletSpace, SideBar, TitleContainer, TopBar, User } from '../../../components/Dashboard/DashboardComponents'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [userIdentity, setUserIdentity] = useState({});

  useEffect(()=>{
    setUserIdentity(JSON.parse(localStorage.getItem('usr')));
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
    localStorage.removeItem('admnTok');
    localStorage.removeItem('usr');
    navigate('/admin/auth/signin')
  }  

  return (
    <DashboardContainer>
      <Helmet>
        <title>Admin Dashboard Home - Medicase</title>
        <meta name="description" content="Medicase, Admin dashboard home page."/> 
      </Helmet>
      <SideBar  style={{ background: '#003366' }}>
        <TitleContainer>
          <MedicalInformationIcon />
          {isOpen && <Mfss>MFSS</Mfss>}
        </TitleContainer>
        {isOpen && <HospitalName>{localStorage.getItem('admnTok') && 'Admin'}</HospitalName>}
        <NavigationComponents>
          <NavItemContainerHome to={'hsp'}>
            <BiHomeAlt />
            {isOpen && <NavItem>Dashboard</NavItem>}
          </NavItemContainerHome>
          <NavItemContainer to={'patients'}>
            <BiUserCircle />
            {isOpen && <NavItem>Patients</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'records'}>
            <BiFileBlank />
            {isOpen && <NavItem>Records</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'personnel'}>
            <BiUserCheck />
            {isOpen && <NavItem>Personnel</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'hospitals'}>
            <BiBuilding />
            {isOpen && <NavItem>Hospitals</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'requests'}>
            <BiFileFind/>
            {isOpen && <NavItem>Requests</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'account'}>
            <BiUserX />
            {isOpen && <NavItem>My account</NavItem>}
          </NavItemContainer>
        </NavigationComponents>
      </SideBar>
      <MainContent>
        <TopBar>
          <MenuButton onClick={minimizeView}>
            <BiMenuAltLeft />
          </MenuButton>
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