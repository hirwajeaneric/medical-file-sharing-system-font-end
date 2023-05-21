import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PieChart from '../../../components/Charts/PieChart';
import { AStatistic, ChartOne, ChartSection, SideChart, Stats } from '../../../components/Dashboard/AdminDashboards'
import RecordsTable from '../../../components/tables/RecordsTable';

export default function TestedDiseasesStats() {
    const params = useParams();

    const [topStats, setTopStats] = useState({ 
        total: 0,
        positive: 0,
        rare: 0,
        extreme: 0,
        testedDiseases: [],
        rareCases: [],
        extremeCases: [] 
    });
    const [data, setData] = useState([]);
    const [tests, setTests] = useState([]);
    
    // Function to generate Statistics
    function calculateTestStatistics(tests) {
        let testStatistics = {
          total: 0,
          positive: 0,
          rare: 0,
          extreme: 0,
          testedDiseases: [],
          rareCases: [],
          extremeCases: []
        };
      
        let testFrequency = {};
        let positiveFrequency = {};
      
        tests.forEach(test => {
          const { requiredTest, results } = test;
      
          // Count total unique requiredTests
          if (!testFrequency[requiredTest]) {
            testStatistics.total++;
            testFrequency[requiredTest] = 1;
            testStatistics.testedDiseases.push({ test: requiredTest, frequency: 1 });
          } else {
            testFrequency[requiredTest]++;
            const index = testStatistics.testedDiseases.findIndex(item => item.test === requiredTest);
            testStatistics.testedDiseases[index].frequency++;
          }
      
          // Count positive tests
          if (results === 'Positive') {
            testStatistics.positive++;
      
            // Track positive frequency for each requiredTest
            if (!positiveFrequency[requiredTest]) {
              positiveFrequency[requiredTest] = 1;
            } else {
              positiveFrequency[requiredTest]++;
            }
          }
        });
      
        // Find rare and extreme cases
        Object.entries(positiveFrequency).forEach(([requiredTest, frequency]) => {
          if (frequency < 3) {
            testStatistics.rare++;
            testStatistics.rareCases.push(requiredTest);
          } else if (frequency >= 3) {
            testStatistics.extreme++;
            testStatistics.extremeCases.push(requiredTest);
          }
        });
      
        // Sort testedDiseases by frequency in descending order
        testStatistics.testedDiseases.sort((a, b) => b.frequency - a.frequency);
      
        return testStatistics;
    }
      
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

        // Bring filter information
        var filter = JSON.parse(localStorage.getItem('filter'));

        // Fetch records
        axios.get(`http://localhost:5050/api/mfss/file/list`)
        .then(response => {
            var stringifiedTestData = [];
            var parsedTestData = [];

            response.data.forEach(file => {
                if (file.hospitalName === personnel.institutionName && Date.parse(file.creationDate) >= Date.parse(new Date(filter.from)) && Date.parse(file.creationDate) <= Date.parse(new Date(filter.to))) {
                    if (file.exams) {
                        stringifiedTestData.push(file.exams);
                    }
                }
            });

            stringifiedTestData.forEach(element => {
                parsedTestData.push(JSON.parse(element));
            });

            const mergedTestData = [].concat(...parsedTestData);

            mergedTestData.forEach((element, index) => {
                element.id = index;
            });

            var testStatistics = calculateTestStatistics(mergedTestData);

            setData(mergedTestData);
            setTopStats(testStatistics);

            console.log(testStatistics);
        
            // Stringifying and sending filtered data to the localstorage for other pages to use it.
            const localTestData = JSON.stringify(mergedTestData);
            const localTestStats = JSON.stringify(testStatistics)

            localStorage.setItem('payload-diseases', localTestData);
            localStorage.setItem('stats-diseases',localTestStats);
        })
        .catch(error => console.log(error));
    },[params.role])

    return (
        <>
            <Stats>
                <AStatistic>
                    <div>
                        <h1>{topStats.total}</h1>
                        <p>Tracked</p>
                    </div>
                    <img src="/img/1.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.positive}</h1>
                        <p>Positive Cases</p>
                    </div>
                    <img src="/img/2.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.rare}</h1>
                        <p>Rare Cases</p>
                    </div>
                    <img src="/img/3.png" alt="" />
                </AStatistic>
                <AStatistic>
                    <div>
                        <h1>{topStats.extreme}</h1>
                        <p>Extreme cases</p>
                    </div>
                    <img src="/img/4.png" alt="" />
                </AStatistic>
            </Stats>
            <ChartSection>
                <ChartOne>
                    <h4>Tracked Diseases</h4>
                    <RecordsTable data={data} />
                </ChartOne>
                <SideChart>
                    <h4>Overview</h4>
                    {/* <PieChart chartData={[ topStats.positive, topStats.rare, topStats.extreme ]}/> */}
                </SideChart>
            </ChartSection>
        </>
    )
}

