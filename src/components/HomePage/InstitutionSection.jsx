import React, { useState } from 'react'
import { Description, FormBody, FormContainer, FormHead, FormInput, FormItems, FormSectionTitle, MultiStepForm } from './InstitutionsComponents'
import { MainContainer } from './Navigation'
import { SectionHeader, VerticallyFlexedContainer } from './Sponsors'

const InstitutionSection = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    userCode: "",
    email: "",
    password: "",
    phone: "",
    role: "Representative",
    isActive: "false",
    applicationDate: new Date().toDateString(),
    joinDate: "",
    institutionId: "",
    institutionName: "",
  });

  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    userCode: "",
    email: "",
    password: "",
    phone: "",
    role: "Representative",
    isActive: "false",
    joinDate: "",
    institutionId: "",
    institutionName: "",
  });

  const [institutionApplication, setInstitutionApplication] = useState({
    directorId: "",
    institutionType: "",
    institutionId: "",
    institutionName: "",
    sendDate: "",
    status: "",
    respondDate: "",
    applicationBody: "",
    systemAdminId: "",
  })

  const [institutionApplicationError, setInstitutionApplicationError] = useState({
    directorId: "",
    institutionId: "",
    institutionName: "",
    sendDate: "",
    status: "",
    respondDate: "",
    applicationBody: "",
    systemAdminId: "",
  })

  const handlePersonalInfo = () => {

  }

  const handleInstitutionApplicationInfo = () => {

  }

  const submitPersonalInfo = (e) => {
    e.preventDefault();
  }

  const submitInstitutionApplication = (e) => {
    e.preventDefault();
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
          <FormContainer>
            <FormHead>Information about institution representative</FormHead>
            <FormBody>
              <FormSectionTitle>Personal Info</FormSectionTitle>
              <FormItems>
                <FormInput>
                  <label htmlFor="firstName">First name</label>
                  <input type="text" name="firstName" id="firstName" value={personalInfo.firstName} placeholder='First Name'/>
                  {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                </FormInput>
                <FormInput>
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" name="lastName" id="lastName" value={personalInfo.lastName} placeholder='First Name'/>
                  {personalInfoError.lastName && <p>{personalInfoError.lastName}</p>}
                </FormInput>
                <FormInput>
                  <label htmlFor="firstName">Email</label>
                  <input type="text" name="firstName" id="firstName" value={personalInfo.firstName} placeholder='First Name'/>
                  {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                </FormInput>
                <FormInput>
                  <label htmlFor="lastName">Phone</label>
                  <input type="text" name="lastName" id="lastName" value={personalInfo.lastName} placeholder='First Name'/>
                  {personalInfoError.lastName && <p>{personalInfoError.lastName}</p>}
                </FormInput>
                <FormInput>
                  <label htmlFor="lastName">Institution Name</label>
                  <input type="text" name="lastName" id="lastName" value={personalInfo.lastName} placeholder='First Name'/>
                  {personalInfoError.lastName && <p>{personalInfoError.lastName}</p>}
                </FormInput>
                <FormInput>
                  <label htmlFor="firstName">Institution Type</label>
                  <input type="text" name="firstName" id="firstName" value={personalInfo.firstName} placeholder='First Name'/>
                  {personalInfoError.firstName && <p>{personalInfoError.firstName}</p>}
                </FormInput>
              </FormItems>
            </FormBody>
          </FormContainer>
          <FormContainer>
            <FormHead>Information about the institution</FormHead>
            <FormBody>
              <FormSectionTitle>Personal Info</FormSectionTitle>
              <FormItems>
                
              </FormItems>
            </FormBody>
          </FormContainer>
        </MultiStepForm>
      </VerticallyFlexedContainer>
    </MainContainer>
  )
}

export default InstitutionSection