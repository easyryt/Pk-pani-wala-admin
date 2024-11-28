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
import styles from "./UpdateSubCategoryModal.module.css";

function UpdateSubCategoryModal({ category, onClose }) {
  const [formData, setFormData] = useState({
    categoryName: category?.categoryName || "",
    categoryImg: category?.categoryImg || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!formData.categoryName || !formData.categoryImg) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `https://www.backend.thenewstale.com/admin/category/update/${category._id}`,
        formData
      );

      if (response.status) {
        setSuccessMessage("Category updated successfully!");
        onClose(); // Close the modal after successful update
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        const { response } = error;
        // Set the error message
        const errorMessage = response?.data?.message;
        alert(errorMessage);
        // Log the error message as a string
        console.error("Axios Error:", errorMessage);
      } else {
        // Network error (e.g., no internet connection)
        // alert("Something went wrong");
        console.error("Network Error:", error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm" className={styles.modalContainer}>
      <Box className={styles.formBox}>
        <Typography variant="h5" className={styles.modalHeading}>
          Update Category
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
                "Update Category"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default UpdateSubCategoryModal;
