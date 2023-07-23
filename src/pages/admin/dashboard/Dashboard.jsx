import React, { useEffect, useState } from 'react'
import { BiBell, BiBuilding, BiFileBlank, BiFileFind, BiHomeAlt, BiMenuAltLeft, BiUserCheck, BiUserCircle, BiUserX } from 'react-icons/bi'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { DashboardContainer, HospitalName, MainContent, MenuButton, MenuPopup, Mfss, NavigationComponents, NavItem, NavItemContainer, NavItemContainerHome, OutletSpace, SideBar, TitleContainer, TopBar, User } from '../../../components/Dashboard/DashboardComponents'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Helmet } from 'react-helmet-async';
import { IconButton, Menu, MenuItem } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [userIdentity, setUserIdentity] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    setUserIdentity(JSON.parse(localStorage.getItem('usr')));

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/notification/list`)
    .then(response => {
      response.data.sort((a, b) => new Date(b.time) - new Date(a.time));
      let listOfNotifications = [];
      response.data.forEach((element,index) => {
        if (index < 4) {
          listOfNotifications.push(element);
        }
      })
      setNotifications(response.data);
    })

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
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
            <div>
              <IconButton size="large" aria-label="notifications" aria-controls="notification-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <BiBell style={{ color: 'gray' }}/>
              </IconButton>
              <Menu id="notification-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} style={{ maxHeight:'400px' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorEl)} onClose={handleClose}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'flex-start', alignItems:'center' }}>
                  <p style={{ textDecoration: 'none', textAlign: 'left', fontSize:'100%', color: 'gray', marginBottom:'10px', marginLeft: '10px' }}>Notifications</p>
                </div>
                {notifications.length !== 0 && notifications.map((notification, index) =>
                  <div key={index} style={{ width: '100%', cursor: 'pointer', padding:'10px', display: 'flex', flexDirection: 'column', background: notification.viewed ? 'white':'#e0ebeb' }} onClick={console.log(notification._id)}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize: '80%', color: notification.severity === 'Critical' ? 'red' : notification.severity === 'Warning' ? 'yellow' : notification.severity === 'Emergency' ? 'orange' : 'black' }}>{notification.severity}</span>
                      <span style={{ fontSize: '80%', color: 'gray' }}>{new Date(notification.time).toUTCString()}</span>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
                      <span style={{ width: '90%', fontSize: '90%', textAlign: 'left'}}>{notification.message}</span>
                      {/* <Link to={'#'} style={{ textDecoration: 'none', fontSize:'80%', color: 'blue', background: notification.viewed ? 'white':'#e0ebeb'}}>More</Link> */}
                    </div>
                  </div>
                )}
                {/* <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                  <Link to={'#'} style={{ textDecoration: 'none', textAlign: 'center', fontSize:'90%', color: 'blue', marginTop:'10px' }}>More</Link>
                </div> */}
                {notifications.length === 0 && <MenuItem>No available notifications yet.</MenuItem>}
              </Menu>
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
          </div>
        </TopBar>
        <OutletSpace>
          <Outlet />
        </OutletSpace>
      </MainContent> 
    </DashboardContainer>
  )
}

export default Dashboard