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
} from "@mui/material";
import { Visibility, ToggleOn, ToggleOff } from "@mui/icons-material";
import axios from "axios";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("https://pkpaniwala.onrender.com/public/banner/getAll");
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
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
                      />
                    ))}
                  </TableCell>

                  {/* Status of the banner */}
                  <TableCell sx={styles.tableCell}>
                    {banner.isActive ? (
                      <Tooltip title="Active">
                        <ToggleOn style={{ color: "green", fontSize: "24px" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Inactive">
                        <ToggleOff style={{ color: "red", fontSize: "24px" }} />
                      </Tooltip>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={styles.tableCell}>
                    <Tooltip title="View Details">
                      <IconButton>
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
    </Box>
  );
};

export default BannerList;
