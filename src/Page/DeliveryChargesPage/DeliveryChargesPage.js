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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
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
  const [editingCharge, setEditingCharge] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDeliveryCharge, setNewDeliveryCharge] = useState("");
  const [isBulkFilter, setIsBulkFilter] = useState(""); // Changed to support "All" option
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedChargeToDelete, setSelectedChargeToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveryCharges();
  }, [isBulkFilter]);

  const fetchDeliveryCharges = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setSnackbarMessage("Authorization token not found.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    try {
      // Modify URL based on the filter selected
      const url = isBulkFilter
        ? `https://pkpaniwala.onrender.com/admin/deliveryCharge/getAll?isBulk=${isBulkFilter}`
        : "https://pkpaniwala.onrender.com/admin/deliveryCharge/getAll";
      
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
      });

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

  const handleDeleteClick = (charge) => {
    setSelectedChargeToDelete(charge);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `https://pkpaniwala.onrender.com/admin/deliveryCharge/delete/${selectedChargeToDelete._id}`,
        {
          headers: {
            "x-admin-token": token,
          },
        }
      );
      if (response.data.status) {
        setSnackbarMessage("Delivery charge deleted successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setDeliveryCharges(
          deliveryCharges.filter((charge) => charge._id !== selectedChargeToDelete._id)
        );
      } else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage("Failed to delete delivery charge.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (charge) => {
    setEditingCharge(charge);
    setNewDeliveryCharge(charge.deliveryCharge);
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.put(
        `https://pkpaniwala.onrender.com/admin/deliveryCharge/update/${editingCharge._id}`,
        { deliveryCharge: newDeliveryCharge },
        {
          headers: {
            "x-admin-token": token,
          },
        }
      );
      if (response.data.status) {
        setSnackbarMessage("Delivery charge updated successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setDeliveryCharges(
          deliveryCharges.map((charge) =>
            charge._id === editingCharge._id
              ? { ...charge, deliveryCharge: newDeliveryCharge }
              : charge
          )
        );
        setOpenDialog(false);
      } else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage("Failed to update delivery charge.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Title variant="h4">Delivery Charges</Title>

      {/* Filter Section */}
      <FormControl fullWidth>
        <InputLabel>Filter by Is Bulk</InputLabel>
        <Select
          value={isBulkFilter}
          onChange={(e) => setIsBulkFilter(e.target.value)}
          label="Filter by Is Bulk"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>

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
                  <TableCell>Actions</TableCell>
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
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => navigate(`/dashboard/delivery-update-charges/${charge.isBulk}`)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteClick(charge)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this delivery charge?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Delivery Charge Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Delivery Charge</DialogTitle>
        <DialogContent>
          <TextField
            label="Delivery Charge"
            fullWidth
            value={newDeliveryCharge}
            onChange={(e) => setNewDeliveryCharge(e.target.value)}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeliveryChargesPage;
