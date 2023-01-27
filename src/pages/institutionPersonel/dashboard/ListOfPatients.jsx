import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import PatientsTable from '../../../components/tables/PatientsTable'

const ListOfPatients = () => {
  // Hooks
  const navigate = useNavigate();
  const params = useParams();

  // States
  const [patients, setPatients] = useState([]);

  // Data fetch
  useEffect(()=>{
    axios.get(`http://localhost:5050/api/mfss/patient/list`)
    .then(response => {
      response.data.forEach(element => {
        element.id = element._id;
      });
      console.log(response.data);
      setPatients(response.data)
    })
    .catch(error => {
      console.log("Failed to fetch data ::"+error);
    })
  },[])

  return (
    <Container>
      <PageHeaderContainer>
        <PageTitle>List of patients</PageTitle>
        <Button variant='contained' size='small' onClick={()=> navigate(`/${params.institution}/dashboard/patients/new`)}>Add patient</Button>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '60px'}}>
        <PatientsTable data={patients}/>
      </PageBody>
    </Container>
  )
}

export default ListOfPatients