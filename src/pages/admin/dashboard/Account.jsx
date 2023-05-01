import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import AdminUserAccountData from '../../../components/Dashboard/AdminUserAccountData'

const Account = () => {
  return (
  <Container>
      <Helmet>
          <title>Account - Medicase</title>
          <meta name="description" content="Medicase, personnal account."/> 
      </Helmet>
      <PageHeaderContainer>
        <PageTitle>My account</PageTitle>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '40px', padding: '40px'}}>
        <AdminUserAccountData />
      </PageBody>
    </Container>
  )
}

export default Account