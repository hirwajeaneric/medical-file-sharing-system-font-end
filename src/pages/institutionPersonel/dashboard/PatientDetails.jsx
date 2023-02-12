import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, Snackbar } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, FilePopup, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import { AFile, ARecord, LeftHalf, ListOfFiles, RecordDescriptionHeader, RecordsContainer, RightHalf, TwoSidedParagraphContainer } from '../../../components/Dashboard/PatientDetailsComponents'
import { FcFile, FcFolder } from "react-icons/fc";
import MuiAlert from '@mui/material/Alert';
import { RecordDetailsContextSetter } from '../../../App';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import moment from 'moment';
import FileDetails from './FileDetails'
import { Helmet } from 'react-helmet-async'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PatientDetails = () => {
    // Hooks
    const navigate = useNavigate();
    const params = useParams();
    const setRecordId = useContext(RecordDetailsContextSetter);

    // States
    const [patient, setPatient] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", residence: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: "" });
    const [guardians, setGuardians] = useState({ patientId: "", nameOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfMaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
    const [records, setRecords] = useState([]);
    const [files, setFiles] = useState([]);
    const [recordDetails, setRecordDetails] = useState({ firstName: "", lastName: "", patientId: "", email: "", hospitalName: "", hospitalId: "", recordOpener: "", recordCloser: "", openTime: "", closeTime: "", status: "", insuranceName: "", });
    const [medicalPersonnel, setMedicalPersonnel] = useState({});
    const [notification, setNotification] = useState({ severity: '', message: '' });
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({creationDate: "", recordId: "", patientId: "", patientName: "", patientGender: "", patientAge: "", doctorId: "", nurseId: "", labTechId: "", type: "", prescriptions: "", exams: "", hospitalName: "", hospitalId: "", hospitalLocation: "", fileAttachment: "" })

    // Popup states
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    
    /**
     * 
     * Data fetching
     * 
     * */

    // Fetch Patient Info
    useEffect(() => {
        axios.get(`http://localhost:5050/api/mfss/patient/findById?id=${params.id}`)
        .then(response => { 
            setPatient(response.data);

            // Fetch Guardian Info
            axios.get(`http://localhost:5050/api/mfss/guardian/findByPatientId?patientId=${patient._id}`)
            .then(response => { setGuardians(response.data); })
            .catch(error => { console.log(error) })
        })
        .catch(error => { console.log(error) })
    },[params.id, patient._id])


    // Fetch Records for this patient
    useEffect(()=>{
        axios.get(`http://localhost:5050/api/mfss/record/findByPatientId?patientId=${params.id}`)
        .then(response => { setRecords(response.data); })
        .catch(error => { console.log(error) })
    },[params.id])

    // Fetch files for this patients record
    useEffect(()=>{
        axios.get(`http://localhost:5050/api/mfss/file/findByRecordId?recordId=${recordDetails._id}`)
        .then(response => { setFiles(response.data); })
        .catch(error => { console.log(error) })
    },[recordDetails._id])

    // Fetch Medical Personnel information 
    useEffect(()=> {
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
        setMedicalPersonnel(personnel);
    },[params.role])

    
    /**
     * 
     * Functions
     * 
     * */

    // Open record
    const openRecord = (e) => {
        e.preventDefault();

        const recordToBeSaved = { firstName: patient.firstName, lastName: patient.lastName, patientId: patient._id, email: patient.email, hospitalName: medicalPersonnel.institutionName, hospitalId: medicalPersonnel.institutionId, recordOpener: medicalPersonnel.firstName+" "+medicalPersonnel.lastName, recordCloser: "", openTime: new Date(), closeTime: "", status: "open", insuranceName: "" };

        axios.post(`http://localhost:5050/api/mfss/record/new`, recordToBeSaved)
        .then(response => {
            if (response.status === 201) {
                setNotification({severity: 'success', message: response.data.message});
                setOpen(true);
                setTimeout(()=> { window.location.reload() },5000)
            }          
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
                setOpen(true);
            }
        })
    }

    // Close record
    const closeRecord = (e) => {
        e.preventDefault();
        
        if (files.length === 0) {
            setNotification({severity: 'error', message: "Can't close record, there are no files yet."});
            setOpen(true);
        } else {
            recordDetails.recordCloser = medicalPersonnel.firstName+" "+medicalPersonnel.lastName; 
            recordDetails.closeTime = new Date().toDateString();
            recordDetails.status = "closed";

            console.log("Record to be updated: ");
            console.log(recordDetails);

            axios.put(`http://localhost:5050/api/mfss/record/update?id=${recordDetails._id}`, recordDetails)
            .then(response => {
                if (response.status === 201) {
                    setNotification({severity: 'success', message: response.data.message});
                    setOpen(true);
                }          
            })
            .catch(error => {
                if (error.response && error.response.status >= 400 && error.response.status <= 500){
                    setNotification({ severity: 'error', message: error.response.data.message});
                    setOpen(true);
                }
            })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false)
    };

    return (
        <Container>
            <Helmet>
                <title>Patient Info - {patient.firstName+" "+patient.lastName} - Medicase</title>
                <meta name="description" content="Medicase, details about a patient. These include all records and files created for them."/> 
            </Helmet>
            <PageHeaderContainer>
                <PageTitle>Patient Info</PageTitle>
                <Button variant='contained' color='secondary' size='small' onClick={()=> navigate(`/${params.institution}/${params.role}/patients`)}>Back</Button>
            </PageHeaderContainer>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <PageBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', width: '100%'}}>
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
                    <TwoSidedParagraphContainer>
                        <strong>Date of birth:</strong>
                        <p>&nbsp;{patient.dateOfBirth}</p>
                    </TwoSidedParagraphContainer>
                </LeftHalf>
                <RightHalf>
                    <TwoSidedParagraphContainer>
                        <strong>Marital Status:</strong>
                        <p>&nbsp;{patient.maritalStatus}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Join Date:</strong>
                        <p>&nbsp;{patient.joinDate}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Male guardian:</strong>
                        <p>&nbsp;{guardians.nameOfMaleGuardian}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Phone number of male guardian:</strong>
                        <p>&nbsp;{guardians.phoneOfMaleGuardian}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Female guardian:</strong>
                        <p>&nbsp;{guardians.nameOfFemaleGuardian}</p>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer>
                        <strong>Phone number of female guardian:</strong>
                        <p>&nbsp;{guardians.phoneOfFemaleGuardian}</p>
                    </TwoSidedParagraphContainer>
                </RightHalf>
            </PageBody>
            <PageBody style={{ marginBottom: '40px' }}>
                <PageHeaderContainer style={{ marginBottom: '20px'}}>
                    <PageTitle>Records and Files</PageTitle>
                    {medicalPersonnel.role === 'nurse' && <Button variant='contained' size='small' onClick={openRecord}>Add record</Button>}
                </PageHeaderContainer>
                <RecordsContainer>
                    <LeftHalf style={{ flexDirection: 'row' , gap: '10px', flexWrap: 'wrap', width: '51%' }}>
                        {records && records.map((record, index)=>(
                            <ARecord key={index} onClick={() => setRecordDetails(record)}>
                                <FcFolder/>
                                <p>{record.openTime}</p>
                            </ARecord>
                        ))}
                        {records.length < 1 && <p>No records available</p>} 
                    </LeftHalf>                    
                    <RightHalf style={{ background: '#e0ebeb', borderRadius: '5px' }}>
                        {recordDetails.openTime && 
                            <RecordDescriptionHeader>
                                <LeftHalf>
                                    <p>Open date: <strong>{recordDetails.openTime}</strong></p>
                                    <p>By: <strong>{recordDetails.recordOpener}</strong></p>
                                    <p>Created at: <strong>{recordDetails.hospitalName}</strong></p>
                                    <p>Status: <strong>open</strong></p>
                                </LeftHalf>
                                <RightHalf>
                                    <p>Close date: <strong>{recordDetails.closeTime}</strong></p>
                                    <p>By: <strong>{recordDetails.recordCloser}</strong></p>
                                    <TwoSidedParagraphContainer style={{ marginBottom: '0px', width: '100%'}}>
                                        {!recordDetails.closeTime && 
                                            <>
                                                {(medicalPersonnel.role !=='nurse' && medicalPersonnel.role !=='Representative' && medicalPersonnel.institutionName === recordDetails.hospitalName) &&  
                                                    <Button style={{ marginTop: '10px'}} variant='contained' sx={{ padding: "0px 5px"}} size='small' color='success' onClick={() => { navigate('new'); setRecordId(recordDetails._id); }}><AiOutlinePlus />&nbsp;Add File</Button>
                                                }

                                                {(medicalPersonnel.role==='nurse' && medicalPersonnel.institutionName === recordDetails.hospitalName) && 
                                                    <Button style={{ marginTop: '10px'}} variant='contained' sx={{ padding: "0px 5px"}} size='small' color='warning' onClick={closeRecord}><AiOutlineClose />&nbsp;Close Record</Button>
                                                }
                                            </>
                                        }
                                    </TwoSidedParagraphContainer>
                                </RightHalf>
                            </RecordDescriptionHeader>
                        }
                        <ListOfFiles>
                            {files.map((file, index)=> (
                                <AFile key={index} onClick={() => {handleOpenModal(); setFile(file);}}>
                                    <FcFile />
                                    <p>{file.type}<br/>{moment(`${file.creationDate}`).format("MMM Do YYYY")}<br/>{moment(`${file.creationDate}`).format("h:mm:ss a")}</p>
                                </AFile>
                            ))}
                            {files.length < 1 && <p>No files</p>}
                        </ListOfFiles>
                    </RightHalf>
                </RecordsContainer>
            </PageBody>

            {/* Notifications snack bar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>

            {/* File details popup  */}
            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <FilePopup>
                    <FileDetails file={file}/>
                </FilePopup>
            </Modal>
        </Container>
  )
}

export default PatientDetails