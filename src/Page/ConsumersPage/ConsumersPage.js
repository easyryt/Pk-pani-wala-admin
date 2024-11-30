import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIcon from "@mui/icons-material/Phone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/system";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Custom Styles
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "24px",
  color: "#333",
  marginBottom: theme.spacing(2),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1200px",
  margin: theme.spacing(2, 0),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const LoadingWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
}));

const NoDataText = styled(Typography)(({ theme }) => ({
  color: "#666",
  fontSize: "18px",
  textAlign: "center",
}));

const ConsumersPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5; // Number of rows per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsumers = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setSnackbarMessage("Authorization token not found.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          "https://pkpaniwala.onrender.com/admin/consumerData/allconsumer",
          {
            headers: {
              "Content-Type": "application/json",
              "x-admin-token": token,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result.data);
          setFilteredData(result.data);
        } else {
          setSnackbarMessage("Failed to fetch consumer data");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarMessage("An error occurred while fetching data.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumers();
  }, []);

  // Search Functionality
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter(
      (consumer) =>
        (consumer.fullName &&
          consumer.fullName.toLowerCase().includes(lowercasedTerm)) ||
        consumer.phone.includes(lowercasedTerm) ||
        (consumer.email &&
          consumer.email.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Paginate Data
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <PageContainer>
      <Title>All Consumers</Title>

      {/* Controls */}
      <ControlsContainer>
        <StyledTextField
          variant="outlined"
          placeholder="Search by name, phone, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={page === 1}
            onClick={handlePrevPage}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={page * pageSize >= filteredData.length}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Box>
      </ControlsContainer>

      {loading ? (
        <LoadingWrapper>
          <CircularProgress size={50} color="primary" />
        </LoadingWrapper>
      ) : paginatedData.length === 0 ? (
        <NoDataText>No consumer data available</NoDataText>
      ) : (
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Profile</strong>
                </TableCell>
                <TableCell>
                  <strong>Full Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>DOB</strong>
                </TableCell>
                <TableCell>
                  <strong>Anniversary</strong>
                </TableCell>
                <TableCell>
                  <strong>Role</strong>
                </TableCell>
                <TableCell>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>
                  <strong>Created At</strong>
                </TableCell>
                <TableCell>
                  <strong>Check Cart</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((consumer) => (
                <TableRow key={consumer._id}>
                  <TableCell>
                    <AvatarWrapper>
                      <Avatar
                        src={
                          consumer?.profilePic?.url
                            ? consumer.profilePic.url
                            : undefined
                        }
                        alt={consumer?.fullName || "User"}
                      >
                        <AccountCircleIcon />
                      </Avatar>
                    </AvatarWrapper>
                  </TableCell>
                  <TableCell>{consumer.fullName || "N/A"}</TableCell>
                  <TableCell>
                    <InfoBox>
                      <PhoneIcon color="primary" />
                      {consumer.phone}
                    </InfoBox>
                  </TableCell>
                  <TableCell>
                    <InfoBox>
                      <EmailIcon color="primary" />
                      {consumer.email || "N/A"}
                    </InfoBox>
                  </TableCell>
                  <TableCell>
                    <InfoBox>
                      <CakeIcon color="secondary" />
                      {consumer.dob || "N/A"}
                    </InfoBox>
                  </TableCell>
                  <TableCell>
                    <InfoBox>
                      <CelebrationIcon color="secondary" />
                      {consumer.aniversaryDate || "N/A"}
                    </InfoBox>
                  </TableCell>
                  <TableCell>
                    <InfoBox>
                      <WorkIcon color="action" />
                      {consumer.role}
                    </InfoBox>
                  </TableCell>
                  <TableCell>{consumer.gender}</TableCell>
                  <TableCell>
                    {new Date(consumer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        navigate(`/dashboard/consumers-cart/${consumer._id}`)
                      }
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

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
    </PageContainer>
  );
};

export default ConsumersPage;
