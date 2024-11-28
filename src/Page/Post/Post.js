import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./Post.module.css";

const Post = () => {
  const token = Cookies.get("token");
  const [postData, setPostData] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [publishedFilter, setPublishedFilter] = useState(
    sessionStorage.getItem("publishedFilter") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const headers = {
        "x-admin-token": token,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://www.backend.thenewstale.com/admin/newsPost/getAll",
        { headers }
      );
      if (response.data.status) {
        setPostData(response.data.posts);
        setFilteredPostData(response.data.posts);
      }
    } catch (error) {
      console.error("Error fetching Post data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const headers = {
        "x-admin-token": token,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://www.backend.thenewstale.com/public/category/getAll",
        { headers }
      );
      if (response.data.status) {
        setCategories(response?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch subcategories
  const fetchSubcategories = async (categoryId) => {
    try {
      const headers = {
        "x-admin-token": token,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `https://www.backend.thenewstale.com/public/subCategory/getAll/${categoryId}`,
        { headers }
      );
      if (response?.data?.status) {
        setSubcategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (categoryFilter) {
      fetchSubcategories(categoryFilter);
    } else {
      setSubcategories([]);
    }
  }, [categoryFilter, token]);

  useEffect(() => {
    const filterPosts = () => {
      let filtered = postData;

      if (searchQuery) {
        filtered = filtered.filter(
          (post) =>
            post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post?.keywords?.some((keyword) =>
              keyword?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }

      if (publishedFilter) {
        filtered = filtered.filter(
          (post) => post?.published?.toString() === publishedFilter
        );
      }

      if (categoryFilter) {
        filtered = filtered.filter(
          (post) => post.catId?._id === categoryFilter
        );
      }

      if (subcategoryFilter) {
        filtered = filtered.filter(
          (post) => post?.subCatId?._id === subcategoryFilter
        );
      }

      setFilteredPostData(filtered);
    };

    filterPosts();
  }, [
    searchQuery,
    publishedFilter,
    categoryFilter,
    subcategoryFilter,
    postData,
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePublishedFilterChange = (event) => {
    const value = event.target.value;
    setPublishedFilter(value);
    sessionStorage.setItem("publishedFilter", value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    setSubcategoryFilter(""); // Reset subcategory filter when category changes
  };

  const handleSubcategoryFilterChange = (event) => {
    setSubcategoryFilter(event.target.value);
  };

  const handleNavigation = (id) => {
    navigate(`/fullBlog/${id}`);
  };
  function convertToBlogDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <Container className={styles.container}>
      {loading && <CircularProgress className={styles.loading} />}
      <Typography variant="h4" className={styles.title}>
        News Post List <span>({filteredPostData.length})</span>
      </Typography>
      <br />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            className={styles.searchBar}
            variant="outlined"
            placeholder="Search by Title or Keywords"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth className={styles.select}>
            <InputLabel>Filter by Public Status</InputLabel>
            <Select
              value={publishedFilter}
              onChange={handlePublishedFilterChange}
              label="Filter by Public Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Public</MenuItem>
              <MenuItem value="false">Private</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth className={styles.select}>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              label="Filter by Category"
            >
              <MenuItem value="">All</MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category?._id} value={category?._id}>
                  {category?.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth className={styles.select}>
            <InputLabel>Filter by Subcategory</InputLabel>
            <Select
              value={subcategoryFilter}
              onChange={handleSubcategoryFilterChange}
              label="Filter by Subcategory"
              disabled={!categoryFilter} // Disable subcategory filter if no category is selected
            >
              <MenuItem value="">All</MenuItem>
              {subcategories?.map((subcategory) => (
                <MenuItem
                  key={subcategory?._id}
                  value={subcategory?._id}
                >
                  {subcategory?.subCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={styles.gridContainer}>
        {filteredPostData
          .slice() // Creates a shallow copy to avoid mutating the original array
          .reverse() // Reverses the copy
          .map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <br />
              <Card
                className={styles.card}
                onClick={() => handleNavigation(post._id)}
              >
                <CardContent>
                  <Typography variant="h5" className={styles.postTitle}>
                    {post?.title}
                  </Typography>
                  <img
                    src={post?.imageUrl?.url}
                    alt={post?.title}
                    className={styles.image}
                  />
                  <Typography variant="body2" color="textSecondary">
                    <strong>Post Category: </strong>
                    {post?.catId?.categoryName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Sub Category: </strong>
                    {post?.subCatId?.subCategoryName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Keywords: </strong>
                    {post?.keywords.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Status: </strong>
                    {post?.published ? "Public" : "Private"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Created: </strong>
                    {convertToBlogDate(post?.updatedAt)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Post;
