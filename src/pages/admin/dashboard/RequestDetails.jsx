import { Snackbar } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import { DetailDiv } from '../../../components/Dashboard/DashboardHome';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
const RequestDetails = ({popupPayLoad}) => {

    const [open, setOpen] = React.useState(false);
    const [application, setApplication] = useState({})
    const [applicant, setApplicant] = useState({});

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

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

    useEffect(()=>{
    },[]);

    return (
        <>
            <h2 style={{ margin: '20px 0'}}>Application for Institution</h2>
            <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
            <div style={{marginTop: '20px'}}>
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
                    
                </DetailDiv>
            </div>

            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    )
}

export default RequestDetails