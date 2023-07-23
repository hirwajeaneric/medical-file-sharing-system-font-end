import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'
import HospitalTable from '../../../components/tables/HospitalTable';
import PieChartAdmin from '../../../components/Charts/PieCharAdmin';

const HospitalStats = () => {
    const params = useParams();

    const [topStats, setTopStats] = useState({ total: 0, active: 0, inactive: 0, north: 0, south: 0, east: 0, west: 0, kigaliCity: 0 })
    const [data, setData] = useState([]);
 
    useEffect(() => {
        // Fetch records
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institution/list`)
        .then(response => {
            let total = [];
            let active = [];
            let inactive = []; 
            let north = [];
            let south = [];
            let east = [];
            let west = [];          
            let kigaliCity = [];

            response.data.forEach(element => {     
                element.id = element._id;
                //Total records
                total.push(element);
                // Active
                element.isApproved ? active.push(element) : inactive.push(element);
                // Locations
                if (element.location.split(",").includes("Kigali")) {
                    kigaliCity.push(element);
                } else if (element.location.split(",").includes("Southern")) {
                    south.push(element);
                } else if (element.location.split(",").includes("Northern")) {
                    north.push(element);
                } else if (element.location.split(",").includes("Eastern")) {
                    east.push(element);
                } else if (element.location.split(",").includes("Western")) {
                    west.push(element);
                }
            });
            setData(total);
            setTopStats({ total: total.length, active: active.length, inactive: inactive.length, north: north.length, south: south.length, east: east.length, west: west.length ,kigaliCity: kigaliCity.length});
        
            // Stringifying and sending filtered data to the localstorage for other pages to use it.
            const localPatients = JSON.stringify(total);
            const localStats = JSON.stringify({ total: total.length, active: active.length, inactive: inactive.length, north: north.length, south: south.length, east: east.length, west: west.length, kigaliCity: kigaliCity.length })

            localStorage.setItem('payload-hospitals-A', localPatients);
            localStorage.setItem('stats-hospitals-A',localStats);

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
                        <h1>{topStats.active || 0}</h1>
                        <p>Active</p>
                    </div>
                    <img src="/img/2.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.inactive || 0}</h1>
                        <p>Inactive</p>
                    </div>
                    <img src="/img/3.png" alt="" />
                </AStatistic>
            </Stats>
            <ChartSection>
                <ChartOne>
                    <h4>All Hospitals with access</h4>
                    <HospitalTable data={data} />
                </ChartOne>
                <SideChart>
                    <h4>Overview</h4>
                    <PieChartAdmin chartData={[ topStats.north, topStats.south, topStats.east, topStats.west, topStats.kigaliCity ]}/>
                </SideChart>
            </ChartSection>
        </>
    )
}

export default HospitalStats

