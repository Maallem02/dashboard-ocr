import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
/* import { mockDataContacts } from "../../data/mockData"; */
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios'
/* import fetchData from '../../data/fetcher.js'; */


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/client')
      .then(res => {
        if (Array.isArray(res.data.rows)) { // Check if `rows` property contains an array
          const formattedData = res.data.rows.map(item => ({ // Extract array from `rows`
            id: item.id,
            name: item.name,
            first_name: item.f_name, // Modify the keys as needed
            city: item.city,
            occupation: item.occupation,
            birthDate: item.birth_date,
            ID_Number: item.id_num,
          }));
          setData(formattedData);
        } else {
          console.error('Rows data is not an array:', res.data.rows);
        }
      })
      .catch(err => {
        console.log('Error fetching data:', err);
      });
  }, []);
  
  










  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
   
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "first name",
      headerName: "first name",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "occupation",
      flex: 1,
    },
    {
      field: "birth date",
      headerName: "birth date",
      flex: 1,
    },
    {
      field: "ID number",
      headerName: "ID number",
      flex: 1,
    },

  ];


  return (
    <Box m="20px">
      <Header
        title="LIST OF CLIENTS"
        subtitle="THIS IS OUR CLIENTS DATA"
      />
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
      

        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
