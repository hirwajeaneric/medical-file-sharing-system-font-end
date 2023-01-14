import React from 'react';
import styled from 'styled-components';
import { BiError } from 'react-icons/bi';
import { BsCheck2Circle} from 'react-icons/bs';

const ResponseMessages = ({message, type}) => {
  return (
    <ResponseMessageContainer
      style={{ 
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: 'transparent',
        fontSize: '90%',
        color: type === 'error' ? 'tomato' : 'green',
        border: type === 'error' ? '2px solid tomato' : '2px solid green' 
      }}>
      <div style={{ backgroundColor: type==='error' ? 'tomato' : 'green', padding: '3px 5px'}}>
        {type==='error' ? <BiError style={{ color: 'white', fontSize: '1.5rem'}} /> : <BsCheck2Circle style={{ color: 'white', fontSize: '1.5rem'}} /> }
      </div>
      <p style={{ display: 'inline', textAlign: 'center' ,padding: '0 10px'}}>{message}</p>
    </ResponseMessageContainer>
  )
}

const ResponseMessageContainer = styled.div`
    @media (max-width: 480px) {
        width: 100%;
    }
`;

export default ResponseMessages