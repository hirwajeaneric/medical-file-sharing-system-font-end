import React, { useState } from 'react'
import { BiBuilding, BiBuildingHouse, BiFileBlank, BiFileFind,   BiHomeAlt, BiMenuAltLeft, BiPaperPlane, BiUserCheck, BiUserCircle, BiUserPlus, BiUserX } from 'react-icons/bi'
import { Outlet, useNavigate } from 'react-router-dom'
import { DashboardContainer, HospitalName, MainContent, MenuButton, MenuPopup, Mfss, NavigationComponents, NavItem, NavItemContainer, NavItemContainerHome, OutletSpace, SideBar, TitleContainer, TopBar, User } from '../../../components/Dashboard/DashboardComponents'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Dashboard = () => {
  const navigate = useNavigate();

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
    navigate('/admin/signin')
  }  

  return (
    <DashboardContainer>
      <SideBar >
        <TitleContainer>
          <MedicalInformationIcon />
          {isOpen && <Mfss>MFSS</Mfss>}
        </TitleContainer>
        {isOpen && <HospitalName>Admin</HospitalName>}
        <NavigationComponents>
          <NavItemContainerHome to={''}>
            <BiHomeAlt />
            {isOpen && <NavItem>Dashboard</NavItem>}
          </NavItemContainerHome>
          <NavItemContainer to={'reports'}>
            <BiPaperPlane />
            {isOpen && <NavItem>Reports</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'patients'}>
            <BiUserCircle />
            {isOpen && <NavItem>Patients</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'records'}>
            <BiFileBlank />
            {isOpen && <NavItem>Records</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'doctors'}>
            <BiUserCheck />
            {isOpen && <NavItem>Doctors</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'nurses'}>
            <BiUserPlus />
            {isOpen && <NavItem>Nurses</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'hospitals'}>
            <BiBuilding />
            {isOpen && <NavItem>Hospitals</NavItem>}
          </NavItemContainer>
          <NavItemContainer to={'pharmacies'}>
            <BiBuildingHouse />
            {isOpen && <NavItem>Pharmacies</NavItem>}
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
            <p>John Doe</p>
            <button onClick={popup}>
              <KeyboardArrowDownIcon />
            </button>
            {openPopup && 
              <MenuPopup>
                <p>Hirwa Jean Eric</p>
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