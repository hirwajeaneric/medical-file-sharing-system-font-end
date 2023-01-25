import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
    background: #ebebe0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const MainContent = styled.div`
    width: 100%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
    
    }

    @media (max-width: 480px) {
        
    }
`;


/** 
 * TOP BAR COMPONENTS 
 * */

export const TopBar = styled.div`
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    align-items: center;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const MenuButton = styled.button`
    width: 50px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    margin: 0;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const User = styled.div`
    display: flex;
    margin-right: 2rem;
    gap: 10px;
    align-items: center;
    position: relative;

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    svg {
        font-size: 150%;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const MenuPopup = styled.div`
    background-color: white;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    z-index: 10;
    right: 40px;
    gap: 10px;
    border-radius: 10px;
    align-items: flex-start;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    
    button {
        font-size: 100%;
        
        &:hover {
            color: grey;
        }
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;



/**
 * SIDE BAR COMPONENTS
 * 
 */

export const SideBar = styled.div`
    background: #0066ff;
    color: white;
    // width: 240px;
    display: flex;
    flex-direction: column;
    padding: 20px 0 20px 20px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin-bottom: 5px;
    padding-right: 20px; 

    svg {
        background: #66a3ff;
        font-size: 210%;
        padding: 3px;
        border-radius: 50%;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Mfss = styled.h1`


    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const HospitalName = styled.p`
    color: #e6f0ff;
    margin-top: 10px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const NavigationComponents = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const NavItemContainer = styled(NavLink)`
    text-decoration: none;
    color: white;
    padding: 8px 0;
    font-size: 90%;
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 10px 0 0 10px;

    &:hover {
        background: #66a3ff;
        color: white;
        padding-left: 10px;
    }

    svg {
        font-size: 130%;
    }

    &.active {
        background: white;
        color: black;
        padding-left: 10px;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const NavItemContainerHome = styled(Link)`
    text-decoration: none;
    color: white;
    padding: 8px 0;
    font-size: 90%;
    display: flex;
    align-items: center;
    gap: 20px;
    border-radius: 10px 0 0 10px;

    &:hover {
        background: #66a3ff;
        color: white;
        padding-left: 10px;
    }

    svg {
        font-size: 130%;
    }

    &.active {
        background: white;
        color: black;
        padding-left: 10px;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const NavItem = styled.p`
    

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;


/**
 * OUTLET SPACE
 * 
 */

export const OutletSpace = styled.div`
    padding: 25px;
    

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        padding: 7px;
    }

    @media (max-width: 480px) {
        padding: 5px;
    }
`;