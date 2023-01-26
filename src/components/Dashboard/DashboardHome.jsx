import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    position: relative;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageTitle = styled.h3`
    margin-bottom: 10px;
    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;    

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