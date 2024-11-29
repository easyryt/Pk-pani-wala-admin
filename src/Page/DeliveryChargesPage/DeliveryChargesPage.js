import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import Cookies from "js-cookie";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.primary.main,
}));

const TableWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  overflowX: "auto",
  padding: theme.spacing(2),
}));

const DeliveryChargesPage = () => {
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchDeliveryCharges = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setSnackbarMessage("Authorization token not found.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      try {
        const response = await axios.get(
          "https://pkpaniwala.onrender.com/admin/deliveryCharge/getAll?isBulk=false",
          {
            headers: {
              "Content-Type": "application/json",
              "x-admin-token": token,
            },
          }
        );
        if (response.data.status) {
          setDeliveryCharges(response.data.data);
        } else {
          setSnackbarMessage(response.data.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (err) {
        setError("Failed to fetch delivery charges");
        setSnackbarMessage("Failed to fetch delivery charges");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryCharges();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Title variant="h4">Delivery Charges</Title>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Delivery Charge</TableCell>
                  <TableCell>Is Bulk?</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryCharges.map((charge) => (
                  <TableRow key={charge._id}>
                    <TableCell>{charge.deliveryCharge}</TableCell>
                    <TableCell>{charge.isBulk ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {new Date(charge.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(charge.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DeliveryChargesPage;
