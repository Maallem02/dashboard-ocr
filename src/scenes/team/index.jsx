import React, { useState } from 'react';
import axios from 'axios';
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import EditTeamForm from './EditTeamForm'; // Import the EditTeamForm component
import { useQuery, queryCache } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from 'react-query';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading, isError } = useQuery('TeamData', () =>
    axios.get('http://localhost:5000/user').then(res => 
      // Map each row to include an id property
      res.data.rows.map(row => ({ ...row, id: row.id_user }))
    )
  );

  const deleteClient = useMutation(
    id => axios.delete(`http://localhost:5000/user/${id}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries('TeamData');
      }
    }
  );

  const [editingRow, setEditingRow] = useState(null);

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSaveEdit = async (editedData) => {
    try {
      await axios.put(`http://localhost:5000/user/${editedData.id_user}`, editedData);
      queryCache.invalidateQueries('TeamData');
      setEditingRow(null);
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const handleDelete = (id) => {
    deleteClient.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const columns = [
    { field: "id_user", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "f_name", headerName: "First Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
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
            onClick={() => handleDelete(params.row.id_user)}
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
        title="LIST OF TEAM"
        subtitle="THIS IS OUR TEAM DATA"
      />
      {editingRow && (
        <EditTeamForm
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

export default Team;
