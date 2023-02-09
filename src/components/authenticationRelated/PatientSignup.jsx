import React, { useState } from 'react';
import axios from 'axios';
import ResponseMessages from '../OtherComponents/ResponseMessages';
import { MainContainer } from '../HomePage/Navigation';
import { SectionHeader, VerticallyFlexedContainer } from '../HomePage/Sponsors';
import { FormBody, FormContainer, FormControlButtonsTwo, FormHead, FormInput, FormSectionTitle, MultiStepForm } from '../HomePage/InstitutionsComponents';
import { fetchDistricts, fetchProvinces, fetchSectors } from '../../assets/locationHandler';
import { useNavigate } from 'react-router-dom';

const PatientSignup = () => {
  //Other declarations
  const navigate = useNavigate();

  //States
  const [guardian, setGuardian] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
  const [guardianError, setGuardianError] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
  
  const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: new Date().toDateString()});
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
    <MainContainer style={{backgroundColor: '#006622' }}>
      <VerticallyFlexedContainer style={{backgroundColor: '#006622' }}>
        <SectionHeader style={{color: 'white' }}>CREATE AN ACCOUNT</SectionHeader>
        <MultiStepForm style={{marginTop: '0px'}}>
          <FormContainer>
            <FormSectionTitle>
              <FormHead>Patient's information</FormHead>
              {savingProgress && <p>{savingProgress}</p>}
              {errorMessage && <ResponseMessages type='error' message={errorMessage}/>}
              {successMessage.visible && <ResponseMessages type='success' message={successMessage.message}/>}
            </FormSectionTitle>
            <hr/>
            <FormBody>
              <FormInput>
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" id="firstName" value={personalInfo.firstName} onChange={handlePersonalInfo} placeholder='First Name'/>
                {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" value={personalInfo.lastName} onChange={handlePersonalInfo} placeholder='Last Name'/>
                {personalInfoError.lastName && <p>{personalInfoError.lastName}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={handlePersonalInfo}>
                  <option value=''>Choose Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
                {personalInfoError.gender && <p>{personalInfoError.gender}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="maritalStatus">Marital Status</label>
                <select name="maritalStatus" id="maritalStatus" onChange={handlePersonalInfo}>
                  <option value="">Choose Status</option>
                  <option value='single'>Single</option>
                  <option value='married'>Married</option>
                </select>
                {personalInfoError.maritalStatus && <p>{personalInfoError.maritalStatus}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={personalInfo.email} onChange={handlePersonalInfo} placeholder='Email'/>
                {personalInfoError.email && <p>{personalInfoError.email}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" value={personalInfo.phone} onChange={handlePersonalInfo} placeholder='Phone'/>
                {personalInfoError.phone && <p>{personalInfoError.phone}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="province">Province</label>
                <select name="province" id="province" onClick={()=>setDemoDistricts(fetchDistricts(locations.province)[0])} onChange={handleLocation}>
                  <option value=''>Choose province</option>
                  {fetchProvinces().map((province, index)=>
                    <option value={province.name} key={index}>{province.name}</option>
                  )}
                </select>
                {locationErrors.province && <p>{locationErrors.province}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="district">District</label>
                <select name="district" id="district" onClick={()=> setDemoDistricts(fetchDistricts(locations.province)[0])} onChange={handleLocation}>
                  <option value=''>Choose District</option>
                  {demoDistricts.map((district, index) =>
                    <option key={index}>{district.name}</option>
                  )}
                </select>
                {locationErrors.district && <p>{locationErrors.district}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="sector">Sector</label>
                <select name="sector" id="sector" onClick={()=>setDemoSectors(fetchSectors(locations.province, locations.district)[0])} onChange={handleLocation}>
                  <option value=''>Choose Sector</option>
                  {demoSectors.map((sector, index) => 
                    <option value={sector.name} key={index}>{sector.name}</option>
                  )}
                </select>
                {locationErrors.sector && <p>{locationErrors.sector}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" value={personalInfo.password} onChange={handlePersonalInfo} placeholder='Password'/>
                {personalInfoError.password && <p>{personalInfoError.password}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} placeholder='Confirm password'/>
                {confirmPasswordError && <p>{confirmPasswordError}</p>}
              </FormInput>
              {/* <FormInput>
                <label htmlFor="placeOfBirth">Place of Birth</label>
                <input type="text" name="placeOfBirth" id="placeOfBirth" value={personalInfo.placeOfBirth} onChange={handlePersonalInfo} placeholder='Place of birth'/>
                {personalInfoError.placeOfBirth && <p>{personalInfoError.placeOfBirth}</p>}
              </FormInput> */}
              <FormInput>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" name="dateOfBirth" id="dateOfBirth" value={personalInfo.dateOfBirth} onChange={handlePersonalInfo} />
                {personalInfoError.dateOfBirth && <p>{personalInfoError.dateOfBirth}</p>}
              </FormInput>
            </FormBody>
            <FormSectionTitle>
              <FormHead>Information about guardians</FormHead>
            </FormSectionTitle>
            <hr/>
            <FormBody>
              <FormInput>
                <label htmlFor="nameOfMaleGuardian">Name of Male Guardian</label>
                <input type="text" name="nameOfMaleGuardian" id="nameOfMaleGuardian" value={guardian.nameOfMaleGuardian} onChange={handleGuardianInfo} placeholder='Name of male guardian'/>
                {guardianError.nameOfMaleGuardian && <p>{guardianError.nameOfMaleGuardian}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="phoneOfMaleGuardian">Phone number of Male Guardian</label>
                <input type="text" name="phoneOfMaleGuardian" id="phoneOfMaleGuardian" value={guardian.phoneOfMaleGuardian} onChange={handleGuardianInfo} placeholder='Phone number of Male guardian'/>
                {guardianError.phoneOfMaleGuardian && <p>{guardianError.phoneOfMaleGuardian}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="nameOfFemaleGuardian">Name of Female Guardian</label>
                <input type="text" name="nameOfFemaleGuardian" id="nameOfFemaleGuardian" value={guardian.nameOfFemaleGuardian} onChange={handleGuardianInfo} placeholder='Name of female guardian'/>
                {guardianError.nameOfFemaleGuardian && <p>{guardianError.nameOfFemaleGuardian}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="phoneOfFemaleGuardian">Phone of Female Guardian</label>
                <input type="text" name="phoneOfFemaleGuardian" id="phoneOfFemaleGuardian" value={guardian.phoneOfFemaleGuardian} onChange={handleGuardianInfo} placeholder='Phone number of male guardian'/>
                {guardianError.phoneOfFemaleGuardian && <p>{guardianError.phoneOfFemaleGuardian}</p>}
              </FormInput>
              <FormControlButtonsTwo>
                <button type='submit' onClick={submitUserInfo}>SAVE</button>
              </FormControlButtonsTwo>
            </FormBody>
            {successMessageTwo.visible && <ResponseMessages type='success' message={successMessageTwo.message}/>}
          </FormContainer>
        </MultiStepForm>
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

export default PatientSignup