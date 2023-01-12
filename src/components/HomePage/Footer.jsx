import React from 'react'
import { Logo, MainContainer } from './Navigation'
import { VerticallyFlexedContainer } from './Sponsors'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <MainContainer style={{ backgroundColor: '#b3ffcb'}}>
      <VerticallyFlexedContainer style={{ backgroundColor: '#b3ffcb'}}>
        <Logo to={'/'}>MEDICASE</Logo>
        <FooterLinks>
          <Link to={'/'}>Home</Link>
          <Link to={'/institutions'}>Institutions</Link>
          <Link to={'/user/account'}>Patient Account</Link>
          <Link to={'/user/signup'}>Create an Account</Link>  
        </FooterLinks>      
        <CopyRights>
          <p>&copy; All rights reserved to <a href='https://hirwajeaneric.netlify.app'>Hirwa Jean Eric</a></p>
          <p>🧡 Built with Love and Passion</p> 
        </CopyRights>      
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;  
  margin: 40px 0;
  font-size: 90%;

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: #0066ff; 
  }

  @media (max-width: 1080px) {
    
  }

  @media (max-width: 768px) {
    
  }

  @media (max-width: 480px) {
    
  }
`;

const CopyRights = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 60px;
  font-size: 90%;

  a {
    color: black;
  }

  @media (max-width: 1080px) {
    
  }

  @media (max-width: 768px) {
    
  }

  @media (max-width: 480px) {
    
  }

`;

export default Footer