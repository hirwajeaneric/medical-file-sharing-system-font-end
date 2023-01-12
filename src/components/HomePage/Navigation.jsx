import React, { useState } from 'react';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
      setMenuOpen(current => !current);
    }
  

    return (
        <MainContainer style={{ background: '#b3ffcb'}}>
            <NavigationContainer style={{backgroundColor: '#b3ffcb'}}>
                <LeftSide>
                    <Logo to={'/'}>MEDICASE</Logo>
                </LeftSide>
                <RightSide>
                    <Links>
                        <ALink to={'/'}>Home</ALink>
                        <ALink to={'/institutions'}>Institutions</ALink>
                        <ALink to={'/user/account'}>Patient</ALink>
                        <ALink to={'/user/signup'}>Create an account</ALink>
                    </Links>
                    <MobileMenuButton onClick={handleClick}>
                        <MenuIcon/>
                    </MobileMenuButton>
                </RightSide>
            </NavigationContainer>
            {menuOpen && 
            <ExtendedLinks>
                <ALinkExtended to={'/'} onClick={handleClick}>Home</ALinkExtended>
                <ALinkExtended to={'/institutions'} onClick={handleClick}>Institutions</ALinkExtended>
                <ALinkExtended to={'/user/account'} onClick={handleClick}>Patient</ALinkExtended>
                <ALinkExtended to={'/user/signup'} onClick={handleClick}>Create an account</ALinkExtended>
            </ExtendedLinks>}
        </MainContainer>
    )
}

export const MainContainer = styled.div`
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    position: relative;
    padding: 5px 90px;

    @media (max-width: 1920px) {
        
    }

    @media (max-width: 1080px) {
        padding: 5px 90px;
    }

    @media (max-width: 768px) {
        padding: 5px 60px;
    }

    @media (max-width: 480px) {
        padding: 5px 20px;
        
    }
`;

const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;

    svg {
        font-size: 2.5rem;
    }

    @media (max-width: 1920px) {
        
    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {
        display: block;
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
    z-index: 10;
    postion: fixed;
    background: white;
    width: 100%;
    height: 50vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

const ALinkExtended = styled(Link)`
    text-decoration: none;
    color: black;
    padding: 8px 12px;
    margin: 10px 0;
    
    &:hover {
        color: white;
    }
`;

const ALink = styled(NavLink)`
    text-decoration: none;
    color: black;
    padding: 8px 12px;
    margin: 0 10px;

    &:hover {

    }

    &.active {
        padding-bottom: -0.2rem;
        border-bottom: 0.2rem solid blue;
    }
`;


export const Logo = styled(Link)`
    text-decoration: none;
    color: blue;
    font-size: 2rem;
    font-weight: 700;
    @media (max-width: 1920px) {

    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
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

export default Navigation