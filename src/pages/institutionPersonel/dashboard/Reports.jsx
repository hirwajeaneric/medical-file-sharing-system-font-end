import { Button } from '@mui/material'
import React, { useRef } from 'react'
import { Helmet } from 'react-helmet-async';
import { useReactToPrint } from 'react-to-print';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import { ComponentToPrint } from './ComponentToPrint';

export default function Reports () {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });

  return (
    <Container>
      <Helmet>
        <title>Reports - Medicase</title>
        <meta name="description" content="Medicase, generate reports related to your institution."/> 
      </Helmet>
      <PageHeaderContainer>
          <PageTitle>Report : </PageTitle>
          <Button variant='contained' color='primary' size='small' onClick={handlePrint}>Print</Button>
      </PageHeaderContainer>
      
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      
      {/* Report preview  */}
      <PageBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: '100%', background: '#c2d6d6' }}>
        <ComponentToPrint ref={componentRef} />
      </PageBody>
    </Container>
  )
}

