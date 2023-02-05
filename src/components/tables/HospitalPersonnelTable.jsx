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
        field: `firstName`,
        headerName: 'First Name',
        width: 170,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 170,
    },
    {
        field: 'email',
        headerName: 'email',
        width: 170,
    }
    ,{
        field: 'role',
        headerName: 'Role',
        width: 120,
    }
    ,{
        field: 'userCode',
        headerName: 'User Code',
        width: 180,
    },
    // {
    //     field: 'joinDate',
    //     headerName: 'Join Date',
    //     width: 170,
    // },
    {
        field: 'isActive',
        headerName: 'Is Active',
        width: 100,
    },
    // {
    //     field: 'InstitutionCode',
    //     headerName: 'Institution Code',
    //     width: 100,
    // },
    {
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

const HospitalPersonnelTable = ({data}) => {
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

export default HospitalPersonnelTable