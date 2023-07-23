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
    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", userCode: "", email: "", password: "", phone: "", role: "", isActive: "true", institutionId: "", institutionName: "", institutionCode: "" });
    const [notification, setNotification] = useState({ severity: '', message: '' });

    const handleClick = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    // Fetch Data 
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institutionPersonnel/findById?id=${popupPayLoad.id}`)
        .then(response => { setUserInfo(response.data); })
        .catch(error => { console.log(error); })
    },[popupPayLoad.id])

    // Activate account
    const activateAccount = async (e) => {
        e.preventDefault();
        
        userInfo.isActive = 'true';
        
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institutionPersonnel/update?id=${popupPayLoad.id}`, userInfo)
        .then(response => {
            if (response.status === 201) {
                setNotification({severity: 'success', message: "Account updated!"});
                setOpen(true);
                setTimeout(()=>{ window.location.reload(); },1000)
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
                setOpen(true);
            }
        })
    }


    // Desactivate account 
    const desactivateAccount = (e) => {
        e.preventDefault();

        userInfo.isActive = 'false';
        
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institutionPersonnel/update?id=${popupPayLoad.id}`, userInfo)
        .then(response => {
            if (response.status === 201) {
                setNotification({severity: 'success', message: "Account updated!"});
                setOpen(true);
                setTimeout(()=>{ window.location.reload(); },2000)
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
                setOpen(true);
            }
        })
    }

    // Delete account 
    const deleteAccount = (e) => {
        e.preventDefault();
        
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/mfss/institutionPersonnel/delete?id=${popupPayLoad.id}`)
        .then(response => {
            if (response.status === 201) {
                setNotification({severity: 'success', message: "Account deleted!"});
                setOpen(true);
                window.location.reload();
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
                setNotification({ severity: 'error', message: error.response.data.message});
                setOpen(true);
            }
        })

    }

    return (
        <>
            <h2 style={{ margin: '20px 0'}}>Personnel Information</h2>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <div style={{marginTop: '20px', fontSize: '90%'}}>
                <DetailDiv>
                    <p><strong>First Name: </strong></p>
                    <p>{userInfo.firstName}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Last Name: </strong></p>
                    <p>{userInfo.lastName}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Email: </strong></p>
                    <p>{userInfo.email}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Phone: </strong></p>
                    <p>{userInfo.phone}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Join Date: </strong></p>
                    <p>{userInfo.joinDate}</p>
                </DetailDiv>
                <hr style={{height: '1px', background: '#b3b3cc', border: 'none', marginBottom: '20px'}}/>
                <DetailDiv>
                    <p><strong>User Code: </strong></p>
                    <p>{userInfo.userCode}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Role: </strong></p>
                    <p>{userInfo.role}</p>
                </DetailDiv>
                <DetailDiv>
                    <p><strong>Is Active: </strong></p>
                    <p>{userInfo.isActive}</p>
                </DetailDiv>
                <hr style={{height: '1px', background: '#b3b3cc', border: 'none',  marginBottom: '20px'}}/>
                <DetailDiv>
                    <Button variant='contained' size="small" onClick={activateAccount}>Active account</Button>
                    <Button variant='contained' size="small" color='secondary' onClick={desactivateAccount}>Desactive account</Button>
                    <Button variant='contained' size="small" color='error' onClick={deleteAccount}>Delete account</Button>
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