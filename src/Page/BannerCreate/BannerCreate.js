import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const BannerCreate = () => {
  const [bannerImg, setBannerImg] = useState(null);
  const [preview, setPreview] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Image Upload and Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImg(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!bannerImg) {
      setError("Please upload a banner image.");
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      formData.append("bannerImg", bannerImg);
      formData.append("isActive", isActive);

      const response = await axios.post(
        "https://pkpaniwala.onrender.com/admin/banner/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-admin-token": token,
          },
        }
      );

      setSuccess("Banner created successfully!");
      setBannerImg(null);
      setPreview("");
      setIsActive(false);
    } catch (err) {
      setError("Failed to create banner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    container: {
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    imageUpload: {
      marginBottom: "20px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "8px",
    },
    fileInput: {
      marginBottom: "15px",
      border: "1px solid #ccc",
      padding: "8px",
      borderRadius: "4px",
    },
    previewContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    previewImage: {
      maxWidth: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    switch: {
      marginBottom: "20px",
    },
    submitButton: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      padding: "12px 20px",
      borderRadius: "4px",
      textTransform: "none",
      "&:disabled": {
        backgroundColor: "#b0bec5",
      },
    },
    error: {
      marginTop: "10px",
      color: "red",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
    },
    success: {
      marginTop: "10px",
      color: "green",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.heading}>Create New Banner</Typography>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Upload Image */}
        <Box sx={styles.imageUpload}>
          <Typography sx={styles.label}>Upload Banner Image</Typography>
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleImageChange}
            sx={styles.fileInput}
          />
          {preview && (
            <Box sx={styles.previewContainer}>
              <img
                src={preview}
                alt="Banner Preview"
                sx={styles.previewImage}
              />
            </Box>
          )}
        </Box>

        {/* Active Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Active"
          sx={styles.switch}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={styles.submitButton}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Create Banner"}
        </Button>

        {/* Error/Success Messages */}
        {error && <Typography sx={styles.error}>{error}</Typography>}
        {success && <Typography sx={styles.success}>{success}</Typography>}
      </form>
    </Box>
  );
};

export default BannerCreate;
