import React from 'react'
import {Helmet} from 'react-helmet-async';

const Account = () => {
  return (
    <div>
      <Helmet>
        <title>My Account - Medicase</title>
        <meta name="description" content="Medicase, admin user account."/> 
      </Helmet>
      Account
    </div>
  )
}

export default Account