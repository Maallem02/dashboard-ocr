import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    f_name: "",
    login: "",
    password: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);

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
        "http://localhost:5000/user",
        formData
      );
      console.log(response.data); // Log the response from the server
      // Handle any success behavior here, such as showing a success message or redirecting the user
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
          label="Father's Name"
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
          label="Login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          type="email"
          label="Email"
          name="email"
          value={formData.email}
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
    </Box>
  );
};

export default UserForm;
