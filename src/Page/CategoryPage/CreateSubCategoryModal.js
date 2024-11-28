import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

function CreateSubCategoryModal({ categoryId, onClose }) {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSubCategory = async () => {
    setLoading(true);
    setError('');

    const token = Cookies.get('token');

    try {
      await axios.post(
        `https://www.backend.thenewstale.com/admin/subCategory/create/${categoryId}`,
        { subCategoryName},
        {
          headers: {
            'x-admin-token': token,
            'Content-Type': 'application/json',
          },
        }
      );
      onClose(); // Close modal on success
    } catch (err) {
      setError('Failed to add subcategory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="create-subcategory-modal"
      aria-describedby="create-subcategory-modal-description"
    >
      <Box
        sx={{
          width: 400,
          padding: 3,
          margin: 'auto',
          mt: '20%',
          backgroundColor: 'white',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Subcategory
        </Typography>
        <TextField
          label="Subcategory Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSubCategory}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Subcategory'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateSubCategoryModal;
