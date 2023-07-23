import React, { useEffect, useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { LeftHalf, RightHalf, TwoSidedParagraphContainer } from './PatientDetailsComponents';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ResetPasswordButton, ResetPasswordText, UpdateInputs } from '../HomePage/InstitutionsComponents';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const headerTwoStyles = { marginBottom: '20px', }

const AdminUserAccountData = () => {
    const params = useParams();

    const [userInformation, setUserInformation] = useState({ id:"", firstName: "", lastName: "", email: "", password: "", phone: "" });
    const [updateInProgress, setUpdateInProgress] = useState('');
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState({ severity: '', message: '' });

    const handleFormUpdate = ({currentTarget: input }) => { 
        setUserInformation({...userInformation, [input.name]: input.value})
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    useEffect(() => {
        let personnel = JSON.parse(localStorage.getItem('usr'));
         
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/admin/findById?id=${personnel.id}`)
        .then(response => { 
            setUserInformation(response.data); 
        })
        .catch(error => console.log(error));
    },[params])

    const updateData = (e) => {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mfss/admin/update?id=${userInformation._id}`, userInformation)
        .then(response => {
            if (response.status === 201) {
                setUpdateInProgress('Updating user info...');
                setTimeout(()=>{
                    setNotification({severity: 'success', message: "Account updated!"});
                    setOpen(true);
                    setUpdateInProgress('');
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

    const resetPassword = (e) => {
        e.preventDefault();

        if (userInformation.email === '' || !userInformation.email) {
            setNotification({ severity: 'error', message: 'Can not reset password without your email.' });
            setOpen(true);
            return;
        } else {
            let passwordResetInfo = { email: userInformation.email, hospital: params.institution }

            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mfss/admin/requestPasswordReset`, passwordResetInfo)
            .then(response => {
                if (response.status === 201) {
                    setNotification({ severity: 'success', message: response.data });
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

    return (
        <>
            <TwoSidedParagraphContainer style={{ width: '100%'}}>
                <LeftHalf>
                    <h3 style={headerTwoStyles}>Edit</h3>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="firstName">First name:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='firstName' value={userInformation.firstName} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="lastName">Last name:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='lastName' value={userInformation.lastName} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="email">Email:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='email' name='email' value={userInformation.email} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                        <LeftHalf>
                            <label htmlFor="phone">Phone:</label>
                        </LeftHalf>
                        <RightHalf>
                            <UpdateInputs type='text' name='phone' value={userInformation.phone} onChange={handleFormUpdate}/>
                        </RightHalf>
                    </TwoSidedParagraphContainer>
                    <Button variant='contained' style={{marginTop: '20px'}} color="secondary" size='small' onClick={updateData}>{updateInProgress !== '' ? updateInProgress : 'Update'}</Button>
                </LeftHalf>
                <RightHalf>
                </RightHalf>
            </TwoSidedParagraphContainer>
            <hr style={{marginTop: '40px'}}/>
            <ResetPasswordText><ResetPasswordButton onClick={resetPassword}>Click here</ResetPasswordButton> to reset your password.</ResetPasswordText>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AdminUserAccountData