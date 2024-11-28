import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";
import RichTextEditor from "./RichTextEditor";
import styles from "./CustomPageForm.module.css";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';

function CustomPageForm() {
  const [blogImg, setBlogImg] = useState(null);
  const token = Cookies.get("token");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    content: "",
    description: "",
    author: "The News Tale",
    authorImgTitle: "The News Tale",
    authorImgAlt: "The News Tale",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    imageUrl: null, // Updated to handle image as file
    imageUrlTitle: "",
    imageUrlAlt: "",
    customUrl: "",
    bigScreen: false,
    published: false,
    mostPopular: false,
    mustReads: false,
    featuredVideos: false,
    lifestyle: false,
    podcasts: false,
    youMayAlsoLike: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setBlogImg(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Prepare the form data
      const formDataToSend = new FormData();

      // Append all form fields to the FormData object
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("description", formData.description);

      // Append nested authorData
      formDataToSend.append("authorData", JSON.stringify({
        author: formData.author,
        authorImage: "https://example.com/images/johndoe.jpg",
        authorImgTitle: formData.authorImgTitle,
        authorImgAlt: formData.authorImgAlt,
      }));

      // Append meta information
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);

      // Handle keywords as a comma-separated string
      formDataToSend.append("keywords",JSON.stringify(formData?.keywords) );

      // Append imageUrl object
      if (blogImg) {
        formDataToSend.append("imageUrl", blogImg);
      }
      formDataToSend.append("imageUrlTitle", formData.imageUrlTitle);
      formDataToSend.append("imageUrlAlt", formData.imageUrlAlt);

      // Append other fields
      formDataToSend.append("customUrl", formData.customUrl);
      formDataToSend.append("bigScreen", formData.bigScreen);
      formDataToSend.append("published", formData.published);
      formDataToSend.append("mostPopular", formData.mostPopular);
      formDataToSend.append("mustReads", formData.mustReads);
      formDataToSend.append("featuredVideos", formData.featuredVideos);
      formDataToSend.append("lifestyle", formData.lifestyle);
      formDataToSend.append("podcasts", formData.podcasts);
      formDataToSend.append("youMayAlsoLike", formData.youMayAlsoLike);

      // Make the API request
      const response = await axios.post(
        `https://www.backend.thenewstale.com/admin/newsPost/create/${id}`,
        formDataToSend,
        {
          headers: {
            "x-admin-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API response:", response.data);
      alert("Form submitted successfully!");

      // Reset form data
      setFormData({
        heading: "",
        title: "",
        content: "",
        description: "",
        author: "",
        authorImgTitle: "",
        authorImgAlt: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        imageUrl: null,
        imageUrlTitle: "",
        imageUrlAlt: "",
        customUrl: "",
        bigScreen: false,
        published: false,
        mostPopular: false,
        mustReads: false,
        featuredVideos: false,
        lifestyle: false,
        podcasts: false,
        youMayAlsoLike: false,
      });
      setBlogImg(null);
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Create New Post
      </Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Heading (5-8 words)"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Title (6-10 words)"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <br />
        <label>Content: (300-800 words)</label>
        <RichTextEditor
          initialValue={formData.content}
          getValue={handleContentChange}
        />
        <TextField
          label="Short Description (150-160 characters)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Author Name"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Author Img Title"
          name="authorImgTitle"
          value={formData.authorImgTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Author Img Alt"
          name="authorImgAlt"
          value={formData.authorImgAlt}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Meta Title (50-60 characters)"
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Meta Description (150-160 characters)"
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Keywords (comma-separated)"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Blog Image URL (681 × 383 px)"
          name="imageUrl"
          onChange={handleChange}
          type="file"
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Blog Image Title (less than 60 characters)"
          name="imageUrlTitle"
          value={formData.imageUrlTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Blog Image Alt Tag (80 to 125 characters)"
          name="imageUrlAlt"
          value={formData.imageUrlAlt}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Custom URL (Don't use any special characters and under 7 words)"
          name="customUrl"
          value={formData.customUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.bigScreen}
              onChange={handleChange}
              name="bigScreen"
            />
          }
          label="Big Screen"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.published}
              onChange={handleChange}
              name="published"
            />
          }
          label="Published"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.mostPopular}
              onChange={handleChange}
              name="mostPopular"
            />
          }
          label="Most Popular"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.mustReads}
              onChange={handleChange}
              name="mustReads"
            />
          }
          label="Must Reads"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.featuredVideos}
              onChange={handleChange}
              name="featuredVideos"
            />
          }
          label="Featured Videos"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.lifestyle}
              onChange={handleChange}
              name="lifestyle"
            />
          }
          label="Lifestyle"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.podcasts}
              onChange={handleChange}
              name="podcasts"
            />
          }
          label="Podcasts"
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.youMayAlsoLike}
              onChange={handleChange}
              name="youMayAlsoLike"
            />
          }
          label="You May Also Like"
        />
        <Box textAlign="center" mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Box>
  );
}

export default CustomPageForm;
