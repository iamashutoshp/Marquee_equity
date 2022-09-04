import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import './homepage.css'

export default function HomePage(props) {
  const navigate = useNavigate()

  const table_cols = [{ field: 'cin', headerName: 'CIN', flex: 2 },
  { field: 'company_name', headerName: 'Name', flex: 2 }]

  const [rowData, setRowData] = useState([])
  const [curPageData, setCurPageData] = useState([])

  const [curPage, setCurPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [searchFlag, setSearchFlag] = useState(false)

  useEffect(() => {
    fetchAllCompanies()
  }, [])

  const onSearch = (searchText) => {
    if (searchText) {
      let foundData = rowData.filter((company) => `${company.cid}`.toLowerCase().includes(searchText) || `${company.company_name}`.toLowerCase().includes(searchText))

      setCurPageData(foundData)
      if (foundData.length > 0) {
        setCurPage(1)
        setLastPage(foundData.length % 3 === 0 ? foundData.length / 3 : Math.floor(foundData.length / 3) + 1)
      } else {
        setCurPage(0)
        setLastPage(0)
      }
      setSearchFlag(true)
    } else
      setInitialData(rowData)
  }

  const paginationData = (ind) => {
    let curCount = 0;
    let curData = []

    for (let i = (ind - 1) * 3; i < rowData.length; i++) {
      if (curCount >= 3)
        break;
      curData.push(rowData[i])
      curCount++;
    }
    setCurPageData(curData)
  }

  const fetchAllCompanies = () => {
    let data = []
    axios.get('company/fetch-all').then((res) => {
      res.data.map((comapnyObj) => {
        let { pid, cin, company_name } = comapnyObj
        data.push({
          id: pid,
          cin: cin,
          company_name: company_name
        })
      })
      setInitialData(data)
    })
  }

  const setInitialData = (data) => {
    setSearchFlag(false)
    setRowData(data)
    setLastPage(data.length % 3 === 0 ? data.length / 3 : Math.floor(data.length / 3) + 1)
    if (data.length <= 3)
      setCurPageData(data)
    else
      setCurPageData(data.slice(0, 3))
  }

  return (
    <>
      <Box className='homepage__container'>
        <div className='homepage__container-toprow'>
          <div className='homepage__container-company'>
            <Button variant="contained" color="secondary" size="small"
              onClick={() => {
                navigate("/add")
              }}
            >{`COMPANY +`}</Button>
          </div>

          <div className='homepage__container-search'>
            <TextField id="standard-basic" label="Search" variant="standard"
              onChange={(e) => {
                onSearch(e.target.value)
              }} />
          </div>
        </div>

        <div className='homepage__container-showEntries'>
          <span>show entries</span>
        </div>

        <div className="homepage__container-datatable-div" style={{ height: '50vh' }}>
          <DataGrid
            rows={curPageData}
            columns={table_cols}
            hideFooter
            disableSelectionOnClick
            disableColumnMenu
            disableColumnSelector
          />
          <div className="homepage__container-datatable-div__footer">
            <div className='homepage__container-datatable-div__footer-pagination_data'>
              {!searchFlag ? `showing ${(curPage - 1) * 3 + 1} to ${(curPage - 1) * 3 + curPageData.length} of ${rowData.length} entries`
                :
                `Total Search results found ${curPageData.length}`
              }
            </div>
            <div className='homepage__container-datatable-div__footer-buttons'>
              <Button
                onClick={() => {
                  if (curPage - 1 >= 1) {
                    setCurPage(curPage - 1)
                    paginationData(curPage - 1)
                  }
                }}
                disabled={curPage === 1}
              >PREVIOUS</Button>
              <Button variant="contained" size="small">{`${curPage}`}</Button>
              <Button
                onClick={() => {
                  if (curPage + 1 <= lastPage) {
                    setCurPage(curPage + 1)
                    paginationData(curPage + 1)
                  }
                }}
                disabled={curPage === lastPage}
              >NEXT</Button>
            </div>
          </div>
        </div>
      </Box>
    </>
  )
}
