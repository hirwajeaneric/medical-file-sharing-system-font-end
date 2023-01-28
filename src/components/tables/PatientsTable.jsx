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
        field: 'email',
        headerName: 'Email',
        width: 170,
    },{
        field: 'phone',
        headerName: 'Phone',
        width: 130,
    },
    {
        field: 'residence',
        headerName: 'Residence',
        width: 170,
    },
    {
        field: 'dateOfBirth',
        headerName: 'Date of Birth',
        width: 100,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 100,
    },{
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 120,
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

const PatientsTable = ({data}) => {
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

export default PatientsTable