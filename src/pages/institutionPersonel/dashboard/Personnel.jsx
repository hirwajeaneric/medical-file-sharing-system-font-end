import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

const Personnel = () => {
  return (
    <>
      <Helmet>
        <title>Personnel of This Institution - Medicase</title>
        <meta name="description" content="Medicase, list of all institution or hospital personnel registered to this institution."/> 
      </Helmet>
      <Outlet/>
    </>
  )
}

export default Personnel