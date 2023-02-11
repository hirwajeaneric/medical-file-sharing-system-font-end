import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Container, DetailsPopup, PageBody, PageHeaderContainer, PageTitle, PopupBody } from '../../../components/Dashboard/DashboardHome'
import { ShowModalContext, ShowModalContextSetter} from '../../../App';
import { PopupPayLoadContext } from '../../../App';
import PersonnelTable from '../../../components/tables/PersonnelTable';
import PersonnelDetails from './PersonnelDetails';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NewPersonnelForm from '../../../components/Dashboard/NewPersonnelForm';

const ListOfPersonnel = () => {
  // States 
  const showModal = useContext(ShowModalContext);
  const setShowModal = useContext(ShowModalContextSetter);
  const [personnel, setPersonnel] = useState([]);
  const popupPayLoad = useContext(PopupPayLoadContext);

  // Data fetch 
  useEffect(()=>{
    axios.get(`http://localhost:5050/api/mfss/institutionPersonnel/findByInstitutionId?institutionId=${JSON.parse(localStorage.getItem('instAdmPe')).institutionId}`)
    .then(response => {
      response.data.forEach(element => {
        element.id = element._id;
      });
      setPersonnel(response.data)
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
      <PageHeaderContainer>
        <PageTitle>Personnel</PageTitle>
      </PageHeaderContainer>
      <hr style={{height: '1px', background: '#b3b3cc', border: 'none'}}/>
      
      <PageBody>
        <NewPersonnelForm numberOfPersonnel={personnel.length}/>
      </PageBody>

      <PageBody style={{ marginBottom: '60px'}}>
        <PersonnelTable data={personnel}/>
      </PageBody>

      {/* Popup */}
      {showModal ? 
        <DetailsPopup onClick={closeModal} ref={modalRef}>
          <PopupBody showModal={showModal}>
            <CloseRoundedIcon aria-label='Close modal' onClick={()=> setShowModal(prev => !prev)} style={{ cursor: 'pointer'}} />
            <PersonnelDetails popupPayLoad={popupPayLoad} />
          </PopupBody>
        </DetailsPopup>
      :
        null
      }
    </Container>
  )
}

export default ListOfPersonnel