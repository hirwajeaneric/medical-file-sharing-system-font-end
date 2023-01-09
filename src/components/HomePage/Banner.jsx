import React from 'react';
import styled from 'styled-components';
import { MainContainer, SectionContainer } from './Navigation';

const Banner = () => {
  return (
    <MainContainer>
      <SectionContainer style={{backgroundColor: '#e6f9ff' }}>
        <LeftSide>
          <h1>Welcome to MEDICASE</h1>
          <h2>The most effiscient Medical File Sharing System</h2>
        </LeftSide>
        <RightSide>
          <form>
            <input type="text" name="" id="" />
          </form>
        </RightSide>
      </SectionContainer>
    </MainContainer>
  )
}

export const RightSide = styled.div`
  width: 50%;
  
  @media (max-width: 1920px) {
    
  }

  @media (max-width: 1080px) {

  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {

  }
`;

export const LeftSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1920px) {
    
  }

  @media (max-width: 1080px) {

  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {

  }
`;
export default Banner