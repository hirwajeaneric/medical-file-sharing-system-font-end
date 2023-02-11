import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../../components/Dashboard/DashboardHome'
import AdminDashboard from './AdminDashboard';
import InstitutionPersonnelDashboard from './InstitutionPersonnelDashboard';

const DashBoardHome = () => {
  const params = useParams();

  return (
    <Container>
        {params.role === 'r' ? <AdminDashboard/> : <InstitutionPersonnelDashboard />}    
    </Container>
  )
}

export default DashBoardHome