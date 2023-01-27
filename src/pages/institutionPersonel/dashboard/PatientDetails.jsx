import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import { ARecord, LeftHalf, RecordsContainer, RightHalf, TwoSidedParagraphContainer } from '../../../components/Dashboard/PatientDetailsComponents'
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

const PatientDetails = () => {
    // Hooks
    const navigate = useNavigate();
    const params = useParams();

    // States
    const [patient, setPatient] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", residence: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: "" });
    const [guardians, setGuardians] = useState({ patientId: "", nameOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfMaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
    const [records, setRecords] = useState([]);
    // const [files, setFiles] = useState([]);

    /**
     * 
     * Data fetching
     * 
     * */

    // Fetch Patient Info
    useEffect(() => {
        axios.get(`http://localhost:5050/api/mfss/patient/findById?id=${params.id}`)
        .then(response => { setPatient(response.data);})
        .catch(error => { console.log(error) })
    },[params.id])

    // Fetch Guardian Info
    useEffect(()=>{
        axios.get(`http://localhost:5050/api/mfss/guardian/findByPatientId?patientId=${params.id}`)
        .then(response => { setGuardians(response.data); })
        .catch(error => { console.log(error) })
    },[params.id])

    // Fetch Records for this patient
    useEffect(()=>{
        axios.get(`http://localhost:5050/api/mfss/record/findByPatientId?patientId=${params.id}`)
        .then(response => { setRecords(response.data); })
        .catch(error => { console.log(error) })
    },[params.id])

    // // Fetch files for this patients record
    // useEffect(()=>{
    //     axios.get(`http://localhost:5050/api/mfss/file/findByRecordId?recordId=${params.id}`)
    //     .then(response => { setGuardians(response.data); })
    //     .catch(error => { console.log(error) })
    // },[params.id])


    return (
        <Container>
            <PageHeaderContainer>
                <PageTitle>Patient Info</PageTitle>
                <Button variant='contained' color='secondary' size='small' onClick={()=> navigate(`/${params.institution}/dashboard/patients`)}>Back</Button>
            </PageHeaderContainer>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <PageBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', gap: '10px', width: '100%'}}>
                <LeftHalf style={{ color: 'black' }}>
                    <TwoSidedParagraphContainer>
                        <strong>Name:</strong>
                        <p>&nbsp;{patient.firstName+" "+patient.lastName}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Email:</strong>
                        <p>&nbsp;{patient.email}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Phone:</strong>
                        <p>&nbsp;{patient.phone}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Residence:</strong>
                        <p>&nbsp;{patient.residence}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Gender:</strong>
                        <p>&nbsp;{patient.gender}</p>
                    </TwoSidedParagraphContainer>
                </LeftHalf>
                <RightHalf>
                    <TwoSidedParagraphContainer>
                        <strong>Date of birth:</strong>
                        <p>&nbsp;{patient.dateOfBirth}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Join Date:</strong>
                        <p>&nbsp;{patient.joinDate}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Marital Status:</strong>
                        <p>&nbsp;{patient.maritalStatus}</p>
                    </TwoSidedParagraphContainer>
                    {/* <TwoSidedParagraphContainer>
                        <strong>Name:</strong>
                        <p>&nbsp;{patient.firstName+" "+patient.lastName}</p>
                    </TwoSidedParagraphContainer> */}
                </RightHalf>
            </PageBody>
            <PageBody>
                <PageHeaderContainer>
                    <PageTitle>Records and Files</PageTitle>
                    <Button variant='contained' size='small' onClick={()=> navigate(`/${params.institution}/dashboard/patients`)}>Add record</Button>
                </PageHeaderContainer>
                <RecordsContainer>
                    <LeftHalf style={{ flexDirection: 'row' , gap: '10px', flexWrap: 'wrap' }}>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord><ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                        <ARecord>
                            <FcFolder/>
                            <p>Monday 10, 2023</p>
                        </ARecord>
                    </LeftHalf>
                    <RightHalf>

                    </RightHalf>
                </RecordsContainer>
            </PageBody>
        </Container>
  )
}

export default PatientDetails