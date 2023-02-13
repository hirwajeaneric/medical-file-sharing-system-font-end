import { Button } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import AddPatientForm from '../../../components/Dashboard/AddPatientForm';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'

const AddPatient = () => {
  // Hooks
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
      <Helmet>
          <title>Add new patient - Medicase</title>
          <meta name="description" content="Medicase, add new patient to the system."/> 
      </Helmet>
      <PageHeaderContainer>
        <PageTitle>Record new patient</PageTitle>
        <Button variant='contained' color='secondary' size='small' onClick={()=> navigate(`/${params.institution}/${[params.role]}/patients`)}>Back to list</Button>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '40px', padding: '40px'}}>
        <AddPatientForm />
      </PageBody>
    </Container>
  )
}

export default AddPatient