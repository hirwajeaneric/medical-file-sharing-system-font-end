import React from 'react'
import { ChartHeader } from '../Dashboard/DashboardHome'
import BarChart from './BarChart'

const PersonnelChart = () => {
  return (
    <div>
      <ChartHeader>Active vs Suspended and Inactive Personnel Accounts</ChartHeader>  
      <BarChart />
    </div>
  )
}

export default PersonnelChart
 