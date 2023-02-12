import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LeftHalf, RightHalf, TwoSidedParagraphContainer } from './PatientDetailsComponents'
import { FieldSet, FormInputTwo } from './ReportsComponents';

const AddPatientForm = () => {
    //Other declarations
    const navigate = useNavigate();
    const params = useParams();

    //States
    const [medicalPersonnel, setMedicalPersonnel] = useState({});

    const [guardian, setGuardian] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
    const [guardianError, setGuardianError] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
    
    const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", registeredAt: medicalPersonnel.institutionName ,joinDate: new Date().toDateString()});
    const [personalInfoError, setPersonalInfoError] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: new Date().toDateString()});
    
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState({visible: false, message: ''});
    const [successMessageTwo, setSuccessMessageTwo] = useState({visible: false, message: ''});
    const [savingProgress, setSavingProgress] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
    },[])

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

    const handleConfirmPassword = ({currentTarget: input}) => {
        setConfirmPassword(input.value);

        if (personalInfo.password !== input.value) {
        setConfirmPasswordError('Passwords do not match');
        } else {
        setConfirmPasswordError('')
        }
    };


    // Save
    const submitUserInfo = (e) => {
        e.preventDefault();

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
        } else if (confirmPassword ===''){
        setPersonalInfoError({...confirmPasswordError, confirmPasswordError: 'Required*'})
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

        console.log('This is what we are going to save for a patient: ');
        console.log(personalInfo);

        console.log('This is what we are going to save for guardians: ');
        console.log(guardian);

        axios.post(`http://localhost:5050/api/mfss/patient/signup`, personalInfo)
        .then(response => {
            if (response.status === 201) {
            setSavingProgress('Saving in progress ...');
            
            setTimeout(()=>{
                guardian.patientId = response.data.patient._id;

                axios.post(`http://localhost:5050/api/mfss/guardian/add`, guardian)
                .then(response=>{
                setSavingProgress('');
                if (response.status === 201){
                    setSuccessMessage({message: "User account created!", visible: true})
                    console.log(response.status);
                } else{
                    setErrorMessage('Unable to register user!')
                }
            })
                .catch(error => setErrorMessage(error))
            }, 5000);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
            setErrorMessage(error.response.data.message);
            }
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
            <TwoSidedParagraphContainer>
                <LeftHalf>
                    <FieldSet>
                        <legend>Patient primary identity</legend>
                        <FormInputTwo>
                            <label htmlFor="firstName">First name</label>
                            <div>
                                <input type="text" name="firstName" id="firstName" />
                                {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                            </div>
                        </FormInputTwo>
                        <FormInputTwo>
                            <label htmlFor="firstName">First name</label>
                            <div>
                                <input type="text" name="firstName" id="firstName" />
                                {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                            </div>
                        </FormInputTwo>
                        <FormInputTwo>
                            <label htmlFor="firstName">First name</label>
                            <div>
                                <input type="text" name="firstName" id="firstName" />
                                {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                            </div>
                        </FormInputTwo>
                        <FormInputTwo>
                            <label htmlFor="firstName">First name</label>
                            <div>
                                <input type="text" name="firstName" id="firstName" />
                                {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                            </div>
                        </FormInputTwo>
                    </FieldSet>
                </LeftHalf>
                <RightHalf>

                </RightHalf>
            </TwoSidedParagraphContainer>
        </form>
    )
}

export default AddPatientForm