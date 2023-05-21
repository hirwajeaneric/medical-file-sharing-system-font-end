import axios from 'axios'
import React , { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReportBody, ReportFooter, ReportHeader, ReportPaperContainer, InstitutionDetails, ReportDateAndGenerator, ReportContent, Table, TableList } from '../../../components/Dashboard/ReportStyledComponents'

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [institution, setInstitution] = useState({});
    const [representative, setRepresentative] = useState({});
    const [reportType, setReportType] = useState('');
    const [filter, setFilter] = useState({});
    const [diseasesStats, setDiseasesStats] = useState({ total: 0, positive: 0, rare: 0, extreme: 0, testedDiseases: [], rareCases: [], extremeCases: [] });
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
        const localDiseasesStats = localStorage.getItem('stats-diseases');
        const localPayloadPersonnel = localStorage.getItem('payload-personnel');
        setPatients(JSON.parse(localPayloadPatients));
        setPatientStats(JSON.parse(localPatientStats));
        setPersonnel(JSON.parse(localPayloadPersonnel));
        setPersonnelStats(JSON.parse(localPersonnelStats));
        setDiseasesStats(JSON.parse(localDiseasesStats));

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
                
                {/* Diseases tests Report  */}
                {reportType==="Recorded Diseases Numbers" && 
                    <ReportContent>
                    <p>This report contains statistical information about medical tests done for various diseases on patients who visited our hospital in the period between {filter.from} and {filter.to}.
                        It provides numbers for the over all number of diseases that were tested from our hospital, positve cases, rare cases, extreme cases, and list of tested diseases with their frequencies.
                    </p>
                    <h4>General Statistics</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>Total</th>
                                <th>Positive</th>
                                <th>Rare</th>
                                <th>Extreme</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{diseasesStats.total}</td>
                                <td>{diseasesStats.positive}</td>
                                <td>{diseasesStats.rare}</td>
                                <td>{diseasesStats.extreme}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4>Tested Cases and Frequency of Occurances.</h4>
                    <TableList>
                        <thead>
                            <tr>
                                <th>Test</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diseasesStats.testedDiseases.length !== 0 && 
                                diseasesStats.testedDiseases.map((disease, index) => 
                                <tr key={index}>
                                    <td>{disease.test}</td>
                                    <td>{disease.frequency}</td>
                                </tr>
                                )
                            }
                        </tbody>
                    </TableList>
                    {diseasesStats.extremeCases.length !== 0 && <>
                            <h4>Extreme cases: </h4>
                            <p>
                                {diseasesStats.extremeCases.map((element,index) => <span key={index}>{element} ,</span>)}
                            </p>
                        </>
                    }
                    {diseasesStats.rareCases.length !== 0 && <>
                            <h4>Rare cases: </h4>
                            <p>
                                {diseasesStats.rareCases.map((element,index) => <span key={index}>{element} ,</span>)}
                            </p>
                        </>
                    }

                </ReportContent>
                }

                {/* Patient report  */}
                {reportType==="Patient Report" && 
                    <ReportContent>
                        <p>This report contains information about patients who visited our hospital in the period between {filter.from} and {filter.to}.
                            It provides the total number of those patients, and a list that contains patients that visited the hospital, when they came in and when they exited or closed services with the hospital.
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
                        <TableList>
                            <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Date of entry</th>
                                    <th>Date of exit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.length !== 0 && 
                                    patients.map((patient, index) => 
                                    <tr key={index}>
                                        <td>{patient.firstName}</td>
                                        <td>{patient.lastName}</td>
                                        <td>{new Date(patient.openTime).toLocaleDateString()}</td>
                                        <td>{patient.closeTime && new Date(patient.closeTime).toLocaleDateString()}</td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </TableList>
                    </ReportContent>
                }
                
                {/* Hospital personnel report  */}
                {reportType==="Hospital Personnel Report" && 
                    <ReportContent>
                        <p>This report contains as summarized overview of hospital personnel that we employ and who use the system.
                            These personnel include: <strong>Doctors, Lab technicians, and nurses.</strong> 
                            Every user of the system has limited access to the system hence performing activities related to their given role.
                        </p>
                        <h4>General Statistics</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Total</th>
                                    <th>Doctors</th>
                                    <th>Nurses</th>
                                    <th>Lab technicians</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{personnelStats.total}</td>
                                    <td>{personnelStats.doctors}</td>
                                    <td>{personnelStats.nurses}</td>
                                    <td>{personnelStats.labtechnicians}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>List of patients</h4>
                        <TableList>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>User Code</th>
                                    <th>Role</th>
                                    <th>Account status</th>
                                    <th>Join date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personnel.length !== 0 && 
                                    personnel.map((aPersonnel, index) => 
                                    <tr key={index}>
                                        <td>{aPersonnel.firstName+" "+aPersonnel.lastName}</td>
                                        <td>{aPersonnel.userCode}</td>
                                        <td>{aPersonnel.role}</td>
                                        <td>{aPersonnel.isActive}</td>
                                        <td>{new Date(aPersonnel.joinDate).toLocaleDateString()}</td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </TableList>
                    </ReportContent>
                }
            </ReportBody>
            <ReportFooter>
                <p>Copyright {new Date().getFullYear()} &copy; {institution.name}. All Rights Reserved. </p>
            </ReportFooter>
        </ReportPaperContainer>
    )
})