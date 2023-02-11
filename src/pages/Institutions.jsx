import React from 'react';
import { Helmet } from 'react-helmet-async';
import InstitutionSection from '../components/HomePage/InstitutionSection'

const Institutions = () => {
  return (
    <div>
      <Helmet>
        <title>Institutions - Medicase</title>
        <meta name="description" content="The most effiscient and effective Medical File Sharing System."/> 
      </Helmet>
      <InstitutionSection />
    </div>
  )
}

export default Institutions