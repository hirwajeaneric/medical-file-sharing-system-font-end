import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { LeftHalf, RightHalf, TwoSidedParagraphContainer } from './PatientDetailsComponents';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const headerTwoStyles = { marginBottom: '20px', }

const UserAccountData = () => {
    const params = useParams();

    const [userInformation, setUserInformation] = useState({ id:"", firstName: "", lastName: "", userCode: "", email: "", password: "", phone: "", role: "", isActive: "", joinDate: "", applicationDate: "", institutionId: "", institutionName: "", institutionCode: "" });

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

        axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findById?id=${personnel.id}`)
        .then(response => { setUserInformation(response.data) })
        .catch(error => console.log(error));

    },[params, userInformation])

    return (
        <TwoSidedParagraphContainer style={{ width: '100%'}}>
            <LeftHalf>
                <h2 style={headerTwoStyles}>Account for user: {userInformation.userCode}</h2>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <p>Role:</p>
                    </LeftHalf>
                    <RightHalf>
                        <strong>{userInformation.role}</strong>
                    </RightHalf>
                </TwoSidedParagraphContainer>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <p>Account Status:</p>
                    </LeftHalf>
                    <RightHalf>
                        <strong>{userInformation.isActive}</strong>
                    </RightHalf>
                </TwoSidedParagraphContainer>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <p>Join Date:</p>
                    </LeftHalf>
                    <RightHalf>
                        <strong>{userInformation.joinDate}</strong>
                    </RightHalf>
                </TwoSidedParagraphContainer>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <p>Hospital name:</p>
                    </LeftHalf>
                    <RightHalf>
                        <strong>{userInformation.institutionName}</strong>
                    </RightHalf>
                </TwoSidedParagraphContainer>
            </LeftHalf>
            <RightHalf>
                <h3 style={headerTwoStyles}>Edit</h3>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <label htmlFor="firstName">First name:</label>
                    </LeftHalf>
                    <RightHalf>
                        <input type={'text'} name='firstName' value={userInformation.firstName} />
                    </RightHalf>
                </TwoSidedParagraphContainer>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <label htmlFor="lastName">Last name:</label>
                    </LeftHalf>
                    <RightHalf>
                    <input type={'text'} name='firstName' value={userInformation.lastName} />
                    </RightHalf>
                </TwoSidedParagraphContainer>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <label htmlFor="email">Email:</label>
                    </LeftHalf>
                    <RightHalf>
                        <strong>{userInformation.email}</strong>
                    </RightHalf>
                </TwoSidedParagraphContainer>
                <TwoSidedParagraphContainer style={{fontSize: '100%'}}>
                    <LeftHalf>
                        <label htmlFor="firstName">Phone:</label>
                    </LeftHalf>
                    <RightHalf>
                        <strong>{userInformation.phone}</strong>
                    </RightHalf>
                </TwoSidedParagraphContainer>
            </RightHalf>
        </TwoSidedParagraphContainer>
    )
}

export default UserAccountData