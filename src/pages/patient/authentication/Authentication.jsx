import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/HomePage/Footer';
import Navigation from '../../../components/HomePage/Navigation';

const Authentication = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default Authentication