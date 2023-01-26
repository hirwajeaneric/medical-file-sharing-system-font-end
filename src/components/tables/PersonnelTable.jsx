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
        field: 'userCode',
        headerName: 'User Code',
        width: 130,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 100,
    },{
        field: 'phone',
        headerName: 'Phone',
        width: 150,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 170,
    },
    {
        field: 'isActive',
        headerName: 'Active',
        width: 90,
    },
    {
        field: 'joinDate',
        headerName: 'Join Date',
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

const PersonnelTable = ({data}) => {
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

export default PersonnelTable