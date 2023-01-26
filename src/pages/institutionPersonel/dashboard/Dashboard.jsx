import React, { useEffect, useState } from 'react'
import { BiFileBlank, BiHomeAlt, BiMenuAltLeft, BiPaperPlane, BiUserCheck, BiUserCircle, BiUserX } from 'react-icons/bi'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { DashboardContainer, HospitalName, MainContent, MenuButton, MenuPopup, Mfss, NavigationComponents, NavItem, NavItemContainer, NavItemContainerHome, OutletSpace, SideBar, TitleContainer, TopBar, User } from '../../../components/Dashboard/DashboardComponents'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Dashboard = () => {
  const params = useParams();
  const navigate = useNavigate(); 
  const [userIdentity, setUserIdentity] = useState({});

  useEffect(()=>{
    setUserIdentity(JSON.parse(localStorage.getItem('instPe')));
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
    localStorage.removeItem('insttTok');
    localStorage.removeItem('instPe');
    navigate(`/${params.institution}/auth/signin`)
  }  

  return (
    <DashboardContainer>
      <SideBar >
        <TitleContainer>
          <MedicalInformationIcon />
          {isOpen && <Mfss>MFSS</Mfss>}
        </TitleContainer>
        {isOpen && <HospitalName>{localStorage.getItem('insttTok') && 'Hospital'}</HospitalName>}
        <NavigationComponents>
          <NavItemContainerHome to={''}>
            <BiHomeAlt />
            {isOpen && <NavItem>Dashboard</NavItem>}
          </NavItemContainerHome>
          {userIdentity.role === 'Representative' &&
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
          <NavItemContainer to={'records'}>
            <BiFileBlank />
            {isOpen && <NavItem>Records</NavItem>}
          </NavItemContainer>
          {userIdentity.role === 'Representative' && 
            <>
              <NavItemContainer to={'personnel'}>
                <BiUserCheck />
                {isOpen && <NavItem>Personnel</NavItem>}
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