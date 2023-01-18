import React from 'react'
import Navigation from '../components/HomePage/Navigation';
import Footer from '../components/HomePage/Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <MainContainer>
      <Navigation />
      <Outlet />
      <Footer />
    </MainContainer>
  )
}

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #006622;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default Home