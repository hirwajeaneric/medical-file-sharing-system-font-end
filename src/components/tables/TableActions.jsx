import { Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { ShowModalContextSetter, PopupPayLoadContextSetter } from '../../App';

const TableActions = ({params}) => {
    const setShowModal = useContext(ShowModalContextSetter);
    const setPayLoad = useContext(PopupPayLoadContextSetter);

    const openModal = ()=> {
      setShowModal(prev => !prev);
      setPayLoad({ type: 'applicationForInstitution', id: params.row._id})
    };

    return (
        <Box>
            <Tooltip title='View / Edit'>
                <IconButton onClick={openModal}>
                <Preview />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
  
export default TableActions