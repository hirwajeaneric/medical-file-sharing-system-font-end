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
  const [medicalPersonnel, setMedicalPersonnel] = useState({});
    
  useEffect(() => {
    let personnel = {};
    if (params.role === 'r') {
        personnel = JSON.parse(localStorage.getItem('instAdmPe'));
    } else if (params.role === 'd') {
        personnel = JSON.parse(localStorage.getItem('instDocPe'));
    } else if (params.role === 'n') {
        personnel = JSON.parse(localStorage.getItem('instNurPe'));
    } else if (params.role === 'l') {
        personnel = JSON.parse(localStorage.getItem('instLabPe'));
    } 
    setMedicalPersonnel(personnel);
  },[params.role]);

  // Data fetch
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/patient/list`)
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
        <PageTitle>List of patients</PageTitle>
        {medicalPersonnel.role === 'doctor' ? <></> : <Button variant='contained' size='small' onClick={()=> navigate(`/${params.institution}/${params.role}/patients/new`)}>Add patient</Button>}
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '60px'}}>
        <PatientsTable data={patients}/>
      </PageBody>
    </Container>
  )
}

export default ListOfPatients