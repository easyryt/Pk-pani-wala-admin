import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "./Blog.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookies from "js-cookie";

const Blog = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const headers = {
          "x-admin-token": token,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://www.backend.thenewstale.com/admin/newsPost/getSingle/${id}`,
          { headers }
        );
        setPost(response.data.post);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the blog post.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      const headers = {
        "x-admin-token": token,
        "Content-Type": "application/json",
      };
      await axios.delete(
        `https://www.backend.thenewstale.com/admin/newsPost/delete/${id}`,
        { headers }
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/page-list");
      }, 2000);
    } catch (err) {
      setError("Failed to delete the blog post.");
    }
  };

  const handleUpdate = () => {
    navigate(`/update-custom-page/${id}`);
  };

  const createCustomUrl = (text) => {
    return encodeURIComponent(text?.replace(/\s+/g, "-"));
  };

  const handleView = () => {
    const categoryName = post?.catId?.categoryName || "default-category";
    const subCategoryName = post?.subCatId?.subCategoryName || "default-subcategory";
    const customUrl = post?.customUrl || "default-url";

    const fullUrl = `https://thenewstale.com/${createCustomUrl(categoryName)}/${createCustomUrl(subCategoryName)}/${createCustomUrl(customUrl)}`;
    window.open(fullUrl, "_blank");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" className={styles.blogContainer}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div>
      <Box className={styles.buttonGroup}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          className={styles.button}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          className={styles.button}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleView}
          className={styles.button}
        >
          View
        </Button>
      </Box>

      <Container maxWidth="md" className={styles.blogContainer}>
        <div className={styles.statusContainer}>
          <p className={styles.para}>
            <strong>BigScreen:</strong>{" "}
            {post?.bigScreen ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Published:</strong>{" "}
            {post?.published ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Most Popular:</strong>{" "}
            {post?.mostPopular ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Must Reads:</strong>{" "}
            {post?.mustReads ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Featured Videos:</strong>{" "}
            {post?.featuredVideos ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Lifestyle:</strong>{" "}
            {post?.lifestyle ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Podcasts:</strong>{" "}
            {post?.podcasts ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>You May Also Like:</strong>{" "}
            {post?.youMayAlsoLike ? (
              <CheckCircleIcon className={styles.done} />
            ) : (
              <CancelIcon className={styles.cancle} />
            )}
          </p>
          <p className={styles.para}>
            <strong>Meta Title:</strong> {post?.metaTitle}
          </p>
          <p className={styles.para}>
            <strong>Meta Description:</strong> {post?.metaDescription}
          </p>
          <p className={styles.para}>
            <strong>Blog Image Url Title:</strong> {post?.imageUrlTitle}
          </p>
          <p className={styles.para}>
            <strong>Blog Image Url Alt:</strong> {post?.imageUrlAlt}
          </p>
          <p className={styles.para}>
            <strong>Author:</strong> {post?.authorData?.author}
          </p>
          <p className={styles.para}>
            <strong>Author Image Url Title:</strong> {post?.authorData?.authorImgTitle}
          </p>
          <p className={styles.para}>
            <strong>Author Image Url Alt:</strong> {post?.authorData?.authorImgAlt}
          </p>
          <p className={styles.para}>
            <strong>Custom Url:</strong> {post?.customUrl}
          </p>

          <p className={styles.para}>
            <strong>Keywords:</strong> {post?.keywords?.join(", ")}
          </p>
          <p className={styles.para}>
            <strong>Category:</strong> {post?.catId?.categoryName}
          </p>
          <p className={styles.para}>
            <strong>Sub Category:</strong> {post?.subCatId?.subCategoryName}
          </p>
        </div>

        <Card className={styles.blogCard}>
          <img
            src={post.imageUrl?.url}
            alt={post.heading}
            className={styles.blogImage}
          />
          <CardContent>
            <Box className={styles.authorBox}>
              <Avatar
                src={post.authorData.authorImage}
                alt={post.authorData.author}
                className={styles.authorAvatar}
              />
              <Typography variant="subtitle1" className={styles.authorName}>
                {post.authorData.author}
              </Typography>
            </Box>
            <Typography variant="h4" component="h1" className={styles.blogHeading}>
              {post.heading}
            </Typography>
            <Typography variant="body1" component="div" className={styles.blogContent}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        className={styles.snackbar}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          className={styles.alert}
        >
          Blog post deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Blog;
