import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <MainContainer>
        <NavigationContainer>
            <LeftSide>
                <Logo>MEDICASE</Logo>
            </LeftSide>
            <RightSide>
                <Links>
                    <ALink to={'/'}>Home</ALink>
                    <ALink to={'/institutions'}>Institutions</ALink>
                    <ALink to={'/user/signup'}>Patients</ALink>
                    <ALink to={'/user/signin'}>Sign in</ALink>
                </Links>
            </RightSide>
            <ExtendedLinks>
                <ALinkExtended to={'/'}>Home</ALinkExtended>
                <ALinkExtended to={'/institutions'}>Institutions</ALinkExtended>
                <ALinkExtended to={'/user/signup'}>Patients</ALinkExtended>
                <ALinkExtended to={'/user/signin'}>Sign in</ALinkExtended>
            </ExtendedLinks>
        </NavigationContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
    background: white;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 1920px) {

    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {

    }
`;

const NavigationContainer = styled.div`
    max-width: 1360px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 90px;
    background: white;
    margin: 0 auto;

    @media (max-width: 1920px) {
        
    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {

    }
`;

const Links = styled.div`
    display: flex;

    @media (max-width: 1920px) {
        
    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {
        display: none;
    }

    @media (max-width: 480px) {

    }
`;

const ExtendedLinks = styled.div`
    display: none;

    @media (max-width: 1920px) {
        
    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {
        display: flex;
    }

    @media (max-width: 480px) {

    }
`;

const RightSide = styled.div`
    @media (max-width: 1920px) {

    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

const LeftSide = styled.div`
    @media (max-width: 1920px) {

    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

const ALink = styled(NavLink)`
    text-decoration: none;
    color: black;
    padding: 8px 12px;
    margin: 0 10px;
`;

const ALinkExtended = styled(NavLink)`

`;

const Logo = styled.h1`
    @media (max-width: 1920px) {

    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;


export default Navigation