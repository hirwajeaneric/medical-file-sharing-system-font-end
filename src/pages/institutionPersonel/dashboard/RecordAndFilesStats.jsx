import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PatientChart from '../../../components/Charts/PatientChart'
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'

const RecordAndFilesStats = () => {
    const params = useParams();

    const [topStats, setTopStats] = useState({ total: 0, open: 0, closed: 0, hospitalized: 0 })
    const [data, setData] = useState({});
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

        // Fetch patients
        axios.get(`http://localhost:5050/api/mfss/record/list`)
        .then(response => {
            let total = [];
            let open = [];
            let closed = []; 
            let hospitalized = [];
            let today = new Date().getTime();

            response.data.forEach(element => {
                if (element.hospitalName === personnel.institutionName) {
                    total.push(element);
                    let openDate = new Date(element.openTime).getTime();
                    console.log("Difference: "+((today - openDate) / (1000 * 3600 * 24)))

                    if (!element.closeTime && !element.recordCloser) {
                        open.push(element);
                    }
                    if (element.closeTime && element.recordCloser) {
                        closed.push(element);
                    }

                    if (((today - openDate) / (1000 * 3600 * 24)) > 4 && !element.closeTime && !element.recordCloser) {
                        hospitalized.push(element);
                    }
                } 
            });

            setTopStats({ total: total.length, open: open.length, closed: closed.length, hospitalized: hospitalized.length });
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
                    <PatientChart data={data} />
                </ChartOne>
                <SideChart>
                    <h3>Side bar</h3>
                </SideChart>
            </ChartSection>
        </>
    )
}

export default RecordAndFilesStats