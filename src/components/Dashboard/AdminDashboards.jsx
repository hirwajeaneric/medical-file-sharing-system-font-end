import styled from 'styled-components';

export const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const HeadSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-weight: 600;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Durations = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    div {
        padding: 5px 10px;
        background: white;
        border-radius: 3px;
        
        button {
            background: transparent;
            border: none;
            color: gray;

            &:hover {
                color: black;
            }
        }
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const RangePeriods = styled.div`
    button {
        padding: 0 5px; 
    }
`;

export const DateRangePicker = styled.div`
    input {
        border: none;
        color: gray;
    }
`;

export const StatsCategories = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;
    border-bottom: 2px solid #ccccb3;
    
    a {
        padding: 10px;
        text-decoration: none;
        color: gray;
        font-size: 90%;
        margin-bottom: -2px;

        &:hover {

        }

        &.active{
            color: #006699;
            font-weight: 700;
            border-bottom: 2px solid #00cc44;
        }
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Stats = styled.div`
    background: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-item: center;
    margin-top: 25px;
    border-radius: 5px;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    // box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const AStatistic = styled.div`
    display: flex;
    flex-direction: row;
    padding: 30px 40px;

    div {
        p {
            color: #1a75ff;
            font-weight: 700;
        }
    }

    img {
        width: 80px;
        height: auto;
    }

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        padding: 20px 30px;
    }

    @media (max-width: 480px) {
        
    }
`;

export const ChartSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const ChartOne = styled.div`
    width: 68%;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    background: white;
    padding: 20px;
    border-radius: 5px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

export const SideChart = styled.div`
    width: 29%;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    background: white;
    padding: 20px;
    border-radius: 5px;

    @media (max-width: 1080px) {
        
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;