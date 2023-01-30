import React from 'react';
import { FileFormContainer, FileInputs, FormTable } from './NewFileComponents';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';

const PrescriptionForm = ({prescriptionDataRows, inputPrescriptionData, setInputPrescriptionData}) => {
    // Functions
    const addColumn = (e) => {
        e.preventDefault();
        if ( inputPrescriptionData.prescriptionName ){
            prescriptionDataRows.push(inputPrescriptionData);
            setInputPrescriptionData({ number: prescriptionDataRows.length+1, prescriptionName: '', type:'', quantity: '' });
        }   
    }

    const deleteRow = (rowNumber) => {
        console.log("Selected:", rowNumber);
        var newArray = [];
        if (prescriptionDataRows.length>0) {
            prescriptionDataRows.forEach(element=>{
                if (element.number !== rowNumber) {
                    newArray.push(element);
                }
            })
            setInputPrescriptionData(newArray);
            console.log("The array now:", newArray);    
        }
    }

    const handleFormInput = ({currentTarget: input}) => {
        setInputPrescriptionData({...inputPrescriptionData, [input.name]: input.value})
    }

    return (
        <FileFormContainer>
            <FormTable>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Prescription</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th style={{ width: '50px'}}>Commands</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptionDataRows.map((row, index)=> (
                        <tr key={index}>
                            <td>{row.number}</td>
                            <td>{row.prescriptionName}</td>
                            <td>{row.type}</td>
                            <td>{row.quantity}</td>
                            <td style={{ width: '50px'}}>
                                <button onClick={(e) => {e.preventDefault(); deleteRow(row.number)}}><RiDeleteBin5Line /></button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{paddingLeft: '10px'}}>{inputPrescriptionData.number}</td>
                        <td>
                            <FileInputs type="text" name="prescriptionName" value={inputPrescriptionData.prescriptionName} onChange={handleFormInput} placeholder='Add prescrition'/>
                        </td>
                        <td>
                            <FileInputs type="text" name="type" value={inputPrescriptionData.type} onChange={handleFormInput} placeholder='Add type'/>
                        </td>
                        <td>
                            <FileInputs type="text" name="quantity" value={inputPrescriptionData.quantity} onChange={handleFormInput} placeholder='Add quantity'/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            <button onClick={addColumn}><AiOutlinePlus />&nbsp;Add Column</button>
                        </td>
                    </tr>
                </tfoot>
            </FormTable>
        </FileFormContainer>
    )
}

export default PrescriptionForm