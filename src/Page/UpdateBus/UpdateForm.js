import React, { useState, useEffect } from "react";
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
import styles from "./UpdateForm.module.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function UpdateForm() {
  const [blogImg, setBlogImg] = useState(null);
  const token = Cookies.get("token");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    content: "",
    description: "",
    author: "",
    authorImgTitle: "",
    authorImgAlt: "",
    authorImage: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    imageUrl: "",
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

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const headers = {
          "x-admin-token": token,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://www.backend.thenewstale.com/admin/newsPost/getSingle/${id}`,
          { headers }
        );
        const postData = response.data.post;

        setFormData({
          heading: postData.heading,
          title: postData.title,
          content: postData.content,
          description: postData.description,
          author: postData.authorData.author,
          authorImgTitle: postData.authorData.authorImgTitle,
          authorImgAlt: postData.authorData.authorImgAlt,
          authorImage: postData.authorData.authorImage,
          metaTitle: postData.metaTitle,
          metaDescription: postData.metaDescription,
          keywords: postData.keywords.join(", "), // Convert array to string
          imageUrl: postData.imageUrl,
          imageUrlTitle: postData.imageUrlTitle,
          imageUrlAlt: postData.imageUrlAlt,
          customUrl: postData.customUrl || "",
          bigScreen: postData.bigScreen,
          published: postData.published,
          mostPopular: postData.mostPopular || false,
          mustReads: postData.mustReads || false,
          featuredVideos: postData.featuredVideos || false,
          lifestyle: postData.lifestyle || false,
          podcasts: postData.podcasts || false,
          youMayAlsoLike: postData.youMayAlsoLike || false,
        });
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError("Failed to load the post data.");
      }
    };

    fetchPostData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (newContent) => {
    setFormData((prevData) => ({ ...prevData, content: newContent }));
  };

  const handleImageChange = (e) => {
    setBlogImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all form fields to the FormData object
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("description", formData.description);

      formDataToSend.append(
        "authorData",
        JSON.stringify({
          author: formData.author,
          authorImage: formData.authorImage,
          authorImgTitle: formData.authorImgTitle,
          authorImgAlt: formData.authorImgAlt,
        })
      );

      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);
      formDataToSend.append("keywords", JSON.stringify(formData.keywords.split(", ")));

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
      const response = await axios.put(
        `https://www.backend.thenewstale.com/admin/newsPost/update/${id}`,
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
        imageUrl: "",
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
        Update Post
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
        <Typography>Content: (300-800 words)</Typography>
        <RichTextEditor initialValue={formData.content} getValue={handleContentChange} />
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
          label="Keywords (Separate by commas)"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Image URL Title"
          name="imageUrlTitle"
          value={formData.imageUrlTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <TextField
          label="Image URL Alt"
          name="imageUrlAlt"
          value={formData.imageUrlAlt}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        <TextField
          label="Custom URL"
          name="customUrl"
          value={formData.customUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.input}
        />
        <Box>
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
        </Box>
        {error && (
          <Typography color="error" className={styles.error}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
}

export default UpdateForm;
