import moment from 'moment';
import axios from 'axios';
import FileDetails from './FileDetails';
import MuiAlert from '@mui/material/Alert';
import React, { useContext, useEffect, useState } from 'react';
import { FcFile, FcFolder } from 'react-icons/fc';
import { DashboardWrapper, DateRangePicker, Durations, RangePeriods } from '../../../components/Dashboard/AdminDashboards';
import { FilePopup, PageBody, PageHeaderContainer } from '../../../components/Dashboard/DashboardHome';
import { AFile, ARecord, LeftHalf, ListOfFiles, RecordDescriptionHeader, RecordsContainer, RightHalf, TwoSidedParagraphContainer } from '../../../components/Dashboard/PatientDetailsComponents';
import { Button, Modal, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { RecordDetailsContextSetter } from '../../../App';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ListOfRecords = () => {
    // Hooks
    const navigate = useNavigate();
    const params = useParams();
    const setRecordId = useContext(RecordDetailsContextSetter);
    const [filterValue, setFilterValue] = useState({ from: '', to:'' });
  
    // States
    const [patient, setPatient] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", residence: "", placeOfBirth: "", dateOfBirth: "", maritalStatus: "", gender: "", joinDate: "" });
    const [records, setRecords] = useState([]);
    const [files, setFiles] = useState([]);
    const [recordDetails, setRecordDetails] = useState({ firstName: "", lastName: "", patientId: "", email: "", hospitalName: "", hospitalId: "", recordOpener: "", recordCloser: "", openTime: "", closeTime: "", status: "", insuranceName: "", });
    const [medicalPersonnel, setMedicalPersonnel] = useState({});
    const [notification, setNotification] = useState({ severity: '', message: '' });
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({creationDate: "", recordId: "", patientId: "", patientName: "", patientGender: "", patientAge: "", doctorId: "", nurseId: "", labTechId: "", type: "", prescriptions: "", exams: "", hospitalName: "", hospitalId: "", hospitalLocation: "", fileAttachment: "" })

    // Popup states
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Fetch Records
    useEffect(()=>{
      // Bring filter information
      var filterData = JSON.parse(localStorage.getItem('filter'));

      // Fetch personnel information
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

      axios.get(`http://localhost:5050/api/mfss/record/list`)
      .then(response => { 
        let records = [];
        response.data.forEach((element)=>{
          if (element.hospitalId === personnel.institutionId
            && Date.parse(element.openTime) >= Date.parse(new Date(filterData.from)) 
            && Date.parse(element.openTime) <= Date.parse(new Date(filterData.to))) 
          {
            records.push(element);
          }
        })
        records.sort((a, b) => new Date(b.openTime) - new Date(a.openTime))
        setRecords(records); 
      })
      .catch(error => { console.log(error) })
    },[params.role])

    // Fetch files for this patients record
    useEffect(()=>{
      axios.get(`http://localhost:5050/api/mfss/file/findByRecordId?recordId=${recordDetails._id}`)
      .then(response => { setFiles(response.data); })
      .catch(error => { console.log(error) })
    },[recordDetails._id])

    // Fetch Medical Personnel information 
    // useEffect(()=> {
    //   let personnel = {};
    //   if (params.role === 'r') {
    //       personnel = JSON.parse(localStorage.getItem('instAdmPe'));
    //   } else if (params.role === 'd') {
    //       personnel = JSON.parse(localStorage.getItem('instDocPe'));
    //   } else if (params.role === 'n') {
    //       personnel = JSON.parse(localStorage.getItem('instNurPe'));
    //   } else if (params.role === 'l') {
    //       personnel = JSON.parse(localStorage.getItem('instLabPe'));
    //   } 
    //   setMedicalPersonnel(personnel);
    // },[params.role])

  // Open record
  const openRecord = (e) => {
      e.preventDefault();

      const recordToBeSaved = { firstName: patient.firstName, lastName: patient.lastName, patientId: patient._id, email: patient.email, hospitalName: medicalPersonnel.institutionName, hospitalId: medicalPersonnel.institutionId, recordOpener: medicalPersonnel.firstName+" "+medicalPersonnel.lastName, recordCloser: "", openTime: new Date(), closeTime: "", status: "open", insuranceName: "" };

      axios.post(`http://localhost:5050/api/mfss/record/new`, recordToBeSaved)
      .then(response => {
          if (response.status === 201) {
              setNotification({severity: 'success', message: response.data.message});
              setOpen(true);
              setTimeout(()=> { window.location.reload() },5000)
          }          
      })
      .catch(error => {
          if (error.response && error.response.status >= 400 && error.response.status <= 500){
              setNotification({ severity: 'error', message: error.response.data.message});
              setOpen(true);
          }
      })
  }

  // Close record
  const closeRecord = (e) => {
      e.preventDefault();
      
      if (files.length === 0) {
          setNotification({severity: 'error', message: "Can't close record, there are no files yet."});
          setOpen(true);
      } else {
          recordDetails.recordCloser = medicalPersonnel.firstName+" "+medicalPersonnel.lastName; 
          recordDetails.closeTime = new Date().toDateString();
          recordDetails.status = "closed";

          console.log("Record to be updated: ");
          console.log(recordDetails);

          axios.put(`http://localhost:5050/api/mfss/record/update?id=${recordDetails._id}`, recordDetails)
          .then(response => {
              if (response.status === 201) {
                  setNotification({severity: 'success', message: response.data.message});
                  setOpen(true);
              }          
          })
          .catch(error => {
              if (error.response && error.response.status >= 400 && error.response.status <= 500){
                  setNotification({ severity: 'error', message: error.response.data.message});
                  setOpen(true);
              }
          })
      }
  }

    // Changing the filter according to what is choosen.
    const changeFilter = (duration) => {
      let filter = {}
      if (duration === 1) {
        let currentTime = new Date().getTime();
        let midNight = new Date(currentTime + (1 * 24 * 60 * 60 * 1000))
        let updatedTime = new Date(currentTime - (1 * 24 * 60 * 60 * 1000));
        filter = { 
          from: updatedTime.toLocaleDateString(), 
          to: midNight.toLocaleDateString(), 
        }
      } else if (duration === 7) {
        let currentTime = new Date().getTime();
        let updatedTime = new Date(currentTime - (7 * 24 * 60 * 60 * 1000));
        filter = { 
          from: updatedTime.toLocaleDateString(), 
          to: new Date().toLocaleDateString(), 
        }
      } else if (duration === 30) {
        let currentTime = new Date().getTime();
        let updatedTime = new Date(currentTime - (30 * 24 * 60 * 60 * 1000));
        filter = { 
          from: updatedTime.toLocaleDateString(),
          to: new Date().toLocaleDateString(),  
        }
      } else if (duration === 365) {
        let currentTime = new Date();
        let updatedTime = currentTime.setFullYear(currentTime.getFullYear() - 1);
        filter = {  
          from: new Date(updatedTime).toLocaleDateString(),
          to: new Date().toLocaleDateString(), 
        }
      }
  
      localStorage.setItem("filter", JSON.stringify(filter));
      window.location.reload();
    }
  
    const handleDateChoice = ({currentTarget: input}) => { setFilterValue({...filterValue, [input.name]: input.value}) }
  
    const filter = () => {
      if (filterValue.from && filterValue.to) {
        localStorage.setItem("filter", JSON.stringify(filterValue));
        window.location.reload();
      } else {
        return;
      }
    }

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') { return; }
      setOpen(false)
  };

  return (
    <DashboardWrapper>
      {/* <Outlet /> */}
      <PageBody style={{ marginBottom: '40px' }}>
        <PageHeaderContainer style={{ marginBottom: '20px'}}>
            <Durations style={{ background: '#d1e0e0', padding: '5px', borderRadius: '4px'}}>
            <div>
              <button onClick={()=> {changeFilter(1)}} style={{ cursor: 'pointer' }}>All day</button>
            </div>
            <RangePeriods>
              <button onClick={()=> {changeFilter(7)}} style={{ borderRight: '1px solid gray', cursor: 'pointer' }}>7 Days</button>
              <button onClick={()=> {changeFilter(30)}} style={{ borderRight: '1px solid gray', cursor: 'pointer'}}>1 Month</button>
              <button onClick={()=> {changeFilter(365)}} style={{ cursor: 'pointer' }}>1 Year</button>
            </RangePeriods>
            <DateRangePicker>
            <input type="date" name="from" id="from" value={filterValue.from} onChange={handleDateChoice}/>
            &nbsp;&nbsp;-&nbsp;&nbsp;
            <input type="date" name="to" id="to" value={filterValue.to} onChange={handleDateChoice}/>
            <button onClick={filter} style={{ cursor: 'pointer' }}><BiSearchAlt /></button>
          </DateRangePicker>
          </Durations>
          {medicalPersonnel.role !== 'nurse' ? <></> :<Button variant='contained' size='small' onClick={openRecord}>Add record</Button>}
        </PageHeaderContainer>
        <RecordsContainer>
            <LeftHalf style={{ flexDirection: 'row' , gap: '10px', flexWrap: 'wrap', width: '51%' }}>
                {records && records.map((record, index)=>(
                    <ARecord key={index} onClick={() => setRecordDetails(record)}>
                        <FcFolder/>
                        <p>{moment(`${record.openTime}`).format("MMM Do YYYY")}<br/>{moment(`${record.openTime}`).format("h:mm:ss a")}</p>
                    </ARecord>
                ))}
                {records.length < 1 && <p>No records available</p>} 
            </LeftHalf>                    
            <RightHalf style={{ background: '#e0ebeb', borderRadius: '5px' }}>
                {recordDetails.openTime && 
                    <RecordDescriptionHeader>
                        <LeftHalf>
                            <p>Patient: <strong>{recordDetails.firstName+" "+recordDetails.lastName}</strong></p>
                            <p>Open date: <strong>{moment(recordDetails.openTime).format("MMM Do YYYY")+" - "+moment(recordDetails.openTime).format("h:mm:ss a") }</strong></p>
                            <p>By: <strong>{recordDetails.recordOpener}</strong></p>
                            <p>Created at: <strong>{recordDetails.hospitalName}</strong></p>
                        </LeftHalf>
                        <RightHalf>
                            <p>Status: <strong>open</strong></p>
                            {recordDetails.closeTime && <p>Close date: <strong>{moment(recordDetails.closeTime).format("MMM Do YYYY")+" - "+moment(recordDetails.closeTime).format("h:mm:ss a")}</strong></p>}
                            <p>By: <strong>{recordDetails.recordCloser}</strong></p>
                            <TwoSidedParagraphContainer style={{ marginBottom: '0px', width: '100%'}}>
                                {!recordDetails.closeTime && 
                                    <>
                                        {(medicalPersonnel.role !=='nurse' && medicalPersonnel.role !=='Representative' && medicalPersonnel.institutionName === recordDetails.hospitalName) &&  
                                            <Button style={{ marginTop: '10px'}} variant='contained' sx={{ padding: "0px 5px"}} size='small' color='success' onClick={() => { navigate(`/${params.institution}/${params.role}/patients/${recordDetails.patientId}/new`); setRecordId(recordDetails._id); }}><AiOutlinePlus />&nbsp;Add File</Button>
                                        }

                                        {(medicalPersonnel.role==='nurse' && medicalPersonnel.institutionName === recordDetails.hospitalName) && 
                                            <Button style={{ marginTop: '10px'}} variant='contained' sx={{ padding: "0px 5px"}} size='small' color='warning' onClick={closeRecord}><AiOutlineClose />&nbsp;Close Record</Button>
                                        }
                                    </>
                                }
                            </TwoSidedParagraphContainer>
                        </RightHalf>
                    </RecordDescriptionHeader>
                }
                <ListOfFiles>
                    {files.map((file, index)=> (
                        <AFile key={index} onClick={() => {handleOpenModal(); setFile(file);}}>
                            <FcFile />
                            <p>{file.type}<br/>{moment(`${file.creationDate}`).format("MMM Do YYYY")}<br/>{moment(`${file.creationDate}`).format("h:mm:ss a")}</p>
                        </AFile>
                    ))}
                    {files.length < 1 && <p>No files</p>}
                </ListOfFiles>
            </RightHalf>
        </RecordsContainer>
      </PageBody>
        {/* Notifications snack bar */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>

        {/* File details popup  */}
        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <FilePopup>
            <FileDetails file={file}/>
          </FilePopup>
        </Modal>
    </DashboardWrapper>
  )
}

export default ListOfRecords