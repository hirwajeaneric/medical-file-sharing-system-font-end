import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TableActions from './TableActions';

const columns = [
    {   
        field: '_id', 
        headerName: '_ID', 
        hide:true
    },
    {
        field: 'institutionType',
        headerName: 'Institution Type',
        width: 130,
    },
    {
        field: 'institutionName',
        headerName: 'Institution Name',
        width: 150,
    },
    {
        field: 'sendDate',
        headerName: 'Send Date',
        width: 130,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
    },{
        field: 'respondDate',
        headerName: 'Respond Date',
        width: 150,
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 170,
    },
    {
        field: 'numberOfPersonnel',
        headerName: 'Personnel',
        width: 90,
    },
    {
        field: 'directorId',
        headerName: 'Director Id',
        width: 150,
        hide: true
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

const RequestsTable = ({data}) => {
    data.forEach(element => {
        element.sendDate = new Date(element.sendDate).toDateString();
        if (element.respondDate) { element.respondDate = new Date(element.respondDate).toDateString(); }
    });
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

export default RequestsTable