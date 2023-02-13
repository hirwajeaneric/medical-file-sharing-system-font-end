import React, { useState } from 'react'
import PatientChart from '../../../components/Charts/PatientChart'
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'

const PersonnelStats = () => {
    
    const [topStats, setTopStats] = useState({
        total: 50,
        added: 5,
        suspended: 5,
        active: 45
    })
    const [data, setData] = useState({});
    
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
                        <h1>{topStats.added}</h1>
                        <p>Added</p>
                    </div>
                    <img src="/img/2.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.suspended}</h1>
                        <p>Suspended</p>
                    </div>
                    <img src="/img/3.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.active}</h1>
                        <p>Active</p>
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

export default PersonnelStats