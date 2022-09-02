import React from 'react'
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './homepage.css'

export default function HomePage() {
  const table_cols = [{ field: 'cin', headerName: 'CIN', flex: 2 },
  { field: 'company', headerName: 'Name', flex: 2 }]

  const table_rows = [{ id: 1, company: 'Amazon', cin: '23' },
  { id: 2, company: 'Google', cin: '24' },
  { id: 3, company: 'Microsoft', cin: '25' }]
  return (
    <>
      <Box className='homepage__container'>
        <div className='homepage__container-toprow'>
          <div className='homepage__container-company'>
            <Button variant="contained" color="secondary" size="small">{`COMPANY +`}</Button>
          </div>

          <div className='homepage__container-search'>
            <TextField id="standard-basic" label="Search" variant="standard" />
          </div>
        </div>

        <div className='homepage__container-showEntries'>
          <span>show entries</span>
        </div>

        <div className="homepage__container-datatable-div" style={{ height: '40vh' }}>
          <DataGrid
            rows={table_rows}
            columns={table_cols}
            pageSize={5}
            rowsPerPageOptions={[5]}
            hideFooter
            disableSelectionOnClick
            disableColumnMenu
            disableColumnSelector
          />
          <div className="homepage__container-datatable-div__footer">
            <Button >PREVIOUS</Button>
            <Button variant="contained" size="small">{`CUR`}</Button>
            <Button>NEXT</Button>
          </div>
        </div>
      </Box>
    </>
  )
}
