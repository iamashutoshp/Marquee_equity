import React from 'react'
import { Box, Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate  } from "react-router-dom";
import './addcompany.css'

export default function AddCompany() {
  const navigate = useNavigate()

  return (
    <Box>
      <div className='addCompany__container'>
        <div className='addCompany__container-submit-div'>
          <Button variant="contained" color="secondary" size="medium"
          onClick={()=>{
            navigate("/")
          }}
          >SUBMIT</Button>
        </div>
        <div className='addCompany__container-search_bar'>
          <Autocomplete
            id="size-small-standard"
            size="small"
            options={[]}
            fullWidth
            // getOptionLabel={(option) => option.title}
            defaultValue={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search"
                placeholder="Search"
              />
            )}
          />
        </div>
      </div>
    </Box>
  )
}
