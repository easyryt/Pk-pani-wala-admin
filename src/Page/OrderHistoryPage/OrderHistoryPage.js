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
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.primary.main,
  fontSize: "2rem",
}));

const TableWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  boxShadow: theme.shadows[3], // Softer shadow for a professional look
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const SearchBarWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

const Image = styled("img")({
  width: "70px",
  height: "auto",
  objectFit: "cover",
  borderRadius: "8px",
});

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [searchQuery, fromDate, toDate]);

  const fetchOrders = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setSnackbarMessage("Authorization token not found.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    try {
      let url = "https://pkpaniwala.onrender.com/admin/order/all";
      const params = {};

      if (searchQuery) {
        params.search = searchQuery;
      }
      if (fromDate) {
        params.fromDate = fromDate;
      }
      if (toDate) {
        params.toDate = toDate;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        params: params,
      });

      if (response.data.status) {
        setOrders(response.data.data);
      } else {
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      setError("Failed to fetch order history.");
      setSnackbarMessage("Failed to fetch order history.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Reset the search and date range filters
  const resetFilters = () => {
    setSearchQuery("");
    setFromDate("");
    setToDate("");
  };

  return (
    <Container>
      <Title variant="h4">Order History</Title>

      {/* Search and Date Range Filter */}
      <SearchBarWrapper>
        {/* Search Bar */}
        <TextField
          label="Search Orders"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Search by Order ID or Tracking Details"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />

        {/* Date Range Filter */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{ maxWidth: 200 }}
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            sx={{ maxWidth: 200 }}
          />
        </Box>

        {/* Reset Filter Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={resetFilters}
          sx={{ maxWidth: 200 }}
        >
          Reset Filters
        </Button>
      </SearchBarWrapper>

      {/* Loader or Error Message */}
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
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Total Items</TableCell>
                  <TableCell>Grand Total</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Tracking Details</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderID}</TableCell>
                    <TableCell>
                      <Image
                        src={order.Product_image}
                        alt="Product"
                        height={50}
                        width={50}
                      />
                    </TableCell>
                    <TableCell>{order.totalItem}</TableCell>
                    <TableCell>₹{order.grandTotal.toFixed(2)}</TableCell>
                    <TableCell>
                      {order.paymentMethod.cod
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </TableCell>
                    <TableCell>{order.trackingDetails}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          navigate(`/dashboard/order-details/${order.orderId}`)
                        }
                      >
                        <ShoppingCartOutlinedIcon />
                      </IconButton>
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

export default OrderHistoryPage;
