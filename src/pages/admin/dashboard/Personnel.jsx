import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import HospitalPersonnelTable from '../../../components/tables/HospitalPersonnelTable'
import HospitalTable from '../../../components/tables/HospitalTable'

const Personnel = () => {
  // Hooks
  const navigate = useNavigate();
  const params = useParams();

  // States
  const [institutions, setPatients] = useState([]);

  // Data fetch
  useEffect(()=>{
    axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/list`)
    .then(response => {
      response.data.forEach(element => {
        element.id = element._id;
      });
      setPatients(response.data)
    })
    .catch(error => { console.log("Failed to fetch data ::"+error) })
  },[])

  return (
    <Container>
      <PageHeaderContainer>
        <PageTitle>List of Hospital Personnel</PageTitle>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '60px'}}>
        <HospitalPersonnelTable data={institutions}/>
      </PageBody>
  </Container>
  )
}

export default Personnel