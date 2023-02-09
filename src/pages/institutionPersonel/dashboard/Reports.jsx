import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Container, PageBody, PageHeaderContainer, PageTitle } from '../../../components/Dashboard/DashboardHome'
import { CustomPeriodContainer, ReportForm } from '../../../components/Dashboard/ReportsComponents'
import { FormInput } from '../../../components/HomePage/InstitutionsComponents'

const formInputStyles = { width: '30%',}
const selectElementStyles = { width: '100%'}

export default function Reports () {
  // States
  const [reportChoice, setReportChoice ] = useState({ patient: '', personnel: '', records: '' });
  const [duration, setDuration] = useState({ from: '', to: '' });

  // Functions

  const resetStates = () => {
    setReportChoice({ patient: '', personnel: '', });
    setDuration({ from: '', to: '' });
  }

  const generateReport = (e) => {
    e.preventDefault();

    if (reportChoice.patient) {
      if (duration) {
        // Generate report logic
      } else {
        if (reportChoice.patient === 'daily') {

        } else if (reportChoice.patient === 'weekly') {

        } else if (reportChoice.patient === 'monthly') {

        } else if (reportChoice.patient === 'yearly') {

        }
      }
    } else if (reportChoice.personnel) {
      if (duration) {
        // Generate report logic
      } else {
        if (reportChoice.patient === 'daily') {

        } else if (reportChoice.patient === 'weekly') {

        } else if (reportChoice.patient === 'monthly') {

        } else if (reportChoice.patient === 'yearly') {

        }
      }
    } else if (reportChoice.records) {
      if (duration) {
        // Generate report logic
      } else {
        if (reportChoice.patient === 'daily') {

        } else if (reportChoice.patient === 'weekly') {

        } else if (reportChoice.patient === 'monthly') {

        } else if (reportChoice.patient === 'yearly') {

        }
      }
    } else {
      return;
    } 

    // Testing
    console.log(reportChoice);
    console.log(duration);
    resetStates();

    // Final logic
    

  }

  const updateChoices = ({currentTarget: input}) => { setReportChoice({[input.name] : input.value}) };

  return (
    <Container>
      <PageHeaderContainer>
          <PageTitle>Reports</PageTitle>
          {/* <Button variant='contained' color='secondary' size='small' onClick={()=> navigate(`/${params.institution}/dashboard/patients`)}>Back</Button> */}
      </PageHeaderContainer>
      
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      
      {/* Report choice  */}
      <PageBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', width: '100%'}}>
        <ReportForm onSubmit={generateReport}>
            
            <FormInput style={formInputStyles}>
              <label htmlFor="patient"><strong>Patient</strong></label>
              <select style={selectElementStyles} name="patient" id="patient" onChange={updateChoices}>
                <option value={''}>Choose Period ...</option>
                <option value={'daily'}>Daily</option>
                <option value={'weekly'}>Weekly</option>
                <option value={'monthly'}>Monthly</option>
                <option value={'yearly'}>Yearly</option>
                <option value={'custom'}>Custom</option>
              </select>
              {reportChoice.patient === 'custom' && <CustomPeriodForm duration={duration} setDuration={setDuration} />}
              {reportChoice.patient && <Button variant='contained' color='info' size='small' onClick={generateReport}>Generate Report</Button>}
            </FormInput>
            
            <FormInput style={formInputStyles}>
              <label htmlFor="personnel"><strong>Personnel</strong></label>
              <select style={selectElementStyles} name="personnel" id="personnel"  onChange={updateChoices}>
                <option value={''}>Choose Period ...</option>
                <option value={'daily'}>Daily</option>
                <option value={'weekly'}>Weekly</option>
                <option value={'monthly'}>Monthly</option>
                <option value={'yearly'}>Yearly</option>
                <option value={'custom'}>Custom</option>
              </select>
              {reportChoice.personnel === 'custom' &&  <CustomPeriodForm duration={duration} setDuration={setDuration}/> }
              {reportChoice.personnel && <Button variant='contained' color='info' size='small' onClick={generateReport}>Generate Report</Button>}
            </FormInput>

            <FormInput style={formInputStyles}>
              <label htmlFor="records"><strong>Records and Files</strong></label>
              <select style={selectElementStyles} name="records" id="records"  onChange={updateChoices}>
                <option value={''}>Choose Period ...</option>
                <option value={'daily'}>Daily</option>
                <option value={'weekly'}>Weekly</option>
                <option value={'monthly'}>Monthly</option>
                <option value={'yearly'}>Yearly</option>
                <option value={'custom'}>Custom</option>
              </select>
              {reportChoice.records === 'custom' && <CustomPeriodForm duration={duration} setDuration={setDuration}/>}
              {reportChoice.records && <Button variant='contained' color='info' size='small' onClick={generateReport}>Generate Report</Button>}
            </FormInput>

        </ReportForm>
      </PageBody>

      {/* Report preview space  */}
      <PageBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', width: '100%'}}>
      
      </PageBody>
    </Container>
  )
}


// Custom Period Form

const CustomPeriodForm = ({duration, setDuration}) => {
  const updateDuration = ({currentTarget: input}) => { setDuration({...duration, [input.name] : input.value}) }
  return (
    <CustomPeriodContainer>
      <FormInput>
        <label htmlFor="from">From</label>
        <input type="date" name="from" value={duration.from} onChange={updateDuration} id="from" />
      </FormInput>
      <FormInput>
        <label htmlFor="to">To</label>
        <input type="date" name="to" value={duration.to} onChange={updateDuration} id="to" />
      </FormInput>
    </CustomPeriodContainer>
  )
}