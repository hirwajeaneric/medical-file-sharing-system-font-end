import axios from 'axios'
import React , { useEffect } from 'react'
import { useState } from 'react'
import { ReportBody, ReportFooter, ReportHeader, ReportPaperContainer, InstitutionDetails, ReportDateAndGenerator, ReportContent, Table, TableList } from '../../../components/Dashboard/ReportStyledComponents'

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [admin, setAdmin] = useState({});
    const [reportType, setReportType] = useState('');
    const [diseasesStats, setDiseasesStats] = useState({ total: 0, positive: 0, rare: 0, extreme: 0, testedDiseases: [], rareCases: [], extremeCases: [] });
    
    const [personnelStats, setPersonnelStats] = useState({});
    const [hospitalStats, setHospitalStats] = useState({total: 0, active: 0, inactive: 0, north: 0, south: 0, east: 0, west: 0});
    const [hospitals, setHospitals] = useState([]);
    const [personnel, setPersonnel] = useState([]);

    // Fetching ospital information
    useEffect(() => {
        // Fetching needed local data
        const report = localStorage.getItem('report-A');
        const userInfo = JSON.parse(localStorage.getItem('usr'));
        setAdmin(userInfo);
        setReportType(report);
        
        const localHospitalsStats = localStorage.getItem('stats-hospitals-A');
        const localPayloadHospitals = localStorage.getItem('payload-hospitals-A');
        const localPersonnelStats = localStorage.getItem('stats-personnel-A');
        const localPayloadPersonnel = localStorage.getItem('payload-personnel-A');
        const localDiseasesStats = localStorage.getItem('stats-diseases-A');
        setHospitals(JSON.parse(localPayloadHospitals));
        setHospitalStats(JSON.parse(localHospitalsStats));
        setPersonnel(JSON.parse(localPayloadPersonnel));
        setPersonnelStats(JSON.parse(localPersonnelStats));
        setDiseasesStats(JSON.parse(localDiseasesStats));
    },[]);

    return (
        <ReportPaperContainer ref={ref}>
            <ReportHeader>
                <img src={`/img/moh.png`} style={{ width: '30%'}} alt='' />
                <InstitutionDetails>
                    <h3>Medicase</h3>
                    <p>Location: Kigali, Rwanda</p>
                    <p>Email: info@medicase.com</p>
                    <p>Phone: 0780599859</p>
                </InstitutionDetails>
            </ReportHeader>
            <ReportBody>
                <h1>{reportType}</h1>
                <ReportDateAndGenerator>
                    <p>Generated on: {new Date().toLocaleDateString()}</p>
                    <p>Generated by: {admin.firstName+" "+admin.lastName}</p>
                </ReportDateAndGenerator>

                {/* Diseases tests Report  */}
                {reportType==="Recorded Diseases Numbers" && 
                    <ReportContent>
                    <p>This report contains statistical information about medical tests done in various hospitals that use the Medicase.
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
                {reportType==="Hospitals Report" && 
                    <ReportContent>
                        <p>This report contains as summarized overview and list of all hospitals which have the permission to use the medical file sharing system (Medicase).
                            Hospitals that have the permission to use this system are hospitals which submitted their application or request to use it. 
                            Their requests are revised and assessed by authorities from the ministry of health before being granted access to the system.
                            <br/><br/>
                            Among requirements needed for these hospitals include their work certificates allowing them to work in Rwanda.
                            <br/><br/>
                            Hospitals bellow have access to all information (records and files) created by other hospitals who use the system. 
                            This helps them to have quick access of all patients who are registered in the system thereby facilitating the access to their medical records.
                        </p>
                        <h4>General Statistics</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Total</th>
                                    <th>Active</th>
                                    <th>Inactive</th>
                                    <th>North</th>
                                    <th>South</th>
                                    <th>East</th>
                                    <th>West</th>
                                    <th>Kigali</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{hospitalStats.total}</td>
                                    <td>{hospitalStats.active}</td>
                                    <td>{hospitalStats.inactive}</td>
                                    <td>{hospitalStats.north}</td>
                                    <td>{hospitalStats.south}</td>
                                    <td>{hospitalStats.east}</td>
                                    <td>{hospitalStats.west}</td>
                                    <td>{hospitalStats.kigaliCity}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>List of hospitals with access</h4>
                        <TableList>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Number of personnel</th>
                                    <th>Date of entry</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hospitals.length !== 0 && 
                                    hospitals.map((hospital, index) => 
                                    <tr key={index}>
                                        <td>{hospital.name}</td>
                                        <td>{hospital.location}</td>
                                        <td>{hospital.numberOfPersonnel}</td>
                                        <td>{new Date(hospital.joinDate).toLocaleDateString()}</td>
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
                        <p>This report contains as summarized overview and list of hospital personnel who have access to this medical file sharing system.
                            <br/><br/>
                            The following personnel gained access to the system through their respective hospitals of service.
                            The hospital admin is responsible for adding new personnel, activating, desactivating or suspending personnel accounts to ensure a secure use of patient information.
                            <br/><br/>
                            These personnel include: <strong>Doctors, Lab technicians, nurses, and hospital admins.</strong> 
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
                                    <th>Hospital admins</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{personnelStats.total}</td>
                                    <td>{personnelStats.doctors}</td>
                                    <td>{personnelStats.nurses}</td>
                                    <td>{personnelStats.labtechnicians}</td>
                                    <td>{personnelStats.total - (personnelStats.doctors + personnelStats.nurses + personnelStats.labtechnicians)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br/>
                        <p>
                            The table bellow shows a list of all personnel. It also shows their roles, their user codes, and the status of their codes, and the time at which they joined the system.
                        </p>
                        <h4>List of hospitals</h4>
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
                <p>Copyright {new Date().getFullYear()} &copy; Medicase. All Rights Reserved. </p>
            </ReportFooter>
        </ReportPaperContainer>
    )
})