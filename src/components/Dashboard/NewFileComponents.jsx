import { Button } from '@mui/material';
import styled from 'styled-components';

export const NewFileForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    h2 {
        margin-top: 10px;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const FileFormContainer = styled.form`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
    
    }

    @media (max-width: 480px) {
        
    }
`;

export const FormTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    tr:nth-child(even) {background-color: #f2f2f2;}
    border-radius: 10px;

    thead {
        background: #0066cc;
        color: white;
        padding: 5px;
    }

    tbody {
        font-size: 90%;
        
        tr {
            td {
                button {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-end;
                    background: transparent;
                    color: red;
                    border: none;
                    cursor: pointer;

                    svg {
                        font-size: 20px;
                    }

                    &:hover {
                        color: blue;
                    }
                }
            }
        }
    }

    tfoot {
        td {
            background: #80bfff;
            color: white;
            padding: 5px;
            text-align: left;
        }

        button {
            display: flex;
            flex-direction: row;
            align-items: center;
            background: transparent;
            color: white;
            border: none;
            cursor: pointer;

            &:hover {
                color: blue;
            }

            svg {
                font-size: 20px;
            }
        }
    }

    th {
        background: #0066cc;
        color: white;
        padding: 7px 10px;
        text-align: left;
    }

    tr {
        padding: 2px 10px;
    }

    td {
        padding: 7px 10px;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
    
    }

    @media (max-width: 480px) {
        
    }
`;

export const FileInputs = styled.input`
    padding: 5px 10px;
    width: 100%;
    border: none;
    background: transparent;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
    
    }

    @media (max-width: 480px) {
        
    }
`;

export const UpdateButton = styled.button`
    padding: 0px; 
    background: transparent;
    color: white; 
    border: none;

    &:hover {
        color: gray;
    }

`;

export const FileDetailsFooter = styled.div`
    background: black; 
    width: 100%; 
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const AddResultInput = styled.input`
    border: none;
    padding: 3px 5px;
    margin-left: 10px;
    width: 100%;
`; 

export const FileDetailsButton = styled.button`
    background: green !important;
    padding: 5px 10px !important;
    border: none;
    border-radius: 3px;
    color: white !important;

    &:hover {
        background: black !important;
        color: white !important;
    }
    
`;