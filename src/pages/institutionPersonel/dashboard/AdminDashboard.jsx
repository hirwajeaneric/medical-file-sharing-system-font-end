import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { DashboardWrapper, DateRangePicker, Durations, HeadSection, RangePeriods, StatsCategories } from '../../../components/Dashboard/AdminDashboards'
import { FcSearch } from 'react-icons/fc';
import { BiSearchAlt } from 'react-icons/bi';
import { Button, Menu, MenuItem } from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [filterValue, setFilterValue] = useState({ from: '', to:'' });
  
  // Report generation menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToReportPage = (reportType) => {
    navigate(`/${params.institution}/${params.role}/reports/`);
    localStorage.setItem('report', reportType);
  }

  // Changing the filter according to what is choosen.
  const changeFilter = (duration) => {
    let filter = {}
    if (duration === 1) {
      let currentTime = new Date().getTime();
      let midNight = new Date(currentTime + (1 * 24 * 60 * 60 * 1000))
      let updatedTime = new Date(currentTime - (1 * 24 * 60 * 60 * 1000));
      filter = { 
        from: updatedTime.toLocaleDateString(), 
        to: midNight.toLocaleDateString(), 
      }
    } else if (duration === 7) {
      let currentTime = new Date().getTime();
      let updatedTime = new Date(currentTime - (7 * 24 * 60 * 60 * 1000));
      filter = { 
        from: updatedTime.toLocaleDateString(), 
        to: new Date().toLocaleDateString(), 
      }
    } else if (duration === 30) {
      let currentTime = new Date().getTime();
      let updatedTime = new Date(currentTime - (30 * 24 * 60 * 60 * 1000));
      filter = { 
        from: updatedTime.toLocaleDateString(),
        to: new Date().toLocaleDateString(),  
      }
    } else if (duration === 365) {
      let currentTime = new Date();
      let updatedTime = currentTime.setFullYear(currentTime.getFullYear() - 1);
      filter = {  
        from: new Date(updatedTime).toLocaleDateString(),
        to: new Date().toLocaleDateString(), 
      }
    }

    localStorage.setItem("filter", JSON.stringify(filter));
    window.location.reload();
  }

  const handleDateChoice = ({currentTarget: input}) => { setFilterValue({...filterValue, [input.name]: input.value})}

  const filter = () => {
    if (filterValue.from && filterValue.to) {
      localStorage.setItem("filter", JSON.stringify(filterValue));
      window.location.reload();
    } else {
      return;
    }
  }

  return (
    <DashboardWrapper>
      <HeadSection>
        <h2>Overview dashbaord</h2>
        <Durations>
            <div>
            <button onClick={()=> {changeFilter(1)}} style={{ cursor: 'pointer' }}>All day</button>
            </div>
            <RangePeriods>
              <button onClick={()=> {changeFilter(7)}} style={{ borderRight: '1px solid gray', cursor: 'pointer' }}>7 Days</button>
              <button onClick={()=> {changeFilter(30)}} style={{ borderRight: '1px solid gray', cursor: 'pointer'}}>1 Month</button>
              <button onClick={()=> {changeFilter(365)}} style={{ cursor: 'pointer' }}>1 Year</button>
            </RangePeriods>
            <DateRangePicker>
            <input type="date" name="from" id="from" value={filterValue.from} onChange={handleDateChoice}/>
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <input type="date" name="to" id="to" value={filterValue.to} onChange={handleDateChoice}/>
            <button onClick={filter} style={{ cursor: 'pointer' }}><BiSearchAlt /></button>
          </DateRangePicker>
        </Durations>
      </HeadSection>
      <StatsCategories>
        <div>
          <NavLink to={'rec'}>Patient records</NavLink>
          <NavLink to={'per'}>Personnel</NavLink>
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
          <MenuItem onClick={() => { handleClose(); goToReportPage('General hospital report'); }}>General hospital report</MenuItem>
          <MenuItem onClick={() => { handleClose(); goToReportPage('Patient report'); }}>Patients report</MenuItem>
          <MenuItem onClick={() => { handleClose(); goToReportPage('Hospital personnel report'); }}>Hospital personnel report</MenuItem>
        </Menu>
      </StatsCategories>
      <Outlet />
    </DashboardWrapper>
  )
}

export default AdminDashboard