import React from 'react'
import { LeftSide, RightSide } from './Banner'
import { MainContainer } from './Navigation'
import { SectionHeader } from './Sponsors'
import styled from 'styled-components';

const Aboutus = () => {
  return (
    <MainContainer style={{background: 'transparent'}}>
      <SpecialSectionContainer>
        <LeftSide >
          <SectionHeader style={{fontSize: '3rem', lineHeight: '3rem'}}>About MEDICASE</SectionHeader>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur omnis vero ad repellat ab nesciunt minus. Beatae ad voluptates nobis ab accusantium eius culpa cumque deserunt adipisci! Porro, consectetur culpa.  
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore autem sunt perferendis, non dolorem iusto cum dolorum temporibus optio voluptatem molestiae placeat corporis quam, sequi ducimus? Explicabo corrupti consectetur sed.
          </Description>        
        </LeftSide>
        <RightSide>
          <Imag src='/img/pexels-mart-production-7089629.jpg' alt=''/>
        </RightSide>
      </SpecialSectionContainer>
    </MainContainer>
  )
}

const Description = styled.p`
  line-height: 1.7rem;
`;

const Imag = styled.img`
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid white;

  @media (max-width: 1080px) {
    
  }

  @media (max-width: 768px) {
    
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SpecialSectionContainer = styled.div`
    max-width: 1360px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    position: relative;
    padding: 5px 90px;
    height: 90vh;

    @media (max-width: 1080px) {
      padding: 5px 90px;
    }

    @media (max-width: 768px) {
      padding: 5px 60px;
      height: 1000px;
    }

    @media (max-width: 480px) {
        padding: 5px 20px;
        margin-top: -100px;
    }
`;

export default Aboutus