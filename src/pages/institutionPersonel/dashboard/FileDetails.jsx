import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { AddResultInput, FileDetailsButton, FileDetailsFooter, FileHeader, FormTable, UpdateButton } from '../../../components/Dashboard/NewFileComponents';
import jspdf from 'jspdf';
import { useParams } from 'react-router-dom';

const FileDetails = ({file}) => {
    const params = useParams();

    const [fileData, setFileData] = useState([]);
    const [labTechnitian, setLabTechnitian] = useState({});
    const [doctor, setDoctor] = useState({});
    const [updateMode, setUpdateMode] = useState(false);
    const [updates, setUpdates] = useState({})
    const [medicalPersonnel, setMedicalPersonnel] = useState({});

    // Fetch Medical Personnel information 
    useEffect(()=> {
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

    const printFile = () => {
        var doc = new jspdf("p", "pt", "a4");
        doc.html(document.querySelector("#file"), {
          callback: function (pdf) {
            pdf.save(`${new Date()}.pdf`);
          }
        });
    }

    return (
        <>
            <div id='file' style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '100%' }}>
                <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                        <h3 style={{ textAlign: 'left' }}>{file.hospitalName}</h3>
                        <p style={{ textAlign: 'left',  }}>{file.hospitalLocation}</p>
                    </div>
                    <img src={`http://localhost:5050/api/mfss/uploads/${file.hospitalLogo}`} alt='' style={{ height: '100px', width: '100px', backgroundSize: 'cover' }} />
                </div>

                {file.type=== 'laboratory tests' && <FileHeader>Laboratory Tests</FileHeader>} 
                {file.type=== 'medical prescritions' && <FileHeader>Medical Prescriptions</FileHeader>}
                {file.type=== 'patient transfer' && <FileHeader>Patient Transfer</FileHeader>}
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
            <FileDetailsFooter>
                {medicalPersonnel.role === 'lab technician'
                    ?
                    <>
                        <UpdateButton onClick={()=> setUpdateMode(false)}>Cancel file update</UpdateButton>
                        <UpdateButton onClick={changeToUpdateMode}>Update file</UpdateButton>
                    </>
                    :
                    <>
                        <UpdateButton onClick={printFile}><FiPrinter /></UpdateButton>
                    </>
                }
            </FileDetailsFooter>
        </>
    )
}

export default FileDetails