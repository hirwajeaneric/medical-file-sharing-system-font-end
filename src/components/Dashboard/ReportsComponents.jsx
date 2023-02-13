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

export const FormInputTwo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px;
    font-weight: normal;

    label {
        margin: 0 0 7px;
    }

    input, select {
        padding: 5px;
        border: 1px solid #94b8b8;
        border-radius: 4px;
        width: 200px;
    }

    p {
        color: tomato;
        margin: 5px 0;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 820px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const FieldSet = styled.fieldset`
    width: 100%; 
    border: 1px solid gray;    
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 90%;
    margin-bottom: 20px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const LeftSide = styled.div`
    width: 50%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const RightSide = styled.div`
    width: 50%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        
    }
`;
