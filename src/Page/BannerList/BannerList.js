import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
  Modal,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, ToggleOn, ToggleOff, Close } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";

const BannerList = () => {
  // State variables
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For modal preview
  const [updatingBanner, setUpdatingBanner] = useState(""); // Tracks which banner is being updated
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setSnackbarMessage("Authorization token not found.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "https://pkpaniwala.onrender.com/public/banner/getAll",
          {
            headers: {
              "Content-Type": "application/json",
              "x-admin-token": token,
            },
          }
        );
        if (response?.data?.data) {
          setBanners(response.data.data);
        }
      } catch (err) {
        setError("Failed to fetch banners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Update banner status
  const handleStatusToggle = async (bannerId, currentStatus) => {
    setUpdatingBanner(bannerId); // Mark the current banner as updating
    const token = Cookies.get("token");
    if (!token) {
      setSnackbarMessage("Authorization token not found.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    try {
      const updatedStatus = !currentStatus;
      await axios.put(
        `https://pkpaniwala.onrender.com/admin/banner/updateActiveStatus/${bannerId}`,
        { isActive: updatedStatus },
        {
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
        }
      );

      // Update local state after successful API call
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner._id === bannerId ? { ...banner, isActive: updatedStatus } : banner
        )
      );
      setSnackbarMessage("Banner status updated successfully.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage("Failed to update status. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setUpdatingBanner("");
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Inline styles for professional UI
  const styles = {
    container: {
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      textAlign: "center",
      marginBottom: "20px",
    },
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    tableHeader: {
      backgroundColor: "#3f51b5",
    },
    tableHeaderCell: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      padding: "12px",
    },
    tableRow: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#f5f5f5",
      },
    },
    tableCell: {
      padding: "12px",
      fontSize: "14px",
      color: "#333",
    },
    image: {
      width: "80px",
      height: "50px",
      objectFit: "cover",
      borderRadius: "4px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    modalImage: {
      width: "80%",
      maxHeight: "80vh",
      objectFit: "contain",
    },
    error: {
      color: "red",
      textAlign: "center",
      fontWeight: "500",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    },
    modalCloseButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "#fff",
      borderRadius: "50%",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.heading}>Banner List</Typography>

      {loading ? (
        <Box sx={styles.loader}>
          <CircularProgress size={40} />
        </Box>
      ) : error ? (
        <Typography sx={styles.error}>{error}</Typography>
      ) : (
        <TableContainer sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow sx={styles.tableHeader}>
                <TableCell sx={styles.tableHeaderCell}>Images</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Status</TableCell>
                <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner._id} sx={styles.tableRow}>
                  {/* Display all banner images */}
                  <TableCell sx={styles.tableCell}>
                    {banner.bannerImg.map((img) => (
                      <img
                        key={img._id}
                        src={img.url}
                        alt="Banner"
                        style={styles.image}
                        onClick={() => setSelectedImage(img.url)} // Open modal on click
                      />
                    ))}
                  </TableCell>

                  {/* Status of the banner */}
                  <TableCell sx={styles.tableCell}>
                    {updatingBanner === banner._id ? (
                      <CircularProgress size={24} />
                    ) : banner.isActive ? (
                      <Tooltip title="Active">
                        <IconButton
                          onClick={() =>
                            handleStatusToggle(banner._id, banner.isActive)
                          }
                        >
                          <ToggleOn style={{ color: "green", fontSize: "24px" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Inactive">
                        <IconButton
                          onClick={() =>
                            handleStatusToggle(banner._id, banner.isActive)
                          }
                        >
                          <ToggleOff style={{ color: "red", fontSize: "24px" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={styles.tableCell}>
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => setSelectedImage(banner.bannerImg[0].url)} // Show the first image in modal
                      >
                        <Visibility style={{ color: "#3f51b5" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for image preview */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        aria-labelledby="image-modal"
        aria-describedby="modal-to-show-full-size-banner-image"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "relative",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <img src={selectedImage} alt="Full Banner" style={styles.modalImage} />
          <IconButton
            sx={styles.modalCloseButton}
            onClick={() => setSelectedImage(null)}
          >
            <Close />
          </IconButton>
        </Box>
      </Modal>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BannerList;
