import React, { useState } from 'react';
import styled from 'styled-components';
import SigninForm from '../authenticationRelated/SigninForm';
import { MainContainer } from './Navigation';

const Banner = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  return (
    <MainContainer>
      <SectionContainer style={{backgroundColor: '#006622' }}>
        <LeftSide>
          <p>Welcome to</p>
          <h1>MEDICASE</h1>
          <h2>The most effiscient and effective Medical File Sharing System.</h2>
        </LeftSide>
        <RightSide>
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

export const SectionContainer = styled.div`
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
    }
`;

export const LeftSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: white;
  
  p {
    text-align: left;
  }

  h1 {
    font-size: 4rem;
    line-height: 70px;
    margin-bottom: 50px;
  }

  h2 {
    font-weight: 300;
  }

  @media (max-width: 768px) {
    width: 100%;

    h1 {
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    height: 20vh;

    h1 {
      font-size: 2rem;
      line-height: 40px;
      margin-top: 1.5rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;

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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default Banner