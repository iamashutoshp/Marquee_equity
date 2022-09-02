import React from 'react'
import { Box, Button, TextField } from '@mui/material';
import './homepage.css'

export default function HomePage() {
  return (
    <>
      <Box sx={{ width: '80%',margin:'auto' }} className='homepage__container'>
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
      </Box>
    </>
  )
}
