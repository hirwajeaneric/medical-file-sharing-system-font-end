import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { DashboardWrapper, HeadSection, StatsCategories } from '../../../components/Dashboard/AdminDashboards'
import { Button, Menu, MenuItem } from '@mui/material';

const DashboardHome = () => {
  const navigate = useNavigate();
  
  // Report generation menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToReportPage = (reportType) => {
    navigate(`/admin/dashboard/reports/`);
    localStorage.setItem('report-A', reportType);
  }

  return (
    <DashboardWrapper>
      <HeadSection>
        <h2>Dashbaord</h2>
      </HeadSection>
      <StatsCategories>
        <div>
          <NavLink to={'hsp'}>Hospitals</NavLink>
          <NavLink to={'per'}>Personnel</NavLink>
          <NavLink to={'dis'}>Recorded diseases</NavLink>
        </div>
        <Button variant='text' size='small' color='primary' onClick={handleClick} >Print reports</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {/* <MenuItem onClick={() => { handleClose(); goToReportPage('General Hospital Report'); }}>General hospital report</MenuItem> */}
          <MenuItem onClick={() => { handleClose(); goToReportPage('Hospitals Report'); }}>Hospital</MenuItem>
          <MenuItem onClick={() => { handleClose(); goToReportPage('Hospital Personnel Report'); }}>Hospital personnel</MenuItem>
          <MenuItem onClick={() => { handleClose(); goToReportPage('Recorded Diseases Numbers'); }}>Recorded disease numbers</MenuItem>
        </Menu>
      </StatsCategories>
      <Outlet />
    </DashboardWrapper>
  )
}

export default DashboardHome