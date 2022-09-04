import React, { useCallback, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import './addcompany.css'

export default function AddCompany() {
  const navigate = useNavigate()

  const [searchResults, setSearchResults] = useState([])
  const [searchText, setSearchText] = useState('')
  const [validSelection, setValidSelection] = useState(true)

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 150);
    };
  };

  const onSearchChange = (val) => {
    setSearchText(val)
    setValidSelection(true)
    if (val)
      axios.get(`company/search/${val}`).then((res) => {
        if (res.status === 200)
          setSearchResults(res.data)
      })
    else
      setSearchResults([])
  }

  const onSearch = useCallback(debounce(onSearchChange), []);

  const onSearchSelect = (selectedSearch) => {
    if (selectedSearch) {
      setSearchResults([selectedSearch])
      setSearchText(selectedSearch.company_name ? selectedSearch.company_name : '')
    }
    setValidSelection(true)
  }

  const onSubmitCompany = () => {
    if (searchResults.length === 1 && searchResults[0].company_name === searchText.trim()) {
      setValidSelection(true)
      return true;
    }
    else {
      setValidSelection(false)
      return false;
    }
  }


  return (
    <Box>
      <div className='addCompany__container'>
        <div className='addCompany__container-search_bar'>
          <Autocomplete
            id="size-small-standard"
            size="small"
            options={searchResults}
            freeSolo
            fullWidth
            getOptionLabel={(option) => option && option.company_name ? option.company_name : ""}
            defaultValue={''}
            onChange={(event, value) => { onSearchSelect(value) }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!validSelection}
                id={!validSelection ? "standard-error-helper-text" : ""}
                variant="standard"
                label="Search"
                placeholder="Search"
                value={searchText}
                helperText={!validSelection ? "Select a Valid Company" : ""}
                onChange={(e) => { onSearch(e.target.value) }}
              />
            )}
          />
        </div>

        <div className='addCompany__container-submit-div'>
          <Button variant="contained" color="secondary"
            size={"medium"}
            onClick={() => {
              if (onSubmitCompany()) {
                axios.post('company/add', searchResults[0]).then((res) => {
                  if (res.status === 200)
                    navigate("/")
                })
              }
            }}
          >SUBMIT</Button>
        </div>
      </div>
    </Box>
  )
}
