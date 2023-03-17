import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { LeftHalf, RightHalf, TwoSidedParagraphContainer } from './PatientDetailsComponents';
import axios from 'axios';
import {  FormInput, UpdateInputs } from '../HomePage/InstitutionsComponents';
import MuiAlert from '@mui/material/Alert';
import { BsFileEarmarkPdf } from 'react-icons/bs';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const InstitutionDetails = ({ institution, setInstitution }) => {
    const [updateInProgress, setUpdateInProgress] = useState({ one: '', two: '', three: ''});
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState({ severity: '', message: '' });
    const [logo, setLogo] = useState('');
    const [certificate, setCertificate] = useState('');

    const handleFormUpdate = ({currentTarget: input }) => { 
        setInstitution({...institution, [input.name]: input.value})
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    const handleLogo = (e) => {
        const {files} = e.target;
        setLogo(files[0]);
    }

    const handleCertificate = (e) => {
        const {files} = e.target;
        setCertificate(files[0]);
    }

    const updateData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5050/api/mfss/institution/updateOne?id=${institution._id}`, institution)
        .then(response => {
            if (response.status === 201) {
                setUpdateInProgress({...updateInProgress, one: 'Updating institution info...'});
                setTimeout(()=>{
                    setNotification({severity: 'success', message: "Information updated!"});
                    setOpen(true);
                    setUpdateInProgress({...updateInProgress, one: ''});
                    window.location.reload();
                },3000)
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
                setOpen(true);
            }
        })
    }

    const uploadOrUpdateLogo = (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type":"multipart/form-data" } }

        if (logo === '') {
            setNotification({ severity: 'error', message: "No file uploaded"});
            setOpen(true);
            return;
        } else {
            institution.logo = logo;

            axios.put(`http://localhost:5050/api/mfss/institution/updateLogo?id=${institution._id}`, institution, config)
            .then(response => {
                if (response.status === 201) {
                    setUpdateInProgress({...updateInProgress, two: 'Updating...'});
                    setTimeout(()=>{
                        setNotification({severity: 'success', message: "Logo uploaded!"});
                        setOpen(true);
                        setUpdateInProgress({...updateInProgress, two: ''});
                        window.location.reload();
                    },3000)
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

    const uploadOrUpdateCertificate = (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type":"multipart/form-data" } }
        
        if (certificate === '') {
            setNotification({ severity: 'error', message: "No file uploaded"});
            setOpen(true);
            return;
        } else {
            institution.certificate = certificate;

            axios.put(`http://localhost:5050/api/mfss/institution/updateCertificate?id=${institution._id}`, institution, config)
            .then(response => {
                if (response.status === 201) {
                    setUpdateInProgress({...updateInProgress, three: 'Updating...'});
                    setTimeout(()=>{
                        setNotification({severity: 'success', message: "Certificate uploaded!"});
                        setOpen(true);
                        setUpdateInProgress({...updateInProgress, three: ''});
                        window.location.reload();
                    },3000)
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

    return (
        <>
            <TwoSidedParagraphContainer style={{ width: '100%'}}>
                <LeftHalf>
                    {/* <h2 style={headerTwoStyles}>Account for user: {institution.userCode}</h2> */}
                    <TwoSidedParagraphContainer style={{fontSize: '100%', marginBottom: '15px'}}>
                        <LeftHalf>
                            <p>Institution code:</p>
                        </LeftHalf>
                        <RightHalf>
                            <strong>{institution.institutionCode}</strong>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%', marginBottom: '15px'}}>
                        <LeftHalf>
                            <p>Approved to the system:</p>
                        </LeftHalf>
                        <RightHalf>
                            <strong>{institution.isApproved}</strong>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%', marginBottom: '15px'}}>
                        <LeftHalf>
                            <p>Number of personnel:</p>
                        </LeftHalf>
                        <RightHalf>
                            <strong>{institution.numberOfPersonnel}</strong>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%', marginBottom: '15px'}}>
                        <LeftHalf>
                            <p>Admin:</p>
                        </LeftHalf>
                        <RightHalf>
                            <strong>{institution.directorName}</strong>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="name">Name:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='name' value={institution.name || ''} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                </LeftHalf>
                <RightHalf>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="location">Location:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='location' value={institution.location || ''} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="name">Postal Box:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='postalBox' value={institution.postalBox || ''} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="name">Contact Email:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='contactEmail' value={institution.contactEmail || ''} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="name">Contact Phone:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='contactPhone' value={institution.contactPhone || ''} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <Button variant='contained' style={{marginTop: '20px'}} color="secondary" size='small' onClick={updateData}>{updateInProgress.one !== '' ? updateInProgress.one : 'Update'}</Button>
                </RightHalf>
            </TwoSidedParagraphContainer>
            <hr style={{ margin: '20px 0px 20px'}}/>
            <TwoSidedParagraphContainer style={{ width: '100%'}}>
                <LeftHalf >
                    <div 
                        style={{ 
                            backgroundImage: "url('http://localhost:5050/api/mfss/uploads/"+institution.logo+"')",  
                            height: '150px',
                            width: '150px',
                            backgroundSize: 'cover',
                            border: '1px solid gray',
                            marginBottom: '20px',
                        }}>
                    </div>
                </LeftHalf>
                <RightHalf>
                    <h3 style={{ marginBottom: '20px' }}>Upload/Update logo</h3>
                    <FormInput style={{ margin: '0px'}}>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" name='logo' onChange={handleLogo}/>
                    </FormInput>
                    <Button variant='contained' style={{marginTop: '20px'}} color="secondary" size='small' onClick={uploadOrUpdateLogo}>{updateInProgress.two !== '' ? updateInProgress.two : 'Update'}</Button>
                </RightHalf>
            </TwoSidedParagraphContainer>
            <hr style={{ margin: '20px 0px'}}/>
            <TwoSidedParagraphContainer style={{ width: '100%'}}>
                <LeftHalf>
                    <a href={`http://localhost:5050/api/mfss/uploads/${institution.certificate}`} target='_blank' rel="noreferrer" style={{ fontSize: '500%', color: 'tomato'}} ><BsFileEarmarkPdf/></a>
                </LeftHalf>
                <RightHalf>
                    <h3 style={{ marginBottom: '20px' }}>Upload/Update Certificate</h3>
                    <FormInput style={{ margin: '0px'}}>
                        <input type="file" name='logo' accept=".pdf" onChange={handleCertificate}/>
                    </FormInput>
                    <Button variant='contained' style={{marginTop: '20px'}} color="secondary" size='small' onClick={uploadOrUpdateCertificate}>{updateInProgress.three !== '' ? updateInProgress.three : 'Update'}</Button>
                </RightHalf>
            </TwoSidedParagraphContainer>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default InstitutionDetails