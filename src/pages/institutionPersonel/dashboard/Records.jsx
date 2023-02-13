import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Container, DetailsPopup, PageBody, PageTitle, PopupBody } from '../../../components/Dashboard/DashboardHome'
import { ShowModalContext, ShowModalContextSetter} from '../../../App';
import { PopupPayLoadContext } from '../../../App';
import RecordsTable from '../../../components/tables/RecordsTable';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const Records = () => {
  // Other Hooks
  const params = useParams();

  // States 
  const showModal = useContext(ShowModalContext);
  const setShowModal = useContext(ShowModalContextSetter);
  const [requests, setRecords] = useState([]);
  const popupPayLoad = useContext(PopupPayLoadContext);

  // Data fetch (Fetching only records from this specific hospital)
  useEffect(()=>{
    axios.get(`http://localhost:5050/api/mfss/institution/findByCode?institutionCode=${params.institution}`)
    .then(response => {
      axios.get(`http://localhost:5050/api/mfss/record/findByHospitalId?hospitalId=${response.data._id}`)
      .then(response => {
        response.data.forEach(element => {
          element.id = element._id;
        });
        setRecords(response.data)
      })
      .catch(error => { console.log("Failed to fetch data ::"+error) })
    })
    .catch(error => { console.log("Failed to fetch data ::"+error) })
  },[params.institution])


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
      <Helmet>
        <title>Hospital Internal Records - Medicase</title>
        <meta name="description" content="Medicase, list of all institution or hospital insternal records."/> 
      </Helmet>
      <PageTitle>Records</PageTitle>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody>
        <RecordsTable data={requests}/>
      </PageBody>

      {/* Popup */}
      {showModal ? 
        <DetailsPopup onClick={closeModal} ref={modalRef}>
          <PopupBody showModal={showModal}>
            <CloseRoundedIcon aria-label='Close modal' onClick={()=> setShowModal(prev => !prev)} style={{ cursor: 'pointer'}} />
            {/* <RequestDetails popupPayLoad={popupPayLoad} /> */}
          </PopupBody>
        </DetailsPopup>
      :
        null
      }
    </Container>
  )
}

export default Records