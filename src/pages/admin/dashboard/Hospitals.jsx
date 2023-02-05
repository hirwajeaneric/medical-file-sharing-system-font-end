import axios from 'axios'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { PopupPayLoadContext, ShowModalContext, ShowModalContextSetter } from '../../../App'
import { Container, DetailsPopup, PageBody, PageHeaderContainer, PageTitle, PopupBody } from '../../../components/Dashboard/DashboardHome'
import HospitalTable from '../../../components/tables/HospitalTable'
import InstitutionDetails from './RequestDetails'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Hospitals = () => {
  // States
  const [institutions, setPatients] = useState([]);
  const showModal = useContext(ShowModalContext);
  const setShowModal = useContext(ShowModalContextSetter);
  const popupPayLoad = useContext(PopupPayLoadContext);

  // Data fetch
  useEffect(()=>{
    axios.get(`http://localhost:5050/api/mfss/institution/list`)
    .then(response => {
      response.data.forEach(element => {
        element.id = element._id;
      });
      setPatients(response.data)
    })
    .catch(error => { console.log("Failed to fetch data ::"+error) })
  },[])

  // Popup utilities 
  const modalRef = useRef();

  const closeModal = e => {
    if(modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  )

  useEffect(()=>{
    document.addEventListener('keydown', keyPress);
    return () =>  document.removeEventListener('keydown', keyPress);
  },[keyPress]);

  return (
    <Container>
      <PageHeaderContainer>
        <PageTitle>List of Hospitals</PageTitle>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody style={{ marginBottom: '60px'}}>
        <HospitalTable data={institutions}/>
      </PageBody>

      {/* Popup */}
      {showModal ? 
        <DetailsPopup onClick={closeModal} ref={modalRef}>
          <PopupBody showModal={showModal}>
            <CloseRoundedIcon aria-label='Close modal' onClick={()=> setShowModal(prev => !prev)} style={{ cursor: 'pointer'}} />
            <InstitutionDetails popupPayLoad={popupPayLoad} />
          </PopupBody>
        </DetailsPopup>
      :
        null
      }
  </Container>
  )
}

export default Hospitals