import { Button } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import NewPersonnelForm from '../../../components/Dashboard/NewPersonnelForm';

const NewPersonnel = () => {
  // Hooks
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
      <PageHeaderContainer>
        <PageTitle>Add personnel</PageTitle>
        <Button variant='contained' size='small' onClick={()=> navigate(`/${params.institution}/dashboard/personnel`)}>Back to list</Button>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody>
        <NewPersonnelForm />
      </PageBody>
    </Container>
  )
}

export default NewPersonnel