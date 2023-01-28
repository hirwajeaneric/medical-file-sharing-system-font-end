import { Button, Snackbar } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import MuiAlert from '@mui/material/Alert';
import { NewFileForm } from '../../../components/Dashboard/NewFileComponents';
import { RecordDetailsContext } from '../../../App';

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
    const [hospitalInformation, setHospitalInformation] = useState({});
    const [file, setFile] = useState({
        creationDate: new Date().toDateString(),
        recordId: recordDetailsId,
        patientId: params.id,
        patientName: "",
        patientGender: "",
        patientAge: "",
        doctorId: "",
        nurseId: "",
        labTechId: "",
        type: "",
        prescriptions: "",
        neededExams: "",
        examsResults: "",
        hospitalName: "",
        hospitalId: "",
        hospitalLocation: "",
        fileAttachment: ""
    });

    /**
     * Data fetch
     */
    useEffect(()=>{
        // Get institution personnel information
        var user = JSON.parse(localStorage.getItem('instPe'));
        setInstitutionPersonnel(user);

        if (!recordDetailsId) {
            navigate(`/${params.institution}/dashboard/patients/${params.id}`);
        }

        // Fetch patient information
        axios.get(`http://localhost:5050/api/mfss/patient/findById?id=${params.id}`)
        .then(response => { setPatientInfo(response.data) })
        .catch(error => { console.log('Server error: '+error) })
    },[params.id, params.institution, recordDetailsId])

    // Fetch institutionInfo

    // Fetch Patient Info

    /**
     * 
     * Functions
     */
    const handleSubmit = (e)=> {
        e.preventDefault();

        file.hospitalName = institutionPersonnel.institutionName; 
        file.hospitalId= institutionPersonnel.institutionId;
        file.doctorId = institutionPersonnel.role === 'doctor' ? institutionPersonnel.id : "";
        file.nurseId = institutionPersonnel.role === 'nurse' ? institutionPersonnel.id : "";
        file.labTechId = institutionPersonnel.role === 'lab technician' ? institutionPersonnel.id : "";
        file.patientName = ""
        file.patientGender = ""
        file.patientAge = ""
        file.hospitalLocation = ""
        

        axios.post(`http://localhost:5050/api/mfss/file/add`, file)
        .then(response => { 
            setFile(response.data); 
        })
        .catch(error => { console.log('Server error: '+error) })
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