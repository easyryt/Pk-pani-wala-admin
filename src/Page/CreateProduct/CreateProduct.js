import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const CreateProduct = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>
      <form>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Create Product
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
