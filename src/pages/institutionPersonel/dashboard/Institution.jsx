import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import InstitutionDetails from '../../../components/Dashboard/InstitutionDetails'

const Institution = () => {
  const params = useParams();

  const [institution, setInstitution] = useState({});
  const [institutionName, setInstitutionName] = useState('');
  // const [numberOfPersonnel, setNumberOfPersonnel] = useState('');

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institution/findByCode?institutionCode=${params.institution}`)
    .then(response=>{
      setInstitution(response.data);
      setInstitutionName(response.data.name);

      // Fetch personnel

    })
    .catch(error => console.log(error))
  },[params.institution])

  return (
    <Container>
      <Helmet>
          <title>Hospital - Medicase</title>
          <meta name="description" content="Medicase, hospital detailed information and update page."/> 
      </Helmet>
      <PageHeaderContainer>
        <PageTitle>{institutionName}</PageTitle>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '40px', padding: '40px'}}>
        <InstitutionDetails institution={institution} setInstitution={setInstitution}/>
      </PageBody>
    </Container>
  )
}

export default Institution