import styled from 'styled-components';

export const ReportPaperContainer = styled.div`
    // border: 1px solid gray;
    width: 210mm;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const ReportHeader = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    img {
        width: 15%;
    }



`;

export const ReportFooter = styled.div`
    width: 100%;
    padding: 50px;

`;

export const ReportBody = styled.div`
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;