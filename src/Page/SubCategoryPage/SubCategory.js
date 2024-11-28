import React, { useState, useEffect } from 'react';
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
  Modal,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from 'axios';
import SubCreateCategoryModal from './SubCreateCategoryModal';
import UpdateSubCategoryModal from './UpdateSubCategoryModal';
import styles from './SubCategory.module.css';
import { useNavigate } from 'react-router-dom';

function SubCategory() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://www.backend.thenewstale.com/public/category/getAll');
      const reversedCategories = response.data.categories.reverse();
      setCategories(reversedCategories);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    fetchCategories();
  };

  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await axios.delete(`https://www.backend.thenewstale.com/admin/category/delete/${categoryToDelete._id}`);
        fetchCategories();
        handleCloseDeleteDialog();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  const handleCreatePost = (categoryId) => {
    navigate(`/create-custom-page/${categoryId}`);
  };

  const filteredCategories = categories
    ?.filter((category) =>
      category?.categoryName?.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    .reverse();

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Category Management
      </Typography>
      <br />
      <Box className={styles.actions}>
        <TextField
          label="Search Category"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchBar}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateModal}
          className={styles.createButton}
        >
          Create Category
        </Button>
      </Box>
      <br />
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Category Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category?._id}>
                <TableCell>{category?.categoryName}</TableCell>
                <TableCell>
                  <img
                    src={category?.categoryImg}
                    alt={category?.categoryName}
                    className={styles.categoryImage}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenUpdateModal(category)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDeleteDialog(category)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleCreatePost(category?._id)}
                    color="default"
                  >
                    <PostAddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Create Category Modal */}
      <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
        <Box>
          <SubCreateCategoryModal onClose={handleCloseCreateModal} />
        </Box>
      </Modal>
      {/* Update Category Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box>
          <UpdateSubCategoryModal
            category={selectedCategory}
            onClose={handleCloseUpdateModal}
          />
        </Box>
      </Modal>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category "{categoryToDelete?.categoryName}"? This action cannot be undone.
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
    </Container>
  );
}

export default SubCategory;
