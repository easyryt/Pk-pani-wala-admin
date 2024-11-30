import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Divider, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Payment as PaymentIcon, Receipt as ReceiptIcon } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { id } = useParams();

  // Fetch order data from API
  useEffect(() => {
    const fetchOrderData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setSnackbarMessage("Authorization token not found.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://pkpaniwala.onrender.com/admin/order/particular/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
        });
        setOrderData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order data');
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id]);

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the product data based on search query
  const filteredItems = orderData?.productData?.items.filter(item =>
    item.Product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Product_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Snackbar for Error/Info Messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>

      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
      ) : error ? (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      ) : (
        <>
          {/* Order Summary Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Summary
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Order ID: {orderData._id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Order Date: {new Date(orderData.orderDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {orderData.trackingDetails?.[orderData.trackingDetails.length - 1]?.trackingStatus}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Shipping Information
                  </Typography>
                  <Typography variant="body2">
                    {orderData.shippingInfo.fullName}, {orderData.shippingInfo.houseNo}, {orderData.shippingInfo.StreetNo}
                  </Typography>
                  <Typography variant="body2">
                    {orderData.shippingInfo.landMark}, {orderData.shippingInfo.villageOrArea}, {orderData.shippingInfo.pincode}
                  </Typography>
                  <Typography variant="body2">Phone: {orderData.shippingInfo.phone}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Product Information Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'gray' }} />,
              }}
            />
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems?.map((item) => (
                    <TableRow key={item.Product_id}>
                      <TableCell>
                        <img src={item.Product_image} alt={item.Product_title} style={{ width: 50, height: 50, borderRadius: '8px' }} />
                        {item.Product_title}
                      </TableCell>
                      <TableCell>{item.Product_description}</TableCell>
                      <TableCell>{item.Product_Price}</TableCell>
                      <TableCell>{item.Product_qantity}</TableCell>
                      <TableCell>{item.Product_total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Payment Information Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Payment Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Total Product Price</Typography>
                    <Typography variant="body1">${orderData.productData.totalProductPrice}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Total Delivery Charge</Typography>
                    <Typography variant="body1">${orderData.productData.totalDeliveryCharge}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">GST</Typography>
                    <Typography variant="body1">${orderData.productData.gstAmount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Grand Total</Typography>
                    <Typography variant="body1">${orderData.productData.grandTotal}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Payment Method Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Payment Method
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {orderData.paymentMethod.cod && (
                  <Button variant="contained" color="primary" fullWidth startIcon={<PaymentIcon />}>
                    Cash on Delivery
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {orderData.paymentMethod.online && (
                  <Button variant="contained" color="secondary" fullWidth startIcon={<ReceiptIcon />}>
                    Online Payment
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          {/* Tracking Details Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Tracking Details
            </Typography>
            {orderData.trackingDetails?.map((tracking) => (
              <Card sx={{ boxShadow: 3, mb: 2 }} key={tracking.date}>
                <CardContent>
                  <Typography variant="body1">
                    {tracking.date} - {tracking.trackingStatus}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrderDetails;
