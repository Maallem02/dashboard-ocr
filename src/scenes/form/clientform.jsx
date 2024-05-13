import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    f_name: "",
    city: "",
    occupation: "",
    id_num: "",
    birth_date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track form submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/client",
        formData
      );
      console.log(response.data); // Log the response from the server
      // Handle any success behavior here, such as showing a success message or redirecting the user
      setSubmitted(true); // Set the submitted state to true after successful form submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle any error response from the server here
    }
    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="First Name"
          name="f_name"
          value={formData.f_name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="ID Number"
          name="id_num"
          value={formData.id_num}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Birth Date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={submitting}
          style={{ marginTop: "20px" }}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {submitted && ( // Render message only if the form has been submitted
        <Typography variant="body1" style={{ marginTop: "20px"  }}>
          Form submitted successfully!
        </Typography>
      )}
    </Box>
  );
};

export default ClientForm;
