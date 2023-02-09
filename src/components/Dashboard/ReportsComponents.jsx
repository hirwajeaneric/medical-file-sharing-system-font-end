import styled from 'styled-components';

export const ReportForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;    
    flex-wrap: nowrap;

    div {
        button {
            margin-top: 10px;
        }
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;

        div {
            margin-bottom: 20px;
            width: 100% !important;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const CustomPeriodContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;    
    flex-wrap: wrap;
    margin-top: 10px; 
    padding: 10px 10px 0 10px;
    background: #e0e0eb;
    border-radius: 5px;
    margin-bottom: 0px !important;   

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        input {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        
    }
`;

export const NewFileForm3 = styled.form`
    
    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;