import React, { useState } from 'react'
import ResponseMessages from '../OtherComponents/ResponseMessages'
import { Description, FormBody, FormContainer, FormControlButtonsTwo, FormHead, FormInput, MultiStepForm } from './InstitutionsComponents'
import { MainContainer } from './Navigation'
import { SectionHeader, VerticallyFlexedContainer } from './Sponsors'

const InstitutionSection = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    userCode: "000000",
    email: "",
    password: "",
    phone: "",
    role: "Representative",
    isActive: "false",
    applicationDate: new Date().toDateString(),
    joinDate: "",
    institutionId: "Pending",
    institutionName: "Pending",
  });

  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: ""
  });

  const [institutionApplication, setInstitutionApplication] = useState({
    directorId: "",
    institutionType: "",
    institutionId: "",
    institutionName: "",
    sendDate: "",
    status: "Pending",
    applicationDate: new Date().toDateString(),
    applicationBody: "",
    systemAdminId: "",
    location: "",
    numberOfPersonnel: ""
  })

  const [institutionApplicationError, setInstitutionApplicationError] = useState({
    directorId: "",
    institutionId: "",
    institutionType: "",
    institutionName: "",
    sendDate: "",
    applicationBody: "",
    systemAdminId: "",
    location: "",
    numberOfPersonnel: ""
  })

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState({
    visible: true, 
    message: ''
  });
  
  const [certificate, setCertificate] = useState('');
  
  const [certificateError, setCertificateError] = useState('');

  const [locations, setLocations] = useState({
    province: '',
    district: '',
    sector: '',
  })

  const [locationErrors, setLocationErrors] = useState({
    province: '',
    district: '',
    sector: '',
  })

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

  const submitPersonalInfo = (e) => {
    e.preventDefault();
  }

  const submitInstitutionApplication = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }


  }

  return (
    <MainContainer>
      <VerticallyFlexedContainer style={{backgroundColor: '#006622' }}>
        {errorMessage && <ResponseMessages type='error' message={errorMessage}/>}
        {successMessage.visible && <ResponseMessages type='success' message={successMessage.message}/>}
        <SectionHeader style={{color: 'white' }}>REGISTER INSTITUTION</SectionHeader>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, earum alias at ratione suscipit consectetur laborum quidem deleniti minima fuga eos ex! Sequi, non porro laboriosam libero aliquam tempore cumque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda cumque ratione itaque provident atque nobis dolore molestias doloremque eveniet ducimus! Aspernatur, repudiandae animi eos excepturi et commodi ullam temporibus quisquam?
        </Description> 
        <MultiStepForm>
          <FormContainer onSubmit={submitPersonalInfo}>
            <FormHead>Information about institution representative</FormHead>
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
                <button type='submit'>Save</button>
              </FormControlButtonsTwo>
            </FormBody>
          </FormContainer>
          <FormContainer onSubmit={submitInstitutionApplication}>
            <FormHead>Information about the institution</FormHead>
            <FormBody>
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
                {institutionApplicationError.institutionType && <p>{institutionApplication.institutionType}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="numberOfPersonnel">Number of Personnel</label>
                <input type="text" name="numberOfPersonnel" id="numberOfPersonnel" value={institutionApplication.numberOfPersonnel} onChange={handleInstitutionApplicationInfo} placeholder='Number of Personnel'/>
                {institutionApplicationError.numberOfPersonnel && <p>{institutionApplicationError.numberOfPersonnel}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="province">Province</label>
                <select name="province" id="province" onChange={handleLocation}>
                  <option value=''>Choose province</option>
                  <option value="Kigali City">Kigali City</option>
                  <option value="northernProvice">Northern Province</option>
                  <option value="southernProvince">Southern Province</option>
                  <option value="easternProvince">Eastern Province</option>
                  <option value="WesternProvince">Western Province</option>
                </select>
                {locationErrors.province && <p>{locationErrors.province}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="district">District</label>
                <select name="district" id="district" onChange={handleLocation}>
                  <option value=''>Choose District</option>
                  <option value="Kigali City">Kigali City</option>
                  <option value="northernProvice">Northern Province</option>
                  <option value="southernProvince">Southern Province</option>
                  <option value="easternProvince">Eastern Province</option>
                  <option value="WesternProvince">Western Province</option>
                </select>
                {locationErrors.district && <p>{locationErrors.district}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="sector">Sector</label>
                <select name="sector" id="sector" onChange={handleLocation}>
                  <option value=''>Choose Sector</option>
                  <option value="Kigali City">Kigali City</option>
                  <option value="northernProvice">Northern Province</option>
                  <option value="southernProvince">Southern Province</option>
                  <option value="easternProvince">Eastern Province</option>
                  <option value="WesternProvince">Western Province</option>
                </select>
                {locationErrors.sector && <p>{locationErrors.sector}</p>}
              </FormInput>
              <FormInput>
                <label htmlFor="certificate">Certificate</label>
                <input type="file" name="certificate" id="certificate" value={certificate} onChange={handleCertificateUpload}/>
                {certificateError && <p>{certificateError}</p>}
              </FormInput>
              <FormControlButtonsTwo>
                <button type='submit'>Save</button>
              </FormControlButtonsTwo>
            </FormBody>
          </FormContainer>
        </MultiStepForm>
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

export default InstitutionSection