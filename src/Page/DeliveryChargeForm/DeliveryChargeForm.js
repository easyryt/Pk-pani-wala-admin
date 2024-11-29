import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid, FormControlLabel, Checkbox, CircularProgress, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
import Cookies from "js-cookie";

// Custom Styled Components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  padding: theme.spacing(4),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "500px",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.primary.main,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.grey[400],
  "&:hover": {
    backgroundColor: theme.palette.grey[500],
  },
}));

const DeliveryChargeForm = () => {
  const [isBulk, setIsBulk] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deliveryCharge) {
      setSnackbarMessage("Delivery charge is required");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setSnackbarMessage("Authorization token not found.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const payload = {
      isBulk,
      deliveryCharge,
    };

    try {
      setLoading(true);
      const response = await fetch("https://pkpaniwala.onrender.com/admin/deliveryCharge/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(payload),
      });

      setLoading(false);

      if (response.ok) {
        setSnackbarMessage("Delivery charge created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // Reset form after success
        setIsBulk(false);
        setDeliveryCharge("");
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || "Failed to create delivery charge");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("An error occurred while submitting the form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Reset the form
  const handleReset = () => {
    setIsBulk(false);
    setDeliveryCharge("");
  };

  return (
    <Container>
      <FormWrapper>
        <Title variant="h5">Create Delivery Charge</Title>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Delivery Charge"
                type="number"
                fullWidth
                required
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isBulk}
                    onChange={() => setIsBulk(!isBulk)}
                    color="primary"
                  />
                }
                label="Is Bulk?"
              />
            </Grid>

            <Grid item xs={12}>
              <SubmitButton variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </SubmitButton>
            </Grid>

            <Grid item xs={12}>
              <ResetButton variant="outlined" color="secondary" onClick={handleReset}>
                Reset
              </ResetButton>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DeliveryChargeForm;
