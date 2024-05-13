import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditForm = ({ rowData, onSave }) => {
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
      await axios.put(`http://localhost:5000/client/${editedData.id}`, editedData);
      onSave(editedData);
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <Box m="30px" >
      <h2>Edit Client</h2>
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
        name="city"
        label="City"
        value={editedData.city}
        onChange={handleChange}
      />
      
      <TextField
        name="occupation"
        label="Occupation"
        value={editedData.occupation}
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        name="birth_date"
        label="Birth Date"
        type="date"
        value={editedData.birth_date}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      
      <TextField
        name="id_num"
        label="ID Number"
        value={editedData.id_num}
        onChange={handleChange}
      />
      <br />
      <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
    </Box>
  );
};

export default EditForm;
