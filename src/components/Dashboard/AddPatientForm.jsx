import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FieldSet, FormInputTwo, LeftSide, RightSide } from './ReportsComponents';
import { fetchDistricts, fetchProvinces, fetchSectors } from '../../assets/locationHandler';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPatientForm = () => {
    //Other declarations
    const navigate = useNavigate();
    const params = useParams();

    //States
    const [medicalPersonnel, setMedicalPersonnel] = useState({});

    const [guardian, setGuardian] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
    const [guardianError, setGuardianError] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
    
    const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", dateOfBirth: "", gender: "", registeredAt: medicalPersonnel.institutionName ,joinDate: new Date()});
    const [personalInfoError, setPersonalInfoError] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: new Date()});
    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState({visible: false, message: ''});
    const [successMessageTwo, setSuccessMessageTwo] = useState({visible: false, message: ''});
    const [savingProgress, setSavingProgress] = useState('');
    const [notification, setNotification] = useState({ severity: '', message: '' });
    const [open, setOpen] = useState(false);

    const [locations, setLocations] = useState({province: 'Kigali',district: 'Gasabo',sector: ''})
    const [locationErrors, setLocationErrors] = useState({province: '',district: '',sector: '',})
    const [demoDistricts, setDemoDistricts] = useState([]);
    const [demoSectors, setDemoSectors] = useState([]);


    useEffect(() => {
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

    // Input handlers
    const handleLocation = ({currentTarget: input }) => {
        setLocations({...locations, [input.name]: input.value});
    };  

    const handlePersonalInfo = ({currentTarget: input }) => {
        setPersonalInfo({...personalInfo, [input.name]: input.value});
    };  

    const handleGuardianInfo = ({currentTarget: input }) => {
        setGuardian({...guardian, [input.name]: input.value});
    };  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false)
    };


    // Save
    const submitUserInfo = (e) => {
        e.preventDefault();

        personalInfo.password = 'Password@123';
        personalInfo.registeredAt = medicalPersonnel.institutionName;

        if (personalInfo.firstName===''){
            setPersonalInfoError({...personalInfoError, firstName: 'Required*'})
            return;
        } else if (personalInfo.lastName===''){
            setPersonalInfoError({...personalInfoError, lastName: 'Required*'})
            return;
        } else if (personalInfo.email===''){
            setPersonalInfoError({...personalInfoError, email: 'Required*'})
            return;
        } else if (personalInfo.phone===''){
            setPersonalInfoError({...personalInfoError, phone: 'Required*'})
            return;
        } else if (personalInfo.password ===''){
            setPersonalInfoError({...personalInfoError, password: 'Required*'})
            return;
        } else if (personalInfo.dateOfBirth===''){
            setPersonalInfoError({...personalInfoError, dateOfBirth: 'Required*'})
            return;
        } else if (personalInfo.gender ===''){
            setPersonalInfoError({...personalInfoError, gender: 'Required*'})
            return;
        } else if (locations.province===''){
            setLocationErrors({...locationErrors, province: 'Required*'})
            return;
        } else if (locations.district===''){
            setLocationErrors({...locationErrors, district: 'Required*'})
            return;
        } else if (locations.sector===''){
            setLocationErrors({...locationErrors, sector: 'Required*'})
            return;
        } else if (guardian.nameOfMaleGuardian ===''){
            setGuardianError({...guardianError, nameOfMaleGuardian: 'Required*'})
            return;
        } else if (guardian.nameOfFemaleGuardian ===''){
            setGuardianError({...guardianError, nameOfFemaleGuardian: 'Required*'})
            return;
        } else if (guardian.phoneOfMaleGuardian ===''){
            setGuardianError({...guardianError, phoneOfFemaleGuardian: 'Required*'})
            return;
        } else if (guardian.phoneOfFemaleGuardian ===''){
            setGuardianError({...guardianError, phoneOfFemaleGuardian: 'Required*'})
            return;
        } else {

            setGuardianError({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
            setPersonalInfoError({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: new Date().toDateString()});
            setLocationErrors({province: '',district: '',sector: '',})
            setErrorMessage('');

            personalInfo.residence = locations.province+", "+locations.district+", "+locations.sector;

            axios.post(`http://localhost:5050/api/mfss/patient/signup`, personalInfo)
            .then(response => {
                if (response.status === 201) {
                setSavingProgress('Saving in progress ...');
                
                setTimeout(()=>{
                    guardian.patientId = response.data.patient._id;

                    axios.post(`http://localhost:5050/api/mfss/guardian/add`, guardian)
                    .then(response=>{
                        setSavingProgress('');
                        window.location.replace(`/${params.institution}/${[params.role]}/patients`);
                        if (response.status === 201){
                            setNotification({message: "User account created!", severity: 'success'})
                        } else{
                            setNotification({message: 'Failed to save!', severity: 'error'})
                        }
                    })
                    .catch(error => setErrorMessage(error))
                }, 5000);
                }
            })
            .catch(error => { if (error.response && error.response.status >= 400 && error.response.status <= 500){ setErrorMessage(error.response.data.message) }
            })
        } 
    }

    // Removing the success message
    setTimeout(() => {
        if (successMessage.visible) {
        setSuccessMessage({ visible: false, message: '' })
        navigate('/');
        } else if (successMessageTwo.visible) {
        setSuccessMessageTwo({ visible: false, message: '' })
        } 
    },4000);

    return (
        <form onSubmit={submitUserInfo}>
            <FieldSet>
                <legend>Patient primary identity</legend>
                <LeftSide>
                    <FormInputTwo>
                        <label htmlFor="firstName">First name</label>
                        <div>
                            <input type="text" name="firstName" id="firstName" placeholder='First Name' onChange={handlePersonalInfo} value={personalInfo.firstName}/>
                            {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                        </div>
                    </FormInputTwo>
                    <FormInputTwo>
                        <label htmlFor="lastName">Last name</label>
                        <div>
                            <input type="text" name="lastName" id="lastName" placeholder='Last Name' onChange={handlePersonalInfo} value={personalInfo.lastName}/>
                            {personalInfoError.lastName && <p>{personalInfoError.lastName}</p>}
                        </div>
                    </FormInputTwo>
                </LeftSide>
                <RightSide>
                    <FormInputTwo>
                        <label htmlFor="gender">Gender</label>
                        <div>
                            <select name="gender" id="gender" onChange={handlePersonalInfo}>
                                <option value="">Choose Gender ...</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            {personalInfoError.gender && <p>{personalInfoError.gender}</p>}
                        </div>
                    </FormInputTwo>
                    <FormInputTwo>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <div>
                            <input type="date" name="dateOfBirth" id="dateOfBirth" onChange={handlePersonalInfo} value={personalInfo.dateOfBirth}/>
                            {personalInfoError.dateOfBirth && <p>{personalInfoError.dateOfBirth}</p>}
                        </div>
                    </FormInputTwo>
                </RightSide>
            </FieldSet>
            <FieldSet>
                <legend>Contact information</legend>
                <LeftSide>
                    <FormInputTwo>
                        <label htmlFor="phone">Phone</label>
                        <div>
                            <input type="text" name="phone" id="phone" placeholder='Phone number' onChange={handlePersonalInfo} value={personalInfo.phone}/>
                            {personalInfoError.phone && <p>{personalInfoError.phone}</p>}
                        </div>
                    </FormInputTwo>
                </LeftSide>
                <RightSide>
                    <FormInputTwo>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input type="email" name="email" id="email" placeholder='Email' onChange={handlePersonalInfo} value={personalInfo.email}/>
                            {personalInfoError.email && <p>{personalInfoError.email}</p>}
                        </div>
                    </FormInputTwo>
                </RightSide>
            </FieldSet>
            <FieldSet>
                <legend>Residence/ Location</legend>
                <LeftSide>
                    <FormInputTwo>
                        <label htmlFor="province">Province</label>
                        <div>
                            <select name="province" id="province" onClick={()=>setDemoDistricts(fetchDistricts(locations.province)[0])} onChange={handleLocation}>
                                <option value=''>Choose province</option>
                                {fetchProvinces().map((province, index)=>
                                    <option value={province.name} key={index}>{province.name}</option>
                                )}
                            </select>
                            {locationErrors.province && <p>{locationErrors.province}</p>}
                        </div>
                    </FormInputTwo>
                    <FormInputTwo>
                        <label htmlFor="district">District</label>
                        <div>
                            <select name="district" id="district" onClick={()=> setDemoDistricts(fetchDistricts(locations.province)[0])} onChange={handleLocation}>
                                <option value=''>Choose District</option>
                                {demoDistricts.map((district, index) =>
                                    <option key={index}>{district.name}</option>
                                )}
                            </select>
                            {locationErrors.district && <p>{locationErrors.district}</p>}
                        </div>
                    </FormInputTwo>
                </LeftSide>
                <RightSide>
                    <FormInputTwo>
                        <label htmlFor="sector">Sector</label>
                        <div>
                            <select name="sector" id="sector" onClick={()=>setDemoSectors(fetchSectors(locations.province, locations.district)[0])} onChange={handleLocation}>
                                <option value=''>Choose Sector</option>
                                {demoSectors.map((sector, index) => 
                                    <option value={sector.name} key={index}>{sector.name}</option>
                                )}
                            </select>
                            {locationErrors.sector && <p>{locationErrors.sector}</p>}
                        </div>
                    </FormInputTwo>
                </RightSide>
            </FieldSet>
            <FieldSet>
                <legend>Guardians</legend>
                <LeftSide>
                    <FormInputTwo>
                        <label htmlFor="nameOfMaleGuardian">Name of male guardian</label>
                        <div>
                            <input type="text" name="nameOfMaleGuardian" id="nameOfMaleGuardian" placeholder='Name of male guardian' value={guardian.nameOfMaleGuardian} onChange={handleGuardianInfo}/>
                            {guardianError.nameOfMaleGuardian && <p>{guardianError.nameOfMaleGuardian}</p>}
                        </div>
                    </FormInputTwo>
                    <FormInputTwo>
                        <label htmlFor="phoneOfMaleGuardian">Phone of male guardian</label>
                        <div>
                            <input type="text" name="phoneOfMaleGuardian" id="phoneOfMaleGuardian" placeholder='Phone number of male guardian' value={guardian.phoneOfMaleGuardian} onChange={handleGuardianInfo}/>
                            {guardianError.phoneOfMaleGuardian && <p>{guardianError.phoneOfMaleGuardian}</p>}
                        </div>
                    </FormInputTwo>
                </LeftSide>
                <RightSide>
                    <FormInputTwo>
                        <label htmlFor="nameOfFemaleGuardian">Name of female guardian</label>
                        <div>
                            <input type="text" name="nameOfFemaleGuardian" id="nameOfFemaleGuardian" placeholder='Name of female guardian' value={guardian.nameOfFemaleGuardian} onChange={handleGuardianInfo}/>
                            {guardianError.nameOfFemaleGuardian && <p>{guardianError.nameOfFemaleGuardian}</p>}
                        </div>
                    </FormInputTwo>
                    <FormInputTwo>
                        <label htmlFor="phoneOfFemaleGuardian">Phone of female guardian</label>
                        <div>
                            <input type="text" name="phoneOfFemaleGuardian" id="phoneOfFemaleGuardian" placeholder='Phone number of female guardian' value={guardian.phoneOfFemaleGuardian} onChange={handleGuardianInfo}/>
                            {guardianError.phoneOfFemaleGuardian && <p>{guardianError.phoneOfFemaleGuardian}</p>}
                        </div>
                    </FormInputTwo>
                </RightSide>
            </FieldSet>
            <Button type='submit' variant='contained' size='small'>{savingProgress !== '' ? savingProgress : "Submit"}</Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </form>
    )
}

export default AddPatientForm