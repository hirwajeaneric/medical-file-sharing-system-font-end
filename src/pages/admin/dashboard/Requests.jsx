import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Container, DetailsPopup, PageBody, PageTitle, PopupBody } from '../../../components/Dashboard/DashboardHome'
import { ShowModalContext, ShowModalContextSetter} from '../../../App';
import { PopupPayLoadContext } from '../../../App';
import RequestsTable from '../../../components/tables/RequestsTable';
import RequestDetails from './RequestDetails';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Helmet } from 'react-helmet-async';

const Requests = () => {
  
  // States 
  const showModal = useContext(ShowModalContext);
  const setShowModal = useContext(ShowModalContextSetter);
  const [requests, setRequests] = useState([]);
  const popupPayLoad = useContext(PopupPayLoadContext);

  // Data fetch 
  useEffect(()=>{
    axios.get('http://localhost:5050/api/mfss/applicationForInstitution/list')
    .then(response => {
      response.data.forEach(element => {
        element.id = element._id;
      });
      response.data.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate))
      setRequests(response.data)
    })
    .catch(error => {
      console.log("Failed to fetch data ::"+error);
    })
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
      <Helmet>
        <title>Join request from institutions - Medicase</title>
        <meta name="description" content="Medicase, Join request from institutions."/> 
      </Helmet>
      <PageTitle>Requests</PageTitle>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      <PageBody>
        <RequestsTable data={requests}/>
      </PageBody>

      {/* Popup */}
      {showModal ? 
        <DetailsPopup onClick={closeModal} ref={modalRef}>
          <PopupBody showModal={showModal}>
            <CloseRoundedIcon aria-label='Close modal' onClick={()=> setShowModal(prev => !prev)} style={{ cursor: 'pointer'}} />
            <RequestDetails popupPayLoad={popupPayLoad} />
          </PopupBody>
        </DetailsPopup>
      :
        null
      }
    </Container>
  )
}

export default Requests