import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SigninForm from '../authenticationRelated/SigninForm';
import { MainContainer, SectionContainer } from './Navigation';

const Banner = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  return (
    <MainContainer>
      <SectionContainer style={{backgroundColor: '#e6f9ff', height: '100vh' }}>
        <LeftSide>
          <h1>Welcome to MEDICASE</h1>
          <h2>The most effiscient Medical File Sharing System</h2>
        </LeftSide>
        <RightSide 
          // style={{background: 'white'}}
        >
          <SigninForm 
            formData={formData} 
            setFormData={setFormData}  
            tokenName="usTokn" 
            userInfo="pat"
            destination="/user/account"
            signupLocation="/user/signup"
            forgotPasswordLocation="/user/forgotPassword"
            backendLink="patient/signin"
            formTitle="User" 
          />
        </RightSide>
      </SectionContainer>
    </MainContainer>
  )
}

export const FormOne = styled.form`

`;

export const FormInput = styled.div`

`;

export const FormOneButtonGroup = styled.div`

`;

export const FormOneButtonSuccess = styled.button`

`;

export const RightSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

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
  justify-content: flex-start;
  align-items: flex-start;
  

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