import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditTeamForm = ({ rowData, onSave }) => {
  const [editedData, setEditedData] = useState({ ...rowData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/user/${editedData.id_user}`, editedData);
      onSave(editedData);
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  return (
    <Box m="30px">
      <h2>Edit Team Member</h2>
      <TextField
        name="name"
        label="Name"
        value={editedData.name}
        onChange={handleChange}
      />
      
      <TextField
        name="f_name"
        label="First Name"
        value={editedData.f_name}
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        name="email"
        label="Email"
        value={editedData.email}
        onChange={handleChange}
      />
      
      <TextField
        name="password"
        label="new password"
        value={""}
        onChange={handleChange}
      />
      <br />
      <br />
      <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
    </Box>
  );
};

export default EditTeamForm;
