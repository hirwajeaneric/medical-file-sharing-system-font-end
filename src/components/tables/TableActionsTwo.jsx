import { Preview } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TableActionsTwo = ({params}) => {
    const navigate = useNavigate();
    
    return (
        <Box>
            <Tooltip title='View / Edit'>
                <IconButton onClick={()=> {navigate(`${params.id}`)}}>
                <Preview />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
  
export default TableActionsTwo