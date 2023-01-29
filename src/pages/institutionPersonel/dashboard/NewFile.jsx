import { Button, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import MuiAlert from '@mui/material/Alert';
import { NewFileForm } from '../../../components/Dashboard/NewFileComponents';
import { RecordDetailsContext } from '../../../App';
import { FormInput } from '../../../components/HomePage/InstitutionsComponents';
import froala_editorMin, {} from 'froala-editor';
import TestsForm from '../../../components/Dashboard/TestsForm';
import PrescriptionForm from '../../../components/Dashboard/PrescriptionForm';

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
    const [file, setFile] = useState({ creationDate: new Date().toDateString(), recordId: recordDetailsId, patientId: params.id, patientName: "", patientGender: "", patientAge: "", doctorId: "", nurseId: "", labTechId: "", type: "", prescriptions: "", exams: "", hospitalName: "", hospitalId: "", hospitalLocation: "", fileAttachment: "" });
    const [attachment, setattachment] = useState('');

    /**
     * Data fetch
     */
    useEffect(()=>{
        // Get institution personnel information
        var user = JSON.parse(localStorage.getItem('instPe'));
        setInstitutionPersonnel(user);

        // Fetch institutionInfo
        axios.get(`http://localhost:5050/api/mfss/institution/findById?id=${user.institutionId}`)
        .then(response => { setInstitutionInformation(response.data) })
        .catch(error => { console.log('Server error: '+error) })

        // When you refresh you go back
        if (!recordDetailsId) { navigate(`/${params.institution}/dashboard/patients/${params.id}`) }

        // Fetch patient information
        axios.get(`http://localhost:5050/api/mfss/patient/findById?id=${params.id}`)
        .then(response => { setPatientInfo(response.data) })
        .catch(error => { console.log('Server error: '+error) });

    },[navigate, params.id, params.institution, recordDetailsId])


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
    const handleSubmit = (e)=> {
        e.preventDefault();

        if (!file.type === '') {
            setNotification({severity: 'warning', message: "You must choose the type of file you need."});
            setOpen(true);
            return;
        } else {

            file.hospitalName = institutionPersonnel.institutionName; 
            file.hospitalId= institutionPersonnel.institutionId;
            file.doctorId = institutionPersonnel.role === 'doctor' ? institutionPersonnel.id : "";
            file.nurseId = institutionPersonnel.role === 'nurse' ? institutionPersonnel.id : "";
            file.labTechId = institutionPersonnel.role === 'lab technician' ? institutionPersonnel.id : "";
            file.patientName = patientInfo.firstName+" "+patientInfo.lastName;
            file.patientGender = patientInfo.gender;
            file.patientAge = (new Date().getFullYear() - new Date(patientInfo.dateOfBirth).getFullYear()).toString();
            file.hospitalLocation = institutionInformation.location;
            
            console.log("To be recorded: ");
            console.log(file);
    
            axios.post(`http://localhost:5050/api/mfss/file/add`, file)
            .then(response => { 
                setFile(response.data); 
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
        console.log(file);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    return (
        <Container>
            <PageHeaderContainer>
                <PageTitle>Add File</PageTitle>
                <Button variant='contained' size='small' onClick={()=> navigate(`/${params.institution}/dashboard/patients/${params.id}`)}>Back</Button>
            </PageHeaderContainer>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <PageBody>
                <NewFileForm onSubmit={handleSubmit}>
                    <FormInput>
                        <select name='type' onChange={handleFormInput}>
                            <option value="">Choose file type...</option>
                            <option value="laboratory tests">Laboratory tests</option>
                            <option value="medical prescritions">Prescription</option>
                        </select>
                    </FormInput>
                    {file.type ? (file.type ==='medical prescritions' ? <h2>Prescriptions</h2> : file.type === "laboratory tests" ? <h2>Laboratory Tests</h2> : "") : ""}
                    {file.type && <>
                        {file.type==='laboratory tests' ? <TestsForm /> : <PrescriptionForm />}
                        <FormInput>
                            <label htmlFor="fileAttachment">Add attachment:</label>
                            <input type="file" name="fileAttachment" id="fileAttachment" />
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