import React, { useState } from 'react';
import axios from 'axios';
import ResponseMessages from '../OtherComponents/ResponseMessages';
import { MainContainer } from './Navigation'
import { SectionHeader, VerticallyFlexedContainer } from './Sponsors';
import { fetchProvinces, fetchDistricts,fetchSectors } from '../../assets/locationHandler';
import { Description, FormBody, FormContainer, FormControlButtonsTwo, FormHead, FormInput, FormSectionTitle, MultiStepForm } from './InstitutionsComponents'

const InstitutionSection = () => {
  
  // States
  const [institutionApplication, setInstitutionApplication] = useState({ directorId: "", institutionType: "", institutionId: "", institutionName: "", sendDate: "", status: "Pending", applicationDate: new Date().toDateString(), applicationBody: "", systemAdminId: "", location: "", numberOfPersonnel: "" });
  const [institutionApplicationError, setInstitutionApplicationError] = useState({ institutionType: "", institutionName: "", numberOfPersonnel: ""})
  
  const [personalInfo, setPersonalInfo] = useState({ firstName: "", lastName: "", userCode: "000000", email: "", password: "", phone: "", role: "Representative", isActive: "false", applicationDate: new Date().toDateString(), joinDate: "", institutionId: "Pending", institutionName: "Pending", });
  const [personalInfoError, setPersonalInfoError] = useState({firstName: "", lastName: "", email: "", phone: ""});
  
  const [certificate, setCertificate] = useState('');
  const [certificateError, setCertificateError] = useState('');
  
  const [director, setDirector] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState({visible: false, message: ''});
  const [errorMessageTwo, setErrorMessageTwo] = useState('');
  const [successMessageTwo, setSuccessMessageTwo] = useState({visible: false, message: ''});
  
  const [open, setOpen] = useState({formOne: true, formTwo: false});
  
  const [savingProgress, setSavingProgress] = useState('');
  const [savingProgressTwo, setSavingProgressTwo] = useState('');

  const [locations, setLocations] = useState({province: 'Kigali',district: 'Gasabo',sector: ''})
  const [locationErrors, setLocationErrors] = useState({province: '',district: '',sector: '',})
  const [demoDistricts, setDemoDistricts] = useState([]);
  const [demoSectors, setDemoSectors] = useState([]);


  // Input handlers

  const handleCertificateUpload = (e) => {
    const {files} = e.target;
    setCertificate(files[0]);
  }

  const handleLocation = ({currentTarget: input })=>{
    setLocations({...locations, [input.name]: input.value});
  };  

  const handlePersonalInfo = ({currentTarget: input })=>{
    setPersonalInfo({...personalInfo, [input.name]: input.value});
  };  

  const handleInstitutionApplicationInfo = ({currentTarget: input })=>{
    setInstitutionApplication({...institutionApplication, [input.name]: input.value});
  };  


  // Save applicant
  const submitPersonalInfo = (e) => {
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
              setDirector(response.data[0]._id)
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
  const submitInstitutionApplication = (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type":"multipart/form-data" }
    }
    
    if (institutionApplication.institutionName ===''){
      setInstitutionApplicationError({...institutionApplicationError, institutionName: 'Institution name is required'})
      return;
    } else if (institutionApplication.institutionType===''){
      setInstitutionApplicationError({...institutionApplicationError, institutionType: 'Institution type is required'})
      return;
    } else if (institutionApplication.numberOfPersonnel===''){
      setInstitutionApplicationError({...institutionApplicationError, numberOfPersonnel: 'The number Personnel is required'})
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
    } else if (certificate===''){
      setCertificateError('Certificate attachment is required')
      return;
    } else {

      institutionApplication.directorId = director
      institutionApplication.institutionId = "Default"
      institutionApplication.sendDate = new Date().toDateString()
      institutionApplication.status = "Pending"
      institutionApplication.location = locations.province+", "+locations.district+", "+locations.sector
      institutionApplication.certificate = certificate

      setInstitutionApplicationError({ institutionType: "", institutionName: "", numberOfPersonnel: ""});
      setCertificateError('');
      setErrorMessageTwo('');

      axios.post(`http://localhost:5050/api/mfss/applicationForInstitution/add`, institutionApplication, config)
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
    <MainContainer>
      <VerticallyFlexedContainer style={{backgroundColor: '#006622' }}>
        <SectionHeader style={{color: 'white' }}>REGISTER INSTITUTION</SectionHeader>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, earum alias at ratione suscipit consectetur laborum quidem deleniti minima fuga eos ex! Sequi, non porro laboriosam libero aliquam tempore cumque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda cumque ratione itaque provident atque nobis dolore molestias doloremque eveniet ducimus! Aspernatur, repudiandae animi eos excepturi et commodi ullam temporibus quisquam?
        </Description> 
        <MultiStepForm>
          <FormContainer onSubmit={submitPersonalInfo}>
            <FormSectionTitle>
              <FormHead>Information about institution representative</FormHead>
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
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={personalInfo.email} onChange={handlePersonalInfo} placeholder='Email'/>
                {personalInfoError.email && <p>{personalInfoError.email}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" value={personalInfo.phone} onChange={handlePersonalInfo} placeholder='Phone'/>
                {personalInfoError.phone && <p>{personalInfoError.phone}</p>}
              </FormInput>
              <FormControlButtonsTwo>
                <button type='submit'>SAVE</button>
              </FormControlButtonsTwo>
            </FormBody>}
          </FormContainer>
          <FormContainer onSubmit={submitInstitutionApplication}>
            <FormSectionTitle>
              <FormHead>Information about the institution</FormHead>
              {savingProgressTwo && <p>{savingProgressTwo}</p>}
              {errorMessageTwo && <ResponseMessages type='error' message={errorMessageTwo}/>}
            </FormSectionTitle>
            <hr/>
            {open.formTwo && <FormBody>
              <FormInput>
                <label htmlFor="institutionName">Institution Name</label>
                <input type="text" name="institutionName" id="institutionName" value={institutionApplication.institutionName} onChange={handleInstitutionApplicationInfo} placeholder='Institution Name'/>
                {institutionApplicationError.institutionName && <p>{institutionApplicationError.institutionName}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="institutionType">Institution Type</label>
                <select name="institutionType" id="institutionType" onChange={handleInstitutionApplicationInfo}>
                  <option value=''>Choose Institution</option>
                  <option value='hospital'>Hospital</option>
                  <option value='pharmacy'>Pharmacy</option>
                </select>
                {institutionApplicationError.institutionType && <p>{institutionApplicationError.institutionType}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="numberOfPersonnel">Number of Personnel</label>
                <input type="text" name="numberOfPersonnel" id="numberOfPersonnel" value={institutionApplication.numberOfPersonnel} onChange={handleInstitutionApplicationInfo} placeholder='Number of Personnel'/>
                {institutionApplicationError.numberOfPersonnel && <p>{institutionApplicationError.numberOfPersonnel}</p>}
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
                <label htmlFor="certificate">Certificate (PDF)</label>
                <input type="file" name="certificate" accept=".pdf" id="certificate" onChange={handleCertificateUpload}/>
                {certificateError && <p>{certificateError}</p>}
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

export default InstitutionSection