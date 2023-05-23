import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AStatistic, ChartOne, ChartSection, OverViewDetails, Stats } from '../../../components/Dashboard/AdminDashboards'
import TestsTable from '../../../components/tables/TestsTable';

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
        personnel = JSON.parse(localStorage.getItem('usr'));

        // Bring filter information
        // var filter = JSON.parse(localStorage.getItem('filter'));

        // Fetch records
        axios.get(`http://localhost:5050/api/mfss/file/list`)
        .then(response => {
            var stringifiedTestData = [];
            var parsedTestData = [];

            response.data.forEach(file => {
                // if (Date.parse(file.creationDate) >= Date.parse(new Date(filter.from)) && Date.parse(file.creationDate) <= Date.parse(new Date(filter.to))) {
                    if (file.exams) {
                        stringifiedTestData.push(file.exams);
                    }
                // }
            });

            stringifiedTestData.forEach(element => {
                parsedTestData.push(JSON.parse(element));
            });

            const mergedTestData = [].concat(...parsedTestData);

            mergedTestData.forEach((element, index) => {
                element.id = index;
            });

            var testStatistics = calculateTestStatistics(mergedTestData);

            setData(testStatistics.testedDiseases);
            setTopStats(testStatistics);

            console.log(testStatistics);
        
            // Stringifying and sending filtered data to the localstorage for other pages to use it.
            const localTestStats = JSON.stringify(testStatistics)
            localStorage.setItem('stats-diseases-A',localTestStats);
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
                <ChartOne style={{ width: topStats.extremeCases.length === 0 && topStats.rareCases.length === 0 ? '100%' : '68%' }}>
                    <h4>Tracked Diseases</h4>
                    <TestsTable data={data} />
                </ChartOne>
                {(topStats.extremeCases.length !== 0 || topStats.rareCases.length !== 0) && <OverViewDetails>
                    {topStats.extremeCases.length !== 0 && 
                        <div>
                            <h4>Extreme cases</h4>
                            <ul>
                                {topStats.extremeCases.map((element, index) => <p key={index}>{element}</p>)}
                            </ul>
                        </div>
                    }
                    {topStats.rareCases.length !== 0 && 
                        <div>
                            <h4>Rare cases</h4>
                            <ul>
                                {topStats.rareCases.map((element, index) => <li key={index}>{element}</li>)}
                            </ul>
                        </div>
                    }
                </OverViewDetails>}
            </ChartSection>
        </>
    )
}

