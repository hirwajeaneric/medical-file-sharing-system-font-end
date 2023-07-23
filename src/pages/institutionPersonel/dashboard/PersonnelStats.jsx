import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PatientChart from '../../../components/Charts/PatientChart'
import PersonnelChart from '../../../components/Charts/PersonnelChart';
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'
import PersonnelTable from '../../../components/tables/PersonnelTable';

const PersonnelStats = () => {
    const params = useParams();
    
    const [topStats, setTopStats] = useState({ total: 0, doctors: 0, nurses: 0, labtechnicians: 0 })
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

        // Fetch patients
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institutionPersonnel/list`)
        .then(response => {
            let total = [];
            let doctors = [];
            let nurses = []; 
            let labtechnicians = [];

            // Bring filter information
            var filter = JSON.parse(localStorage.getItem('filter'));

            response.data.forEach(element => {
                if (element.institutionName === personnel.institutionName && Date.parse(element.joinDate) >= Date.parse(new Date(filter.from)) && Date.parse(element.joinDate) <= Date.parse(new Date(filter.to))) {
                    total.push(element);
                    
                    element.id = element._id
                    
                    if (element.role === 'nurse') {
                        nurses.push(element);
                    }
                    if (element.role === 'doctor') {
                        doctors.push(element);
                    }
                    if (element.role === 'lab technician') {
                        labtechnicians.push(element);
                    }
                } 
            });
            setData(total);
            setTopStats({ total: total.length, doctors: doctors.length, nurses: nurses.length, labtechnicians: labtechnicians.length });
        
            // Stringifying and sending filtered data to the localstorage for other pages to use it.
            const localPersonnel = JSON.stringify(total);
            const localStats = JSON.stringify({ total: total.length, doctors: doctors.length, nurses: nurses.length, labtechnicians: labtechnicians.length })

            localStorage.setItem('payload-personnel', localPersonnel);
            localStorage.setItem('stats-personnel',localStats);

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
                        <h1>{topStats.doctors}</h1>
                        <p>Doctors</p>
                    </div>
                    <img src="/img/2.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.nurses}</h1>
                        <p>Nurses</p>
                    </div>
                    <img src="/img/3.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.labtechnicians}</h1>
                        <p>Lab technicians</p>
                    </div>
                    <img src="/img/4.png" alt="" />
                </AStatistic>
            </Stats>
            <ChartSection>
                <ChartOne style={{ width: '100%'}}>
                    <PersonnelTable data={data} />
                </ChartOne>
            </ChartSection>
        </>
    )
}

export default PersonnelStats