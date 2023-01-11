import React from 'react'
import { MainContainer } from './Navigation'
import { SectionHeader, VerticallyFlexedContainer } from './Sponsors'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RegisterHospital = () => {
  return (
    <MainContainer>
      <VerticallyFlexedContainer>
        <SectionHeader>
          Do you have a Medical Institution?
        </SectionHeader>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur omnis vero ad repellat ab nesciunt minus. Beatae ad voluptates nobis ab accusantium eius culpa cumque deserunt adipisci! Porro, consectetur culpa.  
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore autem sunt perferendis, non dolorem iusto cum dolorum temporibus optio voluptatem molestiae placeat corporis quam, sequi ducimus? Explicabo corrupti consectetur sed.
        </Description>
        <CallToActionButton to={'/institutions'}>Register Institution</CallToActionButton>      
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

const Description = styled.p`

`;

const CallToActionButton = styled(Link)`
  text-decoration: none;
  margin: 50px 0 50px;
  padding: 8px 20px;
  color: white;
  background: #0066ff;
  font-weight: 600;
  font-size: 110%;
  border: none;

  &:hover {
    background: black;
  }
`;

export default RegisterHospital