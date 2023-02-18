import React, { useEffect, useState } from 'react'
import PatientChart from '../../../components/Charts/PatientChart'
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientsStats = () => {    
    const params = useParams();
    
    const [topStats, setTopStats] = useState({ servedPatients: 0, registeredPatients: 0, transferedPatients: 0 });
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

        var registeredPatients = [];
        var served = [];
        var transfered = [];

        // Fetch patients
        axios.get(`http://localhost:5050/api/mfss/patient/list`)
        .then(response => {
            response.data.forEach(element => {
                if (element.registeredAt === personnel.institutionName) {
                    registeredPatients.push(element);
                }
            })
        })
        .catch(error => console.log(error));

        // Fetch records
        axios.get(`http://localhost:5050/api/mfss/record/list`)
        .then(response => {
            response.data.forEach(element => {
                if (element.hospitalName === personnel.institutionName) {
                    served.push(element);
                }
            })
        })
        .catch(error => console.log(error));

        // Fetch files
        axios.get(`http://localhost:5050/api/mfss/file/list`)
        .then(response => {
            response.data.forEach(element => {
                if (element.hospitalName === personnel.institutionName && element.type === 'patient transfer') {
                    transfered.push(element);
                }
            })
        })
        .catch(error => console.log(error));

        // Populate all stats
        setTopStats({ registeredPatients: registeredPatients.length, servedPatients: served.length, transferedPatients: transfered.length});
    },[params.role])

    return (
        <>
            <Stats>
                <AStatistic>
                    <div>
                        <h1>{topStats.servedPatients}</h1>
                        <p>Served</p>
                    </div>
                    <img src="/img/1.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.registeredPatients}</h1>
                        <p>Registered</p>
                    </div>
                    <img src="/img/2.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.transferedPatients}</h1>
                        <p>Transfered</p>
                    </div>
                    <img src="/img/3.png" alt="" />
                </AStatistic>
                {/* <AStatistic>
                    <div>
                        <h1>{topStats.complainingPatients}</h1>
                        <p>Abuse reports</p>
                    </div>
                    <img src="/img/4.png" alt="" />
                </AStatistic> */}
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

export default PatientsStats