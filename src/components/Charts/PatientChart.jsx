import React from 'react';
import { ChartHeader } from '../Dashboard/DashboardHome'
import BarChart from './BarChart';

const PatientChart = ({data}) => {
  return (
    <div>
      <ChartHeader>Graph of Patients and Opened Records</ChartHeader>
      <BarChart dataset={data} />
    </div>
  )
}

export default PatientChart