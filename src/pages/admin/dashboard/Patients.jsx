import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PageBody, PageTitle } from '../../../components/Dashboard/DashboardHome'
import PatientsTable from '../../../components/tables/PatientsTable'

const Patients = () => {
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
      setPatients(response.data)
    })
    .catch(error => { console.log("Failed to fetch data ::"+error) })
  },[])

  return (
    <Container>
      <PageTitle>Patients</PageTitle>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '60px'}}>
        <PatientsTable data={patients}/>
      </PageBody>
    </Container>
  )
}

export default Patients