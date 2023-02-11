import React from 'react'
import { Helmet } from 'react-helmet-async'
import Aboutus from '../components/HomePage/Aboutus'
import Banner from '../components/HomePage/Banner'
import RegisterHospital from '../components/HomePage/RegisterHospital'
import Sponsors from '../components/HomePage/Sponsors'

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome to Medicase</title>
        <meta name="description" content="The most effiscient and effective Medical File Sharing System."/> 
      </Helmet>
      <Banner />
      <Sponsors />
      <Aboutus />
      <RegisterHospital />
    </div>
  )
}

export default LandingPage