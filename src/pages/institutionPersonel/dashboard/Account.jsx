import React from 'react'
import { Helmet } from 'react-helmet-async'

const Account = () => {
  return (
    <div>
      <Helmet>
        <title>My account - Medicase</title>
        <meta name="description" content="Medicase, institution personnel user account."/> 
      </Helmet>
      Account
    </div>
  )
}

export default Account