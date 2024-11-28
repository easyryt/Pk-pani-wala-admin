import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

// Custom Styled Components
const CustomForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  margin: "auto",
}));

const ImageUploadContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[400]}`,
  padding: theme.spacing(3),
  borderRadius: "12px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: theme.palette.grey[100],
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ThumbnailContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "16px",
});

const Thumbnail = styled(Box)({
  position: "relative",
  width: "100px",
  height: "100px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const ThumbnailImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const RemoveButton = styled(IconButton)({
  position: "absolute",
  top: "4px",
  right: "4px",
  backgroundColor: "#ffffff",
  padding: "4px",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const UpdateProduct = () => {
  const [productImg, setProductImg] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [capacityVolume, setCapacityVolume] = useState("");
  const [bulkAvailable, setBulkAvailable] = useState(false);
  const [bulkMinQuantity, setBulkMinQuantity] = useState("");
  const [loading, setLoading] = useState(true); // Initially set to true for loading state
  const { id } = useParams(); // Get product id from the URL
  const navigate = useNavigate(); // To navigate after successful update

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        alert("Authorization token not found.");
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch(
          `https://pkpaniwala.onrender.com/public/product/singleProduct/${id}`,
          {
            headers: {
              "x-admin-token": token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const product = data.data;

          // Populate form with fetched data
          setTitle(product.title || "");
          setDescription(product.description || "");
          setSellingPrice(product.sellingPrice || "");
          setMeasurementUnit(product.measurementUnit || "");
          setCapacityVolume(product.capacityVolume || "");
          setBulkAvailable(product.bulkAvailable || false);
          setBulkMinQuantity(product.bulkMinQuantity || "");

          // Assuming productImg is an array of image URLs, if available
          setProductImg(product.productImg || []);
        } else {
          alert("Failed to fetch product data.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("An error occurred while fetching the product data.");
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };

    fetchProductData();
  }, [id, navigate]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImg([...productImg, ...files]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...productImg];
    newImages.splice(index, 1);
    setProductImg(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      alert("Authorization token not found.");
      return;
    }

    const formData = new FormData();
    productImg.forEach((img) => formData.append("productImg", img));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sellingPrice", sellingPrice);
    formData.append("measurementUnit", measurementUnit);
    formData.append("capacityVolume", capacityVolume);
    formData.append("bulkAvailable", bulkAvailable);
    formData.append("bulkMinQuantity", bulkMinQuantity);

    try {
      setLoading(true);

      const response = await fetch(
        `https://pkpaniwala.onrender.com/admin/product/update/${id}`,
        {
            method: "PUT",
            headers: {
              "x-admin-token": token,
            },
            body: formData, // Properly send FormData without setting Content-Type
          }
      );

      setLoading(false);

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/dashboard/all-product"); // Redirect to the products page after success
      } else {
        const errorData = await response.json();
        alert(`Failed to update product: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const resetForm = () => {
    setProductImg([]);
    setTitle("");
    setDescription("");
    setSellingPrice("");
    setMeasurementUnit("");
    setCapacityVolume("");
    setBulkAvailable(false);
    setBulkMinQuantity("");
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Update Product
      </Typography>
      <CustomForm>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <label htmlFor="productImg">
                <ImageUploadContainer>
                  <AddPhotoAlternateIcon fontSize="large" />
                  <Typography variant="body2">
                    {productImg.length > 0
                      ? `${productImg.length} image(s) selected`
                      : "Click to upload product images"}
                  </Typography>
                </ImageUploadContainer>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="productImg"
                />
              </label>
              <ThumbnailContainer>
                {productImg.map((img, index) => (
                  <Thumbnail key={index}>
                    <ThumbnailImage
                      src={img instanceof File ? URL.createObjectURL(img) : img.url}
                    />
                    <RemoveButton onClick={() => handleRemoveImage(index)}>
                      <DeleteIcon fontSize="small" />
                    </RemoveButton>
                  </Thumbnail>
                ))}
              </ThumbnailContainer>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Product Title"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Selling Price"
                type="number"
                fullWidth
                required
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Measurement Unit"
                fullWidth
                required
                value={measurementUnit}
                onChange={(e) => setMeasurementUnit(e.target.value)}
              >
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Capacity Volume"
                type="number"
                fullWidth
                required
                value={capacityVolume}
                onChange={(e) => setCapacityVolume(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bulkAvailable}
                    onChange={(e) => setBulkAvailable(e.target.checked)}
                  />
                }
                label="Bulk Available"
              />
            </Grid>

            {bulkAvailable && (
              <Grid item xs={6}>
                <TextField
                  label="Minimum Quantity for Bulk"
                  type="number"
                  fullWidth
                  value={bulkMinQuantity}
                  onChange={(e) => setBulkMinQuantity(e.target.value)}
                />
              </Grid>
            )}
          </Grid>

          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={resetForm}>
              Reset
            </Button>
            <Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Update Product"}
              </Button>
            </Box>
          </Box>
        </form>
      </CustomForm>
    </Box>
  );
};

export default UpdateProduct;
