import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LeftHalf = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 48%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const RightHalf = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 48%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const TwoSidedParagraphContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    font-size: 90%;
    margin-bottom: 5px;
    width: 80%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const RecordsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
    font-size: 90%;
    width: 100%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const ARecord = styled(Link)`
    text-decoration: none;
    font-size: 85%;
    tex-align: left;
    
    svg {
        font-size: 100px;
    }    

    p {
        color: black;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageBody = styled.div`
    padding: 20px;
    background: white;
    margin-top: 20px;
    border-radius: 5px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const FormTwo = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    // gap: 20px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const DetailsPopup = styled.div`
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    z-index: 12;
    top: 0;
    left: 0;
`;

export const PopupBody = styled.div`
    width: 50%;
    height: 100%;
    z-index: 20;
    padding: 40px 60px;
    background: white;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 80%;
        padding: 40px 40px;
    }

    @media (max-width: 480px) {
        width: 100%;
        height: 80%;
        padding: 20px 20px;
    }  
`;

export const DetailDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;