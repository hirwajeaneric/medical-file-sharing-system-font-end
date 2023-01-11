import React from 'react'
import { Logo, MainContainer } from './Navigation'
import { SectionHeader, VerticallyFlexedContainer } from './Sponsors'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <MainContainer>
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

`;

const CopyRights = styled.div`



`;

export default Footer