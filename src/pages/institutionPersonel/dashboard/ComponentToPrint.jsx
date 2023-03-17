import axios from 'axios'
import React , { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReportBody, ReportFooter, ReportHeader, ReportPaperContainer, InstitutionDetails, ReportDateAndGenerator, ReportContent, Table } from '../../../components/Dashboard/ReportStyledComponents'

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const params = useParams();
    const [institution, setInstitution] = useState({});
    const [representative, setRepresentative] = useState({});
    const [reportType, setReportType] = useState('');
    const [filter, setFilter] = useState({});
    const [personnelStats, setPersonnelStats] = useState({});
    const [patientStats, setPatientStats] = useState({});
    const [patients, setPatients] = useState([]);
    const [personnel, setPersonnel] = useState([]);
    const [otherStatistics, setOtherStatistics] = useState({male: 0, female: 0, underAged: 0});

    // Fetching ospital information
    useEffect(() => {
        // Fetching needed local data
        const report = localStorage.getItem('report');
        const userInfo = JSON.parse(localStorage.getItem('instAdmPe'));
        const reportFilter = localStorage.getItem('filter');
        setReportType(report);
        setRepresentative(userInfo);
        setFilter(JSON.parse(reportFilter));
        
        const localPatientStats = localStorage.getItem('stats-patients');
        const localPayloadPatients = localStorage.getItem('payload-patients');
        const localPersonnelStats = localStorage.getItem('stats-personnel');
        const localPayloadPersonnel = localStorage.getItem('payload-personnel');
        setPatients(JSON.parse(localPayloadPatients));
        setPatientStats(JSON.parse(localPatientStats));
        setPersonnel(JSON.parse(localPayloadPersonnel));
        setPersonnelStats(JSON.parse(localPersonnelStats));

        // Filtering Male, Female and Underaged
        const listOfPatients = JSON.parse(localPayloadPatients);
        listOfPatients.forEach(element => {

        });

        // Finding institution by id
        axios.get(`http://localhost:5050/api/mfss/institution/findById?id=${userInfo.institutionId}`)
        .then(response => { setInstitution(response.data) })
        .catch(error => console.log(error))
    },[]);

    return (
        <ReportPaperContainer ref={ref}>
            <ReportHeader>
                <img src={`http://localhost:5050/api/mfss/uploads/${institution.logo}`} alt='' />
                <InstitutionDetails>
                    <h3>{institution.name}</h3>
                    <p>Location: {institution.location}</p>
                    <p>P.O. Box: {institution.postalBox}</p>
                    <p>Email: {institution.contactEmail}</p>
                    <p>Phone: {institution.contactPhone}</p>
                </InstitutionDetails>
            </ReportHeader>
            <ReportBody>
                <h1>{reportType}</h1>
                <ReportDateAndGenerator>
                    <p>Generated on: {new Date().toLocaleDateString()}</p>
                    <p>By: {representative.firstName+" "+representative.lastName}</p>
                </ReportDateAndGenerator>
                {/* General Hospital Report  */}
                {reportType==="General Hospital Report" && 
                    <ReportContent>

                    </ReportContent>
                }

                {/* Patient report  */}
                {reportType==="Patient Report" && 
                    <ReportContent>
                        <p>This report contains information about patients who visited our hospital in the period between {filter.from} and {filter.to}.
                            It provides the total number of those patients, and a list that contain the most important information for every patient.
                        </p>
                        <h4>General Statistics</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Total</th>
                                    <th>Short stay</th>
                                    <th>Hospitalized</th>
                                    <th>Male</th>
                                    <th>Female</th>
                                    <th>Bellow 18</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{patientStats.total}</td>
                                    <td>{patientStats.total-patientStats.hospitalized}</td>
                                    <td>{patientStats.hospitalized}</td>
                                    <td>{otherStatistics.male}</td>
                                    <td>{otherStatistics.female}</td>
                                    <td>{otherStatistics.underAged}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>List of patients</h4>

                    </ReportContent>
                }
                
                {/* Hospital personnel report  */}
                {reportType==="Hospital Personnel Report" && 
                    <ReportContent>

                    </ReportContent>
                }
            </ReportBody>
            <ReportFooter>
                <p>Copyright {new Date().getFullYear()} &copy; {institution.name}. All Rights Reserved. </p>
            </ReportFooter>
        </ReportPaperContainer>
    )
})