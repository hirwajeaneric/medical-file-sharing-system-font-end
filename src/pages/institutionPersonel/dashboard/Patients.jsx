import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

const Patients = () => {
  return (
    <>
      <Helmet>
        <title>List of Patients - Medicase</title>
        <meta name="description" content="Medicase, list of all institution or hospital personnel registered and using the system."/> 
      </Helmet>      
        <Outlet />
    </>
  )
}

export default Patients