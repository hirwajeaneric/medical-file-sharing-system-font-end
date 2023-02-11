import React from 'react';
import Navigation from '../components/HomePage/Navigation';
import Footer from '../components/HomePage/Footer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer } from './Home';

const ErrorPage = () => {
  return (
    <MainContainer>
      <Navigation />
      <ErrorSection>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to='/'>Go back to Home</Link>
      </ErrorSection>
      <Footer />
    </MainContainer>
  )
}

export default ErrorPage

export const ErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: white;
  width: 100%;

  h1 {
    font-size: 7rem;
  }

  p {
    margin: 40px 0;
  }

  a {
    text-decoration: none;
    color: blue;

    &:hover {
      color: gray;
    }
  }
`; 