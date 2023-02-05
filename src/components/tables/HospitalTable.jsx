import React, { useContext } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import TableActionsTwo from './TableActionsTwo';
import { Preview } from '@mui/icons-material';
import { PopupPayLoadContextSetter, ShowModalContextSetter } from '../../App';

const columns = [
    {   
        field: '_id', 
        headerName: '_ID', 
        hide:true
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 170,
    },{
        field: 'directorName',
        headerName: 'Name of Admin',
        width: 180,
    },
    {
        field: 'joinDate',
        headerName: 'Join Date',
        width: 170,
    },
    {
        field: 'isApproved',
        headerName: 'Is Approved',
        width: 100,
    },
    {
        field: 'numberOfPersonnel',
        headerName: 'Personnel',
        width: 100,
    },{
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 120,
        renderCell: (params) => <TableActions params= {params} />
    },
]

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

var rows = [];

const HospitalTable = ({data}) => {
    rows = data;
    return (
        <Box sx={{height: 350, width:'100%'}}>
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
                components={{Toolbar: CustomToolbar}}
            />
        </Box>
        
    );
}

export default HospitalTable;

// Table actions

const TableActions = ({params}) => {
    const setShowModal = useContext(ShowModalContextSetter);
    const setPayLoad = useContext(PopupPayLoadContextSetter);

    const openModal = ()=> {
      setShowModal(prev => !prev);
      setPayLoad({ type: 'id', id: params.row._id})
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