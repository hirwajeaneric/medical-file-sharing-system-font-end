import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PieChart from '../../../components/Charts/PieChart';
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'
import RecordsTable from '../../../components/tables/RecordsTable';

const RecordAndFilesStats = () => {
    const params = useParams();

    const [topStats, setTopStats] = useState({ total: 0, open: 0, closed: 0, hospitalized: 0 })
    const [data, setData] = useState([]);
    const [medicalPersonnel, setMedicalPersonnel] = useState({});
    
    useEffect(() => {
        let personnel = {};
        if (params.role === 'r') {
            personnel = JSON.parse(localStorage.getItem('instAdmPe'));
        } else if (params.role === 'd') {
            personnel = JSON.parse(localStorage.getItem('instDocPe'));
        } else if (params.role === 'n') {
            personnel = JSON.parse(localStorage.getItem('instNurPe'));
        } else if (params.role === 'l') {
            personnel = JSON.parse(localStorage.getItem('instLabPe'));
        } 
        setMedicalPersonnel(personnel);

        // Bring filter information
        var filter = JSON.parse(localStorage.getItem('filter'));

        // Fetch records
        axios.get(`http://localhost:5050/api/mfss/record/list`)
        .then(response => {
            let total = [];
            let open = [];
            let closed = []; 
            let hospitalized = [];          
            let today = new Date().getTime();
            
            console.log(filter);

            response.data.forEach(element => {

                // The conditions bellow generates besic numbers about records (Total, open, closed, hospitalized patients)
                if (element.hospitalName === personnel.institutionName && Date.parse(element.openTime) >= Date.parse(new Date(filter.from)) && Date.parse(element.openTime) <= Date.parse(new Date(filter.to))) {
                    let openDate = new Date(element.openTime).getTime();
                    
                    element.id = element._id;

                    //Total records
                    total.push(element);
                    // Open
                    if (!element.closeTime && !element.recordCloser) { open.push(element) }
                    // Closed 
                    if (element.closeTime && element.recordCloser) { closed.push(element) }
                    // Hospitalized
                    if (((today - openDate) / (1000 * 3600 * 24)) >= 2 && !element.closeTime && !element.recordCloser) { hospitalized.push(element) }
                } 
            });

            setData(total);
            setTopStats({ total: total.length, open: open.length, closed: closed.length, hospitalized: hospitalized.length });
        
            // Stringifying and sending filtered data to the localstorage for other pages to use it.
            const localPatients = JSON.stringify(total);
            const localStats = JSON.stringify({ total: total.length, open: open.length, closed: closed.length, hospitalized: hospitalized.length })

            localStorage.setItem('payload-patients', localPatients);
            localStorage.setItem('stats-patients',localStats);

        })
        .catch(error => console.log(error));
    },[params.role])

    return (
        <>
            <Stats>
                <AStatistic>
                    <div>
                        <h1>{topStats.total}</h1>
                        <p>Total</p>
                    </div>
                    <img src="/img/1.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.open}</h1>
                        <p>Open</p>
                    </div>
                    <img src="/img/2.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.closed}</h1>
                        <p>Closed</p>
                    </div>
                    <img src="/img/3.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.hospitalized}</h1>
                        <p>Hospitalized</p>
                    </div>
                    <img src="/img/4.png" alt="" />
                </AStatistic>
            </Stats>
            <ChartSection>
                <ChartOne>
                    <h4>Our Records</h4>
                    <RecordsTable data={data} />
                </ChartOne>
                <SideChart>
                    <h4>Overview</h4>
                    <PieChart chartData={[ topStats.open, topStats.closed, topStats.hospitalized ]}/>
                </SideChart>
            </ChartSection>
        </>
    )
}

export default RecordAndFilesStats

