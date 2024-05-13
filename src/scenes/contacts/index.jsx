import React, { useState } from 'react';
import axios from 'axios';
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import EditForm from './EditForm'; // Import the EditForm component
import { useQuery, queryCache } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from 'react-query';


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading, isError } = useQuery('clientData', () =>
    axios.get('http://localhost:5000/client').then(res => res.data.rows)
  );

  const deleteClient = useMutation(
    id => axios.delete(`http://localhost:5000/client/${id}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries('clientData');
      }
    }
  );

  const [editingRow, setEditingRow] = useState(null);

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSaveEdit = (editedData) => {
   
    // Assuming successful update, update the state with the updated data
    setEditingRow(null);
  };

  

  const handleDelete = (id) => {
    deleteClient.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "f_name", headerName: "First Name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "birth_date", headerName: "Birth Date", flex: 1 },
    { field: "id_num", headerName: "ID Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="secondary"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="LIST OF CLIENTS"
        subtitle="THIS IS OUR CLIENTS DATA"
      />
      {editingRow && (
        <EditForm
          rowData={editingRow}
          onSave={handleSaveEdit}
        />
      )}
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
