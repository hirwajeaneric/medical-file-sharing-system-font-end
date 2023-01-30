import React from 'react';
import { FileFormContainer, FileInputs, FormTable } from './NewFileComponents';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';

const TestsForm = ({dataRows, inputData, setInputData}) => {
    // Functions
    const addColumn = (e) => {
        e.preventDefault();
        if ( inputData.requiredTest && inputData.results ){
            dataRows.push(inputData);
            setInputData({ number: dataRows.length+1, requiredTest: '', results: '' });
        }   
    }

    const deleteRow = (rowNumber) => {
        console.log("Selected:", rowNumber);
        var newArray = [];
        if (dataRows.length>0) {
            dataRows.forEach(element=>{
                if (element.number !== rowNumber) {
                    newArray.push(element);
                }
            })
            setInputData(newArray);
            console.log("Th array now:", newArray);    
        }
    }

    const handleFormInput = ({currentTarget: input}) => {
        setInputData({...inputData, [input.name]: input.value})
    }

    return (
        <FileFormContainer>
            <FormTable>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Required Exams</th>
                        <th>Results</th>
                        <th style={{ width: '50px'}}>Commands</th>
                    </tr>
                </thead>
                <tbody>
                    {dataRows.map((row, index)=> (
                        <tr key={index}>
                            <td>{row.number}</td>
                            <td>{row.requiredTest}</td>
                            <td>{row.results}</td>
                            <td style={{ width: '50px'}}>
                                <button onClick={(e) => {e.preventDefault(); deleteRow(row.number)}}><RiDeleteBin5Line /></button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{paddingLeft: '10px'}}>{inputData.number}</td>
                        <td>
                            <FileInputs type="text" name="requiredTest" value={inputData.requiredTest} onChange={handleFormInput} placeholder='Add exam'/>
                        </td>
                        <td>
                            <FileInputs type="text" name="results" value={inputData.results} onChange={handleFormInput} placeholder='Add results'/>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
                            <button onClick={addColumn}><AiOutlinePlus />&nbsp;Add Column</button>
                        </td>
                    </tr>
                </tfoot>
            </FormTable>
        </FileFormContainer>
    )
}

export default TestsForm