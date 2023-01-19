import { Preview, Edit } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const TableActions = ({params, viewPath, editPath, removeCommand}) => {
  return (
    <>
        {viewPath && 
            <Box>
                <Tooltip title='View Details'>
                    <IconButton onClick={()=>{
                        window.location.href=`${viewPath}/${params.row._id}`
                    }}>
                    <Preview />
                    </IconButton>
                </Tooltip>
            </Box>
        }
        {editPath && 
            <Box>
                <Tooltip title='Edit'>
                    <IconButton onClick={()=>{
                        window.location.href=`${editPath}/${params.row._id}`
                        }}>
                        <Edit />
                    </IconButton>
                </Tooltip>
            </Box>
        }
    </>
)
}
  
export default TableActions