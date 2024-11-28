import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Collapse,
  CircularProgress,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateSubCategoryModal from "./CreateSubCategoryModal";
import UpdateSubCategoryModal from "./UpdateSubCategoryModal";
import styles from "./Category.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Category() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateSubCategoryModal, setOpenCreateSubCategoryModal] = useState(false);
  const [openUpdateSubCategoryModal, setOpenUpdateSubCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryIdForSub, setCategoryIdForSub] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Retrieve the token from cookies
  const token = Cookies.get("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://www.backend.thenewstale.com/public/category/getAll");
      const reversedCategories = response.data.categories.reverse();
      setCategories(reversedCategories);
    } catch (error) {
      setNotification({ type: "error", message: "Failed to fetch categories" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories based on the category ID
  const fetchSubCategories = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.backend.thenewstale.com/public/subCategory/getAll/${categoryId}`);
      setSubCategories((prev) => ({
        ...prev,
        [categoryId]: response.data.data,
      }));
    } catch (error) {
      setNotification({ type: "error", message: "Failed to fetch subcategories" });
    } finally {
      setLoading(false);
    }
  };

  // Handle category expansion to show/hide subcategories
  const handleToggleExpand = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));

    // Fetch subcategories if not already fetched
    if (!subCategories[categoryId]) {
      fetchSubCategories(categoryId);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Open the modal to create a new category
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  // Close the create category modal and refresh categories
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    fetchCategories();
  };

  // Open the modal to update a category
  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  // Close the update category modal and refresh categories
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  // Open the create subcategory modal
  const handleOpenCreateSubCategoryModal = (categoryId) => {
    setCategoryIdForSub(categoryId);
    setOpenCreateSubCategoryModal(true);
  };

  // Close the create subcategory modal and refresh subcategories
  const handleCloseCreateSubCategoryModal = () => {
    setOpenCreateSubCategoryModal(false);
    setCategoryIdForSub(null);
    if (categoryIdForSub) {
      fetchSubCategories(categoryIdForSub);
    }
  };

  // Open the update subcategory modal
  const handleOpenUpdateSubCategoryModal = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setOpenUpdateSubCategoryModal(true);
  };

  // Close the update subcategory modal and refresh subcategories
  const handleCloseUpdateSubCategoryModal = () => {
    setOpenUpdateSubCategoryModal(false);
    setSelectedSubCategory(null);
    if (categoryIdForSub) {
      fetchSubCategories(categoryIdForSub);
    }
  };

  // Open the delete confirmation dialog
  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  // Close the delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  // Handle category deletion
  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      setLoading(true);
      try {
        await axios.delete(
          `https://www.backend.thenewstale.com/admin/category/delete/${categoryToDelete._id}`,
          {
            headers: {
              "x-admin-token": token, // Pass the token in the header
              "Content-Type": "application/json",
            },
          }
        );
        fetchCategories();
        setNotification({ type: "success", message: "Category deleted successfully" });
        handleCloseDeleteDialog();
      } catch (error) {
        setNotification({ type: "error", message: "Failed to delete category" });
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle subcategory deletion
  const handleDeleteSubCategory = async (subCategoryId, categoryId) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://www.backend.thenewstale.com/admin/subCategory/delete/${subCategoryId}`,
        {
          headers: {
            "x-admin-token": token, // Pass the token in the header
            "Content-Type": "application/json",
          },
        }
      );
      fetchSubCategories(categoryId);
      setNotification({ type: "success", message: "Subcategory deleted successfully" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to delete subcategory" });
    } finally {
      setLoading(false);
    }
  };

  // Navigate to create a custom page for the category
  const handleCreatePost = (categoryId) => {
    navigate(`/create-custom-page/${categoryId}`);
  };

  // Navigate to create a custom page for the subcategory
  const handleCreatePostForSubCategory = (subCategoryId) => {
    navigate(`/create-custom-page/${subCategoryId}`);
  };

  // Filter categories based on the search query
  const filteredCategories = categories?.filter((category) =>
    category?.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Category Management
      </Typography>
      <br/>
      <Box className={styles.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateModal}
        >
          Add Category
        </Button>
        <TextField
          label="Search Category"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchField}
        />
      </Box>

      {/* Loading Indicator */}
      {loading && <CircularProgress className={styles.loading} />}

      {/* Categories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <React.Fragment key={category._id}>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => handleToggleExpand(category._id)}>
                        {expandedCategories[category._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                      {category.categoryName}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenUpdateModal(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(category)}>
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenCreateSubCategoryModal(category._id)}
                      startIcon={<AddIcon />}
                    >
                      Add SubCategory
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Subcategories Section */}
                <TableRow>
                  <TableCell colSpan={2}>
                    <Collapse in={expandedCategories[category._id]}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>SubCategory Name</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {subCategories[category._id]?.map((subCategory) => (
                            <TableRow key={subCategory._id}>
                              <TableCell>{subCategory.subCategoryName}</TableCell>
                              <TableCell>
                                <IconButton onClick={() => handleOpenUpdateSubCategoryModal(subCategory)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteSubCategory(subCategory._id, category._id)}>
                                  <DeleteIcon />
                                </IconButton>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleCreatePostForSubCategory(subCategory._id)}
                                  startIcon={<PostAddIcon />}
                                >
                                  Create Post
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Category Modal */}
      <Dialog open={openCreateModal} onClose={handleCloseCreateModal}>
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <CreateCategoryModal onClose={handleCloseCreateModal} />
        </DialogContent>
      </Dialog>

      {/* Update Category Modal */}
      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          {selectedCategory && <UpdateCategoryModal category={selectedCategory} onClose={handleCloseUpdateModal} />}
        </DialogContent>
      </Dialog>

      {/* Create SubCategory Modal */}
      <Dialog open={openCreateSubCategoryModal} onClose={handleCloseCreateSubCategoryModal}>
        <DialogTitle>Create SubCategory</DialogTitle>
        <DialogContent>
          {categoryIdForSub && <CreateSubCategoryModal categoryId={categoryIdForSub} onClose={handleCloseCreateSubCategoryModal} />}
        </DialogContent>
      </Dialog>

      {/* Update SubCategory Modal */}
      <Dialog open={openUpdateSubCategoryModal} onClose={handleCloseUpdateSubCategoryModal}>
        <DialogTitle>Update SubCategory</DialogTitle>
        <DialogContent>
          {selectedSubCategory && <UpdateSubCategoryModal subCategory={selectedSubCategory} onClose={handleCloseUpdateSubCategoryModal} />}
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      {notification && (
        <Snackbar
          open={!!notification}
          autoHideDuration={6000}
          onClose={() => setNotification(null)}
          message={notification.message}
          severity={notification.type}
        />
      )}
    </Container>
  );
}

export default Category;
