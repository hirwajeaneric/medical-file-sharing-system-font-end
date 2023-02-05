import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TableActionsTwo from './TableActionsTwo';

const columns = [
    {   
        field: '_id', 
        headerName: '_ID', 
        hide:true
    },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 130,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
    },
    {
        field: 'patientId',
        headerName: 'Patient Id',
        width: 120,
    },{
        field: 'email',
        headerName: 'Email',
        width: 130,
    },
    {
        field: 'hospitalName',
        headerName: 'Hospital Name',
        width: 130,
    },
    {
        field: 'openTime',
        headerName: 'Opened On',
        width: 130,
    },
    {
        field: 'closeTime',
        headerName: 'Closed On',
        width: 130,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 100,
        renderCell: (params) => <TableActionsTwo params= {params} />
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

const RecordsTable = ({data}) => {
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

export default RecordsTable