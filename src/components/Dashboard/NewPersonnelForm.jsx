import React, { useState, useEffect } from 'react';
import { FormTwo } from './DashboardHome';
import MuiAlert from '@mui/material/Alert';
import { Button, Snackbar } from '@mui/material';
import { FormInput } from '../HomePage/InstitutionsComponents';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewPersonnelForm = ({numberOfPersonnel}) => {
    // Hooks
    const params = useParams();

    // States
    const [localData,setLocalData] = useState({ institutionId:"", institutionName: "", institutionCode: "" });
    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", userCode: "", email: "", password: "", phone: "", role: "", isActive: "true", institutionId: "", institutionName: "", institutionCode: "" });
    const [userInputErrors, setUserInputErrors] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "" });
    const [notification, setNotification] = useState({ severity: '', message: '' });
    const [open, setOpen] = useState(false);
    const [institution, setInstitution] = useState({});
    const [progress, setProgress]= useState('');

    // Fetch Local Data
    useEffect(()=>{
        const local = JSON.parse(localStorage.getItem('instAdmPe'));
        setLocalData({ institutionId: local.institutionId, institutionName: local.institutionName })

        // Get all institution data
        axios.get(`http://localhost:5050/api/mfss/institution/findById?id=${local.institutionId}`)
        .then(response => { setInstitution(response.data) })
        .catch(error => console.log(error));
    },[]);    

    
    // Functions 
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false)
    };
    
    const handleFormInputs = ({currentTarget: input })=>{ 
        setUserInfo({...userInfo, [input.name]: input.value}) 
    };

    const clearInputs = () => { setUserInfo({firstName: "", lastName: "", userCode: "", email: "", password: "", phone: "", role: "", isActive: "true", joinDate: new Date().toDateString(), institutionId: localData.institutionId, institutionName: localData.institutionName, institutionCode: localData.institutionCode })}
    
    const clearInputErrors = ()=> { setUserInputErrors({ firstName: "", lastName: "", email: "", phone: "", role: "" })};
    
    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        var email = {email: userInfo.email, subject: 'Account credentials', text:''}

        userInfo.institutionId = localData.institutionId;
        userInfo.institutionName = localData.institutionName;
        userInfo.institutionCode = params.institution;
        userInfo.password = userInfo.lastName.replace(/\s/g, '')+""+999+"&";
        
        const institutionFirstThreeLetters = [];
        for (var prop in localData.institutionName) {
            if (prop < 4) 
                institutionFirstThreeLetters.push(localData.institutionName[prop]);
        };
        let employeeNumber = numberOfPersonnel+1;
        var userCode = institutionFirstThreeLetters.join("").toUpperCase()+""+employeeNumber.toString().padStart(3, '0');

        userInfo.userCode = userCode;
        // Email body composition
        email.text = `Dear ${userInfo.firstName} ${userInfo.lastName}, \n\nThis email contains user credentials for your new account for access to the Medicase (Medical File Sharing System) through ${localData.institutionName}.\n\nCREDENTIALS:\n1. Access URL: http://localhost:3030/${params.institution}/auth/signin\n2. User Code: ${userCode}\nPassword:${userInfo.password}\n\nNOTE THAT: You should immediately reset your password on signin. Any issues related to bleach to the system that is resulted by a institution personnel's fault can result to severe lawsuit measures or other charges according to the weight of the issue.\n\nIf you have an issue signing in, or getting access to your account, or if there is any sign of attach into your account. Please inform your hospital system admin in charge of the Medicase app.  \n\nRegards`;

        if (userInfo.firstName === ''){
            setUserInputErrors({...userInputErrors, firstName: 'Required*'});
            return;
        } else if (userInfo.lastName === '') {
            setUserInputErrors({...userInputErrors, lastName: 'Required*'});
            return;
        } else if (userInfo.email === '') {
            setUserInputErrors({...userInputErrors, email: 'Required*'});
            return;
        } else if (userInfo.phone === '') {
            setUserInputErrors({...userInputErrors, phone: 'Required*'});
            return;
        } else if (userInfo.phone.length !== 10) {
            setNotification({ severity: 'error', message: "Phone number must be of 10 digits. Example: 0789021233"});
            setOpen(true);
            return;
        } else if (userInfo.role === '') {
            setUserInputErrors({...userInputErrors, role: 'Required*'});
            return;
        } else {
            clearInputErrors();

            setProgress('Recording user info ...')

            axios.post(`http://localhost:5050/api/mfss/institutionPersonnel/addUser`, userInfo)
            .then(response=> {
                if (response.status === 201) {
                    
                    // Send an email containing account credentials to the newly created user.
                    axios.post(`http://localhost:5050/api/mfss/email`, email)
                    .then(response => {
                        if (response.status === 200) { console.log(response.data) }
                    })
                    .catch(error => { 
                        if (error.response && error.response.status >= 400 && error.response.status <= 500){
                            console.log(error.response.data.message);
                        }
                    })


                    let numberOfPersonnel = 0;

                    // Get full list of personnel
                    axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findByInstitutionId?institutionId=${localData.institutionId}`)
                    .then(response => { 
                        numberOfPersonnel = response.data.length 
                    })
                    .catch(error => console.log(error));

                    setTimeout(() => {
                        // Update the number of personnel
                        institution.numberOfPersonnel = numberOfPersonnel;
                        axios.put(`http://localhost:5050/api/mfss/institution/updateOne?id=${localData.institutionId}`,institution)
                        .then(response => {
                            if (response.status === 201) {
                                setProgress('');
                                setNotification({severity: 'success', message: "User information recorded!"});
                                setOpen(true);
                                clearInputs();
                                setTimeout(()=>{
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
                    }, 3000);        
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
            <FormTwo onSubmit={handleSubmit}>
                <FormInput>
                    <label htmlFor="firstName">Fist name</label>
                    <input type="text" name="firstName" id="firstName" value={userInfo.firstName} onChange={handleFormInputs} placeholder='First Name'/>
                    {userInputErrors.firstName && <p>{userInputErrors.firstName}</p>}
                </FormInput>
                <FormInput>
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" name="lastName" id="lastName" value={userInfo.lastName} onChange={handleFormInputs} placeholder='Last Name'/>
                    {userInputErrors.lastName && <p>{userInputErrors.lastName}</p>}
                </FormInput>
                <FormInput>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={userInfo.email} onChange={handleFormInputs} placeholder='Email'/>
                    {userInputErrors.email && <p>{userInputErrors.email}</p>}
                </FormInput>
                <FormInput>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" value={userInfo.phone} onChange={handleFormInputs} placeholder='Phone'/>
                    {userInputErrors.phone && <p>{userInputErrors.phone}</p>}
                </FormInput>
                <FormInput>
                    <label htmlFor="role">Role</label>
                    <select name="role" onChange={handleFormInputs} style={{width: '215px'}}>
                        <option value=''>Choose role…</option>
                        <option value='doctor'>Doctor</option>
                        <option value='nurse'>Nurse</option>
                        <option value='lab technician'>Lab Technician</option>
                        {/* <option value='pharmacist'>Pharmacist</option> */}
                    </select>
                    {userInputErrors.role && <p>{userInputErrors.role}</p>}
                </FormInput>
                <Button variant='contained' size='small' color='success' onClick={handleSubmit}>{progress ? progress : 'Add'}</Button>
            </FormTwo>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default NewPersonnelForm