import styled from 'styled-components';

export const Description = styled.p`
    color: white;
    line-height: 1.3rem;
    text-align: center;

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const MultiStepForm = styled.div`
    margin-top: 40px;
    background-color: white;
    padding: 0px 40px 40px;
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const FormContainer = styled.form`
    

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const FormHead = styled.h3`
    padding: 20px 0;

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const FormBody = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const FormInput = styled.div`
    font-size: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;

    label {
        margin: 0 0 7px;
    }

    input, select {
        padding: 5px;
        border: 1px solid #94b8b8;
        border-radius: 4px; 
    }

    p {
        color: tomato;
        margin: 5px 0;
    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {
        width: 100%;

        input, select {
            width: 100%;
        }
    }
`;

export const FormControlButtonsTwo = styled.div`
    button {
        padding: 8px 20px;
        text-decoration: none;
        color: white;
        background: #0066ff;
        font-weight: 600;
        border: none;

        &:hover {
            background: black;
        }
    }

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const FormSectionTitle = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    

    @media (max-width: 1080px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;

export const UpdateInputs = styled.input`
    padding: 5px;
    border: 1px solid #94b8b8;
    border-radius: 4px;
    width: 200px;

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {

    }
`;

export const ResetPasswordButton = styled.button`
    color: blue;
    font-size: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
`;

export const ResetPasswordText = styled.p`
    margin-top: 40px;
`;