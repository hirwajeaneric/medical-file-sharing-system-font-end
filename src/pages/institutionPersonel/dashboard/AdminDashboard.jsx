import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { DashboardWrapper, DateRangePicker, Durations, HeadSection, RangePeriods, StatsCategories } from '../../../components/Dashboard/AdminDashboards'
import { FcSearch } from 'react-icons/fc';
import { BiSearchAlt } from 'react-icons/bi';

const AdminDashboard = () => {

  const [filterValue, setFilterValue] = useState({ from: '', to:'' });
  
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

  const handleDateChoice = ({currentTarget: input}) => {
    setFilterValue({...filterValue, [input.name]: input.value})
  }

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
            <button onClick={()=> {changeFilter(1)}}>All day</button>
          </div>
          <RangePeriods>
            <button onClick={()=> {changeFilter(7)}} style={{ borderRight: '1px solid gray'}}>7 Days</button>
            <button onClick={()=> {changeFilter(30)}} style={{ borderRight: '1px solid gray'}}>1 Month</button>
            <button onClick={()=> {changeFilter(365)}} >1 Year</button>
          </RangePeriods>
          <DateRangePicker>
            <input type="date" name="from" id="from" value={filterValue.from} onChange={handleDateChoice}/>
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <input type="date" name="to" id="to" value={filterValue.to} onChange={handleDateChoice}/>
            <button onClick={filter}><BiSearchAlt /></button>
          </DateRangePicker>
        </Durations>
      </HeadSection>
      <StatsCategories>
        <NavLink to={'rec'}>Patient records</NavLink>
        <NavLink to={'per'}>Personnel</NavLink>
      </StatsCategories>
      <Outlet />
    </DashboardWrapper>
  )
}

export default AdminDashboard