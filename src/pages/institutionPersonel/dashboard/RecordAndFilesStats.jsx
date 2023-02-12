import React, { useState } from 'react'
import PatientChart from '../../../components/Charts/PatientChart'
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'

const RecordAndFilesStats = () => {
    
    const [topStats, setTopStats] = useState({
        total: 100,
        open: 40,
        closed: 60,
        empty: 45
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
                        <h1>{topStats.empty}</h1>
                        <p>Empty</p>
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