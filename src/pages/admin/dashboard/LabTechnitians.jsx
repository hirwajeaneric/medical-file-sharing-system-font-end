import { Button, Snackbar } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import { DetailDiv } from '../../../components/Dashboard/DashboardHome';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
const PersonnelDetails = ({popupPayLoad}) => {

    const [open, setOpen] = React.useState(false);
    const [application, setApplication] = useState({})
    const [applicant, setApplicant] = useState({});
    const [institution, setInstitution] = useState({ name: "", type: "", location: "", directorId: "", directorName: "", specialization: "", joinDate: "", logo: "", isApproved: "", certificate: "", numberOfPersonnel: "", institutionCode: ""});
    const [notification, setNotification] = useState({ severity: '', message: '' });

    const handleClick = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    // Fetch Data 
    useEffect(()=>{
        axios.get(`http://localhost:5050/api/mfss/applicationForInstitution/findById?id=${popupPayLoad.id}`)
        .then(response=>{
            setApplication(response.data);

            axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findById?id=${response.data.directorId}`)
            .then(response=>{
                setApplicant(response.data);
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    },[popupPayLoad.id, application.directorId])

    // Approve 
    const approve = async (e) => {
        e.preventDefault();
    
        application.status = 'Approved';
        application.respondDate = new Date().toDateString();

        setNotification({severity: 'info', message: "Processing ..."});
        setOpen(true);
                    

        await axios.put(`http://localhost:5050/api/mfss/applicationForInstitution/update?id=${application._id}`, application)
        .then(response=>{

            setTimeout(()=>{
                /** Create new hospital. */
                institution.name = response.data.payload.institutionName
                institution.type =  response.data.payload.institutionType 
                institution.location = response.data.payload.location
                institution.directorId =  response.data.payload.directorId
                institution.directorName = applicant.firstName+" "+applicant.lastName
                institution.specialization = ""
                institution.joinDate = new Date().toDateString()
                institution.logo = ""
                institution.isApproved = true
                institution.certificate = response.data.payload.certificate
                institution.numberOfPersonnel = response.data.payload.numberOfPersonnel
                institution.institutionCode = response.data.payload.institutionName.replace(/\s/g, '').toLowerCase() ;

                // Record new institution
                axios.post(`http://localhost:5050/api/mfss/institution/approve`, institution)
                .then(response => {
                    setTimeout(()=>{
                        if (response.status === 201) {
                            // Fetch the recorded institution using the certificate provided.
                            axios.get(`http://localhost:5050/api/mfss/institution/findByCertificate?certificate=${institution.certificate}`)
                            .then(response => {

                                /** Update Applicant information. */
                                const institutionFirstThreeLetters = [];
                                for (var prop in institution.name) {
                                    if (prop < 4) 
                                        institutionFirstThreeLetters.push(institution.name[prop]);
                                };

                                const institutionIdLastThreeLetters = [];
                                for (var i in institution._id) {
                                    if (i === institution.length-3) 
                                    institutionIdLastThreeLetters.push(institution.name[i]);
                                };

                                let employeeNumber = 1;
                                var userCode = institutionFirstThreeLetters.join("").toUpperCase()+""+employeeNumber.toString().padStart(3, '0');
    
                                applicant.userCode = userCode
                                applicant.institutionId = response.data[0]._id
                                applicant.institutionCode = institution.institutionCode
                                applicant.institutionName = response.data[0].name
                                applicant.isActive = true
    
                                axios.put(`http://localhost:5050/api/mfss/institutionPersonnel/updateInstitution?id=${applicant._id}`, applicant)
                                .then(response => {
                                    if (response.status === 201) {
                                        setNotification({severity: 'success', message: "Request approved!"});
                                        setOpen(true);
                                    }
                                })
                                .catch(error => {
                                    if (error.response && error.response.status >= 400 && error.response.status <= 500){
                                        setNotification({ severity: 'error', message: error.response.data.message});
                                    }
                                })
                            })
                            .catch(error => {
                                console.log("Server error :: "+error);
                            })
                        }
                    },3000)  
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500){
                        setNotification({ severity: 'error', message: error.response.data.message});
                    }
                })
            },5000)
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
            }
        })
    }


    // Rejecting the application 
    const reject = (e) => {
        e.preventDefault();

        application.status = 'Rejected';
        application.respondDate = new Date().toDateString();

        axios.put(`http://localhost:5050/api/mfss/applicationForInstitution/update?id=${application._id}`, application)
        .then(response=>{
            if (response.status === 201) {
                setNotification({severity: 'success', message: response.data.message});
                setOpen(true);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
            }
        })
    }

    return (
        <>
            <h2 style={{ margin: '20px 0'}}>Application for Institution</h2>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <div style={{marginTop: '20px', fontSize: '90%'}}>
                <DetailDiv>
                    <p><strong>Institution Type: </strong></p>
                    <p>{application.institutionType}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Institution Name: </strong></p>
                    <p>{application.institutionName}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Location of institution: </strong></p>
                    <p>{application.location}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Number of personnel: </strong></p>
                    <p>{application.numberOfPersonnel}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Application Date: </strong></p>
                    <p>{application.sendDate}</p>
                </DetailDiv>
                <hr style={{height: '1px', background: '#b3b3cc', border: 'none', marginBottom: '20px'}}/>
                <DetailDiv>
                    <p><strong>Applicant: </strong></p>
                    <p>{applicant.firstName+" "+applicant.lastName}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Applicant Role: </strong></p>
                    <p>{applicant.role}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Applicant Phone number: </strong></p>
                    <p>{applicant.phone}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Applicant Email: </strong></p>
                    <p>{applicant.email}</p>
                </DetailDiv>
                <hr style={{height: '1px', background: '#b3b3cc', border: 'none',  marginBottom: '20px'}}/>
                <DetailDiv>
                    <p><strong>Application Status: </strong></p>
                    <p>{application.status}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Respond Date: </strong></p>
                    <p>{application.respondDate}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Certificate: </strong></p>
                    <a href={`http://localhost:5050/api/mfss/uploads/${application.certificate}`}>Work Certificate</a>
                </DetailDiv>
                <hr style={{height: '1px', background: '#b3b3cc', border: 'none',  marginBottom: '20px'}}/>
                <DetailDiv>
                    <Button variant='contained' size="small" onClick={approve}>Approve</Button>
                    <Button variant='contained' size="small" color='secondary' onClick={reject}>Reject</Button>
                </DetailDiv>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default PersonnelDetails