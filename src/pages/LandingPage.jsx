import React from 'react'
import Aboutus from '../components/HomePage/Aboutus'
import Banner from '../components/HomePage/Banner'
import RegisterHospital from '../components/HomePage/RegisterHospital'
import Sponsors from '../components/HomePage/Sponsors'

const LandingPage = () => {
  return (
    <div>
      <Banner />
      <Sponsors />
      <Aboutus />
      <RegisterHospital />
    </div>
  )
}

export default LandingPage