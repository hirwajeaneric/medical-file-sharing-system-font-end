import React, { useState } from 'react'
import PatientChart from '../../../components/Charts/PatientChart'
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'

const PatientsStats = () => {
    
    const [topStats, setTopStats] = useState({
        servedPatients: 201,
        registeredPatients: 21,
        transferedPatients: 1,
        complainingPatients: 2
    })
    const [data, setData] = useState({});
    
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
                <AStatistic>
                    <div>
                        <h1>{topStats.complainingPatients}</h1>
                        <p>Abuse reports</p>
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

export default PatientsStats