import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import styles from "./CreateCategoryModal.module.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function CreateCategoryModal({ onClose }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImg: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    // Validate form data
    if (!formData.categoryName || !formData.categoryImg) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Retrieve the token from cookies
    const token = Cookies.get("token");

    try {
      // Make the API request with the token in the header
      const response = await axios.post(
        `https://www.backend.thenewstale.com/admin/category/create`,
        formData,
        {
          headers: {
            "x-admin-token": token, // Pass the token in the header
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response status and handle success
      if (response?.status) {
        setSuccessMessage("Category created successfully!");
        setFormData({ categoryName: "", categoryImg: "" });
        onClose(); // Close the modal after successful creation
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message || "An error occurred.";
        setError(errorMessage);
        console.error("Axios Error:", errorMessage);
      } else {
        console.error("Network Error:", error.message);
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className={styles.modalContainer}>
      <Box className={styles.formBox}>
        <Typography variant="h5" className={styles.modalHeading}>
          Create New Category
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            className={styles.input}
          />
          <TextField
            label="Category Image URL"
            name="categoryImg"
            value={formData.categoryImg}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            className={styles.input}
          />
          {error && (
            <Typography color="error" className={styles.errorText}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" className={styles.successText}>
              {successMessage}
            </Typography>
          )}
          <Box className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? (
                <CircularProgress size={24} className={styles.progress} />
              ) : (
                "Create Category"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default CreateCategoryModal;
