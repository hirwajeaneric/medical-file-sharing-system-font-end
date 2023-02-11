import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AddResultInput, FileDetailsButton, FileDetailsFooter, FormTable, UpdateButton } from '../../../components/Dashboard/NewFileComponents';

const FileDetails = ({file}) => {
    const [fileData, setFileData] = useState([]);
    const [labTechnitian, setLabTechnitian] = useState({});
    const [doctor, setDoctor] = useState({});
    const [updateMode, setUpdateMode] = useState(false);
    const [updates, setUpdates] = useState({})
    
    // Converting file data to redable text
    useEffect(()=>{
        if (file.prescriptions) {
            setFileData(JSON.parse(file.prescriptions))
        } else if (file.exams) {
            setFileData(JSON.parse(file.exams))
        }
    },[file]);

    // Fetch information about the personnel responsible of a document
    useEffect(() => {
        if (file.type === 'laboratory tests') {
            // Fetch lab technician
            axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findById?id=${file.labTechId}`)
            .then(response => {
                setLabTechnitian(response.data)
            })
            .catch(error => console.log("Server error :: "+error))

            // Fetch doctor
            axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findById?id=${file.doctorId}`)
            .then(response => {
                setDoctor(response.data)
            })
            .catch(error => console.log("Server error :: "+error))
        } else {
            // Fetch doctor
            axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findById?id=${file.doctorId}`)
            .then(response => {
                setDoctor(response.data)
            })
            .catch(error => console.log("Server error :: "+error))
        }
    },[file])

    const handleInputData = ({currentTarget: input}) => {
        setUpdates({...updates, [input.name]: input.value})
    }

    const changeToUpdateMode = () => {
        setUpdateMode(true);
    }
    
    const handleUpdate = (e) => {
        e.preventDefault();

        

    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '100%' }}>
                <h3 style={{ textAlign: 'left' }}>{file.hospitalName}</h3>
                <p style={{ textAlign: 'left',  }}>{file.hospitalLocation}</p>
                <h1 style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'roboto', margin: '30px 0 10px', textTransform: 'uppercase' }}>{file.type}</h1>
                <p>Name of patient: <em>{file.patientName}</em><br/>
                    Sex:&nbsp;<em>{file.patientGender}</em>&nbsp;&nbsp;Age: <em>{file.patientAge}</em>
                </p>
                <form>
                {file.type === 'laboratory tests' ? 
                    // Lab tests form
                    <FormTable style={{ margin: '20px 0'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Required Exams</th>
                                <th>Results</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((row, index)=> (
                                <tr key={index}>
                                    <td>{row.number}</td>
                                    <td>{row.requiredTest}</td>
                                    <td>{updateMode 
                                        ? <AddResultInput type="text" name={row.requiredTest} onChange={handleInputData} placeholder='Add results' value={updates} /> 
                                        : (row.results)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {updateMode && <tfoot>
                            <FileDetailsButton variant='contained' color='success' size='small' onClick={handleUpdate}>Save updates</FileDetailsButton>
                        </tfoot>}
                    </FormTable> : 
                    // Prescription form
                    <FormTable style={{ margin: '20px 0'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Prescription</th>
                                <th>Type</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((row, index)=> (
                                <tr key={index}>
                                    <td>{row.number}</td>
                                    <td>{row.prescriptionName}</td>
                                    <td>{row.type}</td>
                                    <td>{row.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </FormTable>}

                </form>
                <p>Date: &nbsp;&nbsp;<em>{file.creationDate}</em></p> 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
                    {file.type === 'laboratory tests' &&
                        <>
                            <p>Asking Doctor: &nbsp;&nbsp;<em>{file.doctorId && (doctor.firstName+" "+doctor.lastName)}</em></p>
                            <p>Lab Technician: &nbsp;&nbsp;<em>{file.labTechId ? (labTechnitian.firstName+" "+labTechnitian.lastName) : <>&nbsp;&nbsp;&nbsp;-</>}</em></p>
                        </>
                    }
                    {file.type === 'medical prescritions' && 
                        <>
                            <p>Doctor: &nbsp;&nbsp;<em>{file.doctorId && (doctor.firstName+" "+doctor.lastName)}</em></p>
                            <p></p>    
                        </>
                    }
                </div>  
            </div>
            {JSON.parse(localStorage.getItem('instPe')).role !== 'doctor' && 
                <FileDetailsFooter>
                    <UpdateButton onClick={()=> setUpdateMode(false)}>Cancel file update</UpdateButton>
                    <UpdateButton onClick={changeToUpdateMode}>Update file</UpdateButton>
                </FileDetailsFooter>
            }
        </>
    )
}

export default FileDetails