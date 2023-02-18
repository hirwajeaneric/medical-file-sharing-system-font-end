import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { DashboardWrapper, DateRangePicker, Durations, HeadSection, RangePeriods, StatsCategories } from '../../../components/Dashboard/AdminDashboards'

const AdminDashboard = () => {

  

  return (
    <DashboardWrapper>
      <HeadSection>
        <h2>Overview dashbaord</h2>
        <Durations>
          <div>
            <button>All day</button>
          </div>
          <RangePeriods>
            <button style={{ borderRight: '1px solid gray'}}>7 Days</button>
            <button style={{ borderRight: '1px solid gray'}}>1 Month</button>
            <button>1 Year</button>
          </RangePeriods>
          <DateRangePicker>
            <input type="date" name="from" id="from" />
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <input type="date" name="from" id="from" />
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