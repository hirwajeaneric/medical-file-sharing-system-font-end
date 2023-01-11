import React from 'react'
import { MainContainer } from './Navigation'
import styled from 'styled-components';

const Sponsors = () => {
  return (
    <MainContainer>
      <VerticallyFlexedContainer style={{backgroundColor: 'white'}}>
        <SectionHeader>We are trusted by</SectionHeader>
        <LogoContainer>
          <img src='/img/moh.png' alt='' />
          <img src='/img/cropped-AUCA-logo-wide-webblue-2-1-1.png' alt='' />
          <img src='/img/KFH-logo-vector-format.png' alt='' />
          <img src='/img/logo-apollo.png' alt='' />
          <img src='/img/RBC-LOGO_Sept30_2019-Regular.png' alt='' />
        </LogoContainer>
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

const LogoContainer = styled.div`
  display; flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  
  img {
    height: 60px; 
    margin-left: 40px;
  }

  @media (max-width: 1920px) {
      
  }

  @media (max-width: 1080px) {
    img {
      margin-bottom: 40px;
    }
  }

  @media (max-width: 768px) {
    
  }

  @media (max-width: 480px) {
    img {
      margin-left: 70px;
      margin-bottom: 20px;
    } 
  }
`;

export const SectionHeader = styled.h1`
  margin-bottom: 4rem;

  @media (max-width: 1920px) {
      
  }

  @media (max-width: 1080px) {
      
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    
  }
`;

export const VerticallyFlexedContainer = styled.div`
  max-width: 1360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: relative;
  padding: 70px 90px;

  @media (max-width: 1920px) {
      
  }

  @media (max-width: 1080px) {
      50px 90px;
  }

  @media (max-width: 768px) {
      padding: 40px 60px;
  }

  @media (max-width: 480px) {
      padding: 60px 20px;
  }
`;

export default Sponsors