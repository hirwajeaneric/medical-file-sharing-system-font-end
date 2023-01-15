import React, { useState } from 'react';
import axios from 'axios';
import ResponseMessages from '../OtherComponents/ResponseMessages';
import { MainContainer } from '../HomePage/Navigation';
import { SectionHeader, VerticallyFlexedContainer } from '../HomePage/Sponsors';
import { FormBody, FormContainer, FormControlButtonsTwo, FormHead, FormInput, FormSectionTitle, MultiStepForm } from '../HomePage/InstitutionsComponents';
import { fetchDistricts, fetchProvinces, fetchSectors } from '../../assets/locationHandler';

const PatientSignup = () => {
  //States
  const [guardian, setGuardian] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" });
  const [guardianError, setGuardianError] = useState({ patientId: "", nameOfMaleGuardian: "", locationOfMaleGuardian: "", nameOfFemaleGuardian: "", locationOfFemaleGuardian: "", phoneOfMaleGuardian: "", phoneOfFemaleGuardian: "" })
  
  const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: new Date().toDateString(), guardians: "" });
  const [personalInfoError, setPersonalInfoError] = useState({ firstName: "", lastName: "", residence: "", email: "", password: "", phone: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: new Date().toDateString(), guardians: ""});
  
  const [patient, setPatient] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState({visible: false, message: ''});
  const [errorMessageTwo, setErrorMessageTwo] = useState('');
  const [successMessageTwo, setSuccessMessageTwo] = useState({visible: false, message: ''});
  
  const [open, setOpen] = useState({formOne: true, formTwo: true});
  
  const [savingProgress, setSavingProgress] = useState('');
  const [savingProgressTwo, setSavingProgressTwo] = useState('');

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
      setPersonalInfoError({...personalInfoError, firstName: 'First name is required'})
      return;
    } else if (personalInfo.lastName===''){
      setPersonalInfoError({...personalInfoError, lastName: 'Last name is required'})
      return;
    } else if (personalInfo.email===''){
      setPersonalInfoError({...personalInfoError, email: 'Email is required'})
      return;
    } else if (personalInfo.phone===''){
      setPersonalInfoError({...personalInfoError, phone: 'Phone is required'})
      return;
    } else {

      setPersonalInfoError({firstName: "",lastName: "",email: "",phone: ""});
      setLocationErrors({province: '',district: '',sector: '',})
      setErrorMessage('');

      axios.post(`http://localhost:5050/api/mfss/institutionPersonnel/createUser`, personalInfo)
      .then(response => {
        if (response.status === 201) {
          setSavingProgress('Saving in progress ...');
          
          setTimeout(()=>{
            setSavingProgress('');
            setSuccessMessage({ message: response.data.message, visible: true });

            axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findByEmail?email=${response.data.info.email}`)
            .then(response=>{
              setPatient(response.data[0]._id)
            })
            .catch(error => setErrorMessage(error))

            setOpen({formOne: false, formTwo: true});
          }, 5000);
        }
      })
      .catch(error => {
        setErrorMessage(error);
      })
    } 
  }

  // Removing the success message
  setTimeout(() => {
    if (successMessage.visible) {
      setSuccessMessage({ visible: false, message: '' })
    } else if (successMessageTwo.visible) {
      setSuccessMessageTwo({ visible: false, message: '' })
    } 
  },10000);


  // Function to save hospital application
  const submitGuardian = (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type":"multipart/form-data" }
    }
    
    if (guardian.institutionName ===''){
      setGuardianError({...guardianError, institutionName: 'Institution name is required'})
      return;
    } else if (guardian.institutionType===''){
      setGuardianError({...guardianError, institutionType: 'Institution type is required'})
      return;
    } else if (guardian.numberOfPersonnel===''){
      setGuardianError({...guardianError, numberOfPersonnel: 'The number Personnel is required'})
      return;
    } else if (locations.province===''){
      setLocationErrors({...locationErrors, province: 'Province is required'})
      return;
    } else if (locations.district===''){
      setLocationErrors({...locationErrors, district: 'District is required'})
      return;
    } else if (locations.sector===''){
      setLocationErrors({...locationErrors, sector: 'You must choose location'})
      return;
    } else {

      guardian.patientId = patient
      guardian.institutionId = "Default"
      guardian.sendDate = new Date().toDateString()
      guardian.status = "Pending"
      guardian.location = locations.province+", "+locations.district+", "+locations.sector

      setGuardianError({ institutionType: "", institutionName: "", numberOfPersonnel: ""});
      setErrorMessageTwo('');

      axios.post(`http://localhost:5050/api/mfss/applicationForInstitution/add`, guardian, config)
      .then(response => {
        if (response.status === 201) {
          setSavingProgressTwo('Saving in progress ...');
          
          setTimeout(()=>{
            setSavingProgressTwo('');
            setSuccessMessageTwo({ message: response.data.message, visible: true });
            setOpen({formOne: false, formTwo: false});
          }, 5000);

        }
      })
      .catch(error => setErrorMessage(error))
    }

  }
  return (
    <MainContainer style={{backgroundColor: '#006622' }}>
      <VerticallyFlexedContainer style={{backgroundColor: '#006622' }}>
        <SectionHeader style={{color: 'white' }}>CREATE AN ACCOUNT</SectionHeader>
        <MultiStepForm style={{marginTop: '0px'}}>
          <FormContainer onSubmit={submitUserInfo}>
            <FormSectionTitle>
              <FormHead>Patient's information</FormHead>
              {savingProgress && <p>{savingProgress}</p>}
              {errorMessage && <ResponseMessages type='error' message={errorMessage}/>}
              {successMessage.visible && <ResponseMessages type='success' message={successMessage.message}/>}
            </FormSectionTitle>
            <hr/>
            {open.formOne && <FormBody>
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
                  <option value=''>Male</option>
                  <option value=''>Female</option>
                  <option value=''>Other</option>
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
              <FormInput>
                <label htmlFor="placeOfBirth">Place of Birth</label>
                <input type="text" name="placeOfBirth" id="placeOfBirth" value={personalInfo.placeOfBirth} onChange={handlePersonalInfo} placeholder='Place of birth'/>
                {personalInfoError.placeOfBirth && <p>{personalInfoError.placeOfBirth}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" name="dateOfBirth" id="dateOfBirth" value={personalInfo.dateOfBirth} onChange={handlePersonalInfo} />
                {personalInfoError.dateOfBirth && <p>{personalInfoError.dateOfBirth}</p>}
              </FormInput>
            </FormBody>}
            <FormSectionTitle>
              <FormHead>Information about guardians</FormHead>
              {savingProgressTwo && <p>{savingProgressTwo}</p>}
              {errorMessageTwo && <ResponseMessages type='error' message={errorMessageTwo}/>}
            </FormSectionTitle>
            <hr/>
            {open.formTwo && <FormBody>
              <FormInput>
                <label htmlFor="institutionName">Institution Name</label>
                <input type="text" name="institutionName" id="institutionName" value={guardian.institutionName} onChange={handleGuardianInfo} placeholder='Institution Name'/>
                {guardianError.institutionName && <p>{guardianError.institutionName}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="institutionType">Institution Type</label>
                <select name="institutionType" id="institutionType" onChange={handleGuardianInfo}>
                  <option value=''>Choose Institution</option>
                  <option value='hospital'>Hospital</option>
                  <option value='pharmacy'>Pharmacy</option>
                </select>
                {guardianError.institutionType && <p>{guardianError.institutionType}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="numberOfPersonnel">Number of Personnel</label>
                <input type="text" name="numberOfPersonnel" id="numberOfPersonnel" value={guardian.numberOfPersonnel} onChange={handleGuardianInfo} placeholder='Number of Personnel'/>
                {guardianError.numberOfPersonnel && <p>{guardianError.numberOfPersonnel}</p>}
              </FormInput>
              <FormControlButtonsTwo>
                <button type='submit'>SAVE</button>
              </FormControlButtonsTwo>
            </FormBody>}
            {successMessageTwo.visible && <ResponseMessages type='success' message={successMessageTwo.message}/>}
          </FormContainer>
        </MultiStepForm>
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

export default PatientSignup