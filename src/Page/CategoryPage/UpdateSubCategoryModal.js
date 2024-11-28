import React, { useState, useEffect } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

function UpdateSubCategoryModal({ subCategory, onClose }) {
  const [subCategoryName, setSubCategoryName] = useState(subCategory?.subCategoryName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Retrieve the token from cookies
  const token = Cookies.get("token");

  const handleUpdate = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      await axios.put(
        `https://www.backend.thenewstale.com/admin/subCategory/update/${subCategory._id}`,
        { subCategoryName },
        {
          headers: {
            "x-admin-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      onClose(); // Close the modal after successful update
    } catch (error) {
      setError("Failed to update subcategory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subCategory) {
      setSubCategoryName(subCategory.subCategoryName);
    }
  }, [subCategory]);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update SubCategory</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <TextField
            label="SubCategory Name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!error}
            helperText={error}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={loading}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSubCategoryModal;
