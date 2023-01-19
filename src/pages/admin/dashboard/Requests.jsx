import React, { useEffect, useState } from 'react'
import { Container, PageBody, PageTitle } from '../../../components/Dashboard/DashboardHome'
import RequestsTable from '../../../components/tables/RequestsTable';
import axios from 'axios';

const Requests = () => {
  
  const [requests, setRequests] = useState([]);
  
  useEffect(()=>{
    axios.get('http://localhost:5050/api/mfss/applicationForInstitution/list')
    .then(response => {
      response.data.forEach(element => {
        element.id = element._id;
      });
      setRequests(response.data)
    })
    .catch(error => {
      console.log("Failed to fetch data ::"+error);
    })
  },[])

  return (
    <Container>
      <PageTitle>Requests</PageTitle>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody>
        <RequestsTable data={requests}/>
      </PageBody>
    </Container>
  )
}

export default Requests