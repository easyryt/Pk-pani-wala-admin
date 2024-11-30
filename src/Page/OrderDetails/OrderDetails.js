import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
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
        const response = await axios.get(
          `https://pkpaniwala.onrender.com/admin/order/particular/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-admin-token": token,
            },
          }
        );
        setOrderData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order data");
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
  const filteredItems = orderData?.productData?.items.filter(
    (item) =>
      item.Product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Product_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Get the payment method display value
  const getPaymentMethod = () => {
    const paymentMethod = orderData?.paymentMethod;
    if (!paymentMethod) return "";
    if (typeof paymentMethod === "object") {
      return `${paymentMethod.cod ? "COD" : ""} ${
        paymentMethod.online ? "Online" : ""
      }`.trim();
    }
    return paymentMethod; // In case it's a string
  };

  // Button click handlers
  const handleOrderStatusClick = () => {
    console.log({ orderStatus: "Delivered" });
  };

  const handleOtpClick = () => {
    console.log({ otp: "1741" });
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      }}
    >
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrderStatusClick}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Update Order Status
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOtpClick}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
         Verify Delivery
        </Button>
      </Box>
      <br/>
      {/* Snackbar for Error/Info Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ fontSize: "1rem", fontWeight: 500 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {loading ? (
        <CircularProgress
          sx={{ display: "block", margin: "auto", color: "#1976d2" }}
        />
      ) : error ? (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" sx={{ fontSize: "1rem", fontWeight: 500 }}>
            {error}
          </Alert>
        </Snackbar>
      ) : (
        <>
          {/* Order Summary Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600 }}
                    gutterBottom
                  >
                    Order Summary
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Order ID: {orderData._id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Order Date:{" "}
                    {new Date(orderData.orderDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Status:{" "}
                    {
                      orderData.trackingDetails?.[
                        orderData.trackingDetails.length - 1
                      ]?.trackingStatus
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600 }}
                    gutterBottom
                  >
                    Shipping Information
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {orderData.shippingInfo.fullName},{" "}
                    {orderData.shippingInfo.houseNo},{" "}
                    {orderData.shippingInfo.StreetNo}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {orderData.shippingInfo.landMark},{" "}
                    {orderData.shippingInfo.villageOrArea},{" "}
                    {orderData.shippingInfo.pincode}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Phone: {orderData.shippingInfo.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Alternate Phone: {orderData.shippingInfo.altPhone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Product Information Section */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#333333" }}
              gutterBottom
            >
              Products
            </Typography>
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "gray" }} />,
              }}
              sx={{
                marginBottom: 2,
                "& .MuiInputLabel-root": { fontWeight: 600 },
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
            <TableContainer sx={{ mt: 2, boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems?.map((item) => (
                    <TableRow key={item.Product_id}>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 500,
                        }}
                      >
                        <img
                          src={item.Product_image}
                          alt={item.Product_title}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "8px",
                            marginRight: 10,
                          }}
                        />
                        {item.Product_title}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {item.Product_description}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        ₹{item.Product_Price}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {item.Product_qantity}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        ₹{item.Product_total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Payment Summary */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#333333" }}
              gutterBottom
            >
              Payment Summary
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Total Items</TableCell>
                    <TableCell>Total Product Price</TableCell>
                    <TableCell>GST Amount</TableCell>
                    <TableCell>Delivery Charge</TableCell>
                    <TableCell>Total Floor Charge</TableCell>
                    <TableCell>Grand Total</TableCell>
                    <TableCell>Payment Method</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{orderData.productData.totalItem}</TableCell>
                    <TableCell>
                      ₹{orderData.productData.totalProductPrice}
                    </TableCell>
                    <TableCell>₹{orderData.productData.gstAmount}</TableCell>
                    <TableCell>
                      ₹{orderData.productData.totalDeliveryCharge}
                    </TableCell>
                    <TableCell>
                      ₹{orderData.productData.totalFloorCharge}
                    </TableCell>
                    <TableCell>₹{orderData.productData.grandTotal}</TableCell>
                    <TableCell>{getPaymentMethod()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* Tracking Information Section */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#333333" }}
              gutterBottom
            >
              Tracking Details
            </Typography>
            <TableContainer sx={{ mt: 2, boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData?.trackingDetails?.map((tracking) => (
                    <TableRow key={tracking._id}>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {tracking.trackingStatus}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {new Date(tracking.trackingDate).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrderDetails;
