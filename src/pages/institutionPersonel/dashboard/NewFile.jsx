import { Button, Snackbar} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import MuiAlert from '@mui/material/Alert';
import { NewFileForm } from '../../../components/Dashboard/NewFileComponents';
import { RecordDetailsContext } from '../../../App';
import { FormInput } from '../../../components/HomePage/InstitutionsComponents';
import TestsForm from '../../../components/Dashboard/TestsForm';
import PrescriptionForm from '../../../components/Dashboard/PrescriptionForm';
import { Helmet } from 'react-helmet-async';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewFile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const recordDetailsId = useContext(RecordDetailsContext);

    // States 
    const [patientInfo, setPatientInfo] = useState({});
    const [institutionPersonnel, setInstitutionPersonnel] = useState({});
    const [notification, setNotification] = useState({ severity: '', message: '' });
    const [open, setOpen] = useState(false);
    const [institutionInformation, setInstitutionInformation] = useState({});
    const [file, setFile] = useState({ creationDate: new Date(), recordId: recordDetailsId, patientId: params.id, patientName: "", patientGender: "", patientAge: "", doctorId: "", nurseId: "", labTechId: "", type: "", prescriptions: "", exams: "", hospitalName: "", hospitalId: "", hospitalLocation: "", fileAttachment: "" });
    const [dataRows, setDataRows] = useState([]);
    const [inputData, setInputData] = useState({ number: dataRows.length+1, requiredTest: '', results: '' });
    const [prescriptionDataRows, setPrescriptionDataRows] = useState([]);
    const [inputPrescriptionData, setInputPrescriptionData] = useState({ number: dataRows.length+1, prescriptionName: '', type: '', quantity: '' });
    const [attachment, setAttachment] = useState('');

    /**
     * Data fetch
     */
    useEffect(()=>{
        // Get institution personnel information
        var user = {};
        if (params.role === 'r') {
            user = JSON.parse(localStorage.getItem('instAdmPe'));
        } else if (params.role === 'd') {
            user = JSON.parse(localStorage.getItem('instDocPe'));
        } else if (params.role === 'n') {
            user = JSON.parse(localStorage.getItem('instNurPe'));
        } else if (params.role === 'l') {
            user = JSON.parse(localStorage.getItem('instLabPe'));
        }
        setInstitutionPersonnel(user);

        // Fetch institutionInfo
        axios.get(`http://localhost:5050/api/mfss/institution/findById?id=${user.institutionId}`)
        .then(response => { setInstitutionInformation(response.data) })
        .catch(error => { console.log('Server error: '+error) })

        // When you refresh you go back
        if (!recordDetailsId) { navigate(`/${params.institution}/${params.role}/patients/${params.id}`) }

        // Fetch patient information
        axios.get(`http://localhost:5050/api/mfss/patient/findById?id=${params.id}`)
        .then(response => { setPatientInfo(response.data) })
        .catch(error => { console.log('Server error: '+error) });
        
    },[navigate, params.id, params.institution, params.role, recordDetailsId])


    // Fetch Patient Info
    useEffect(()=>{
        axios.get(`http://localhost:5050/api/mfss/patient/findById?id=${params.id}`)
        .then(response => { setPatientInfo(response.data) })
        .catch(error => { console.log('Server error: '+error) })
    },[params.id]);

    /**
     * 
     * Functions
     */

    const handleAttachment = (e) => {
        const {files} = e.target;
        setAttachment(files[0]);
    }

    const handleSubmit = (e)=> {
        e.preventDefault();

        const config = {headers: { "Content-Type":"multipart/form-data" }}

        if (!file.type === '') {
            setNotification({severity: 'warning', message: "You must choose the type of file you need."});
            setOpen(true);
            return;
        } else {
            // Pre-populated inputs done by the system itself
            file.hospitalName = institutionPersonnel.institutionName; 
            file.hospitalId= institutionPersonnel.institutionId;
            file.doctorId = institutionPersonnel.role === 'doctor' ? institutionPersonnel.id : "";
            file.nurseId = institutionPersonnel.role === 'nurse' ? institutionPersonnel.id : "";
            file.labTechId = institutionPersonnel.role === 'lab technician' ? institutionPersonnel.id : "";
            file.patientName = patientInfo.firstName+" "+patientInfo.lastName;
            file.patientGender = patientInfo.gender;
            file.patientAge = (new Date().getFullYear() - new Date(patientInfo.dateOfBirth).getFullYear()).toString();
            file.hospitalLocation = institutionInformation.location;
            file.fileAttachment = attachment;
            file.hospitalLogo = institutionInformation.logo;
            
            // Populating file data.
            if ( inputData.requiredTest ){
                dataRows.push(inputData);
                setInputData({ number: dataRows.length+1, requiredTest: '', results: '' });
            }

            if ( inputPrescriptionData.prescriptionName ){
                prescriptionDataRows.push(inputPrescriptionData);
                setInputPrescriptionData({ number: prescriptionDataRows.length+1, prescriptionName: '', type:'', quantity: '' });
            }

            file.exams = file.type === 'laboratory tests' ? JSON.stringify(dataRows) : '';
            file.prescriptions = file.type === 'medical prescritions' ? JSON.stringify(prescriptionDataRows) : ''; 

            // Clearing input fields
            setDataRows([]);
            setPrescriptionDataRows([]);
            setInputData({ number: 1, requiredTest: '', results: '' });
            setInputPrescriptionData({ number: 1, prescriptionName: '', type:'', quantity: '' })
            setAttachment("");

            const URL = file.fileAttachment ? 'http://localhost:5050/api/mfss/file/add' : 'http://localhost:5050/api/mfss/file/new';

            axios.post(URL, file, file.fileAttachment && config )
            .then(response => { 
                if (response.status === 201) {
                    setNotification({ severity: 'success', message: "File created"});
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

    const handleFormInput = ({currentTarget: input}) => {
        setFile({...file, [input.name]: input.value})
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    return (
        <Container>
            <Helmet>
                <title>Add File - {params.id} - Medicase</title>
                <meta name="description" content="Medicase, add new files."/> 
            </Helmet>            
            <PageHeaderContainer>
                <PageTitle>Add File</PageTitle>
                <Button variant='contained' size='small' onClick={()=> navigate(`/${params.institution}/${params.role}/patients/${params.id}`)}>Back</Button>
            </PageHeaderContainer>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <PageBody>
                <NewFileForm onSubmit={handleSubmit}>
                    <FormInput>
                        <select name='type' onChange={handleFormInput}>
                            <option value="">Choose file type...</option>
                            <option value="laboratory tests">Laboratory tests</option>
                            <option value="medical prescritions">Prescription</option>
                            {/* <option value="patient transfer">Tranfer</option> */}
                        </select>
                    </FormInput>
                    {file.type ? (file.type ==='medical prescritions' ? <h2>Prescriptions</h2> : file.type === "laboratory tests" ? <h2>Laboratory Tests</h2> : "") : ""}
                    {file.type && <>
                        {file.type==='laboratory tests' ? 
                            <TestsForm dataRows={dataRows} inputData={inputData} setInputData={setInputData}/> : 
                            <PrescriptionForm prescriptionDataRows={prescriptionDataRows} inputPrescriptionData={inputPrescriptionData} setInputPrescriptionData={setInputPrescriptionData} />
                        }
                        <FormInput>
                            <label htmlFor="fileAttachment">Add attachment:</label>
                            <input type="file" name="fileAttachment" id="fileAttachment" onChange={handleAttachment}/>
                        </FormInput>
                        <Button variant='contained' size='small' type='submit'>Save</Button>
                    </>}
                </NewFileForm>
            </PageBody>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default NewFile