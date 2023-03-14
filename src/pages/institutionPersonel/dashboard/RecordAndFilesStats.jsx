import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PatientChart from '../../../components/Charts/PatientChart'
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'

const RecordAndFilesStats = () => {
    const params = useParams();

    const [topStats, setTopStats] = useState({ total: 0, open: 0, closed: 0, hospitalized: 0 })
    // const [data, setData] = useState({ hospitalized: [0,0,0,0,0,0,0,0,0,0,0,0], regular: [0,0,0,0,0,0,0,0,0,0,0,0] });
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

                    //Total records
                    total.push(element);
                    // Open
                    if (!element.closeTime && !element.recordCloser) { open.push(element) }
                    // Closed 
                    if (element.closeTime && element.recordCloser) { closed.push(element) }
                    // Hospitalized
                    if (((today - openDate) / (1000 * 3600 * 24)) >= 2 && !element.closeTime && !element.recordCloser) { hospitalized.push(element) }
                }
                
                // These conditions are for creating datasets that will be used in the diagrams to compare hospitalized and regular patients recieved per month.
                // if (element.hospitalName === personnel.institutionName && element.closeTime) {
                //     let openMonth = new Date(element.openTime).getMonth();
                //     let openDay = new Date(element.openTime).getTime();
                //     let closeDay = new Date(element.closeTime).getTime();
                //     let hosp = [0,0,0,0,0,0,0,0,0,0,0,0];
                //     let regu = [0,0,0,0,0,0,0,0,0,0,0,0];

                //     if (openMonth === 0 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[0] = hosp[0]+1 } else { regu[0] = regu[0]+1 }
                //     if (openMonth === 1 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[1] = hosp[1]+1 } else { regu[1] = regu[1]+1 }
                //     if (openMonth === 2 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[2] = hosp[2]+1 } else { regu[2] = regu[2]+1 }
                //     if (openMonth === 3 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[3] = hosp[3]+1 } else { regu[3] = regu[3]+1 }
                //     if (openMonth === 4 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[4] = hosp[4]+1 } else { regu[4] = regu[4]+1 }
                //     if (openMonth === 5 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[5] = hosp[5]+1 } else { regu[5] = regu[5]+1 }
                //     if (openMonth === 6 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[6] = hosp[6]+1 } else { regu[6] = regu[6]+1 }
                //     if (openMonth === 7 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[7] = hosp[7]+1 } else { regu[7] = regu[7]+1 }
                //     if (openMonth === 8 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[8] = hosp[8]+1 } else { regu[8] = regu[8]+1 }
                //     if (openMonth === 9 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[9] = hosp[9]+1 } else { regu[9] = regu[9]+1 }
                //     if (openMonth === 10 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[10] = hosp[10]+1 } else { regu[10] = regu[10]+1 }
                //     if (openMonth === 11 && ((closeDay - openDay) / (1000 * 3600 * 24)) >= 2) { hosp[11] = hosp[11]+1 } else { regu[11] = regu[11]+1 }

                //     console.log("Hospitalized: ");
                //     console.log(hosp);
                //     console.log("Regular: ");
                //     console.log(regu);
                // }
                
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
                <ChartOne style={{ width: '100%'}}>
                    {/* <PatientChart data={data} /> */}
                </ChartOne>
                {/* <SideChart>
                    <h3>Side bar</h3>
                </SideChart> */}
            </ChartSection>
        </>
    )
}

export default RecordAndFilesStats