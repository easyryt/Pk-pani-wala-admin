import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import styles from "./IndexingComponent.module.css";

const IndexingComponent = () => {
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleIndexing = async () => {
    try {
      const response = await axios.post("https://www.backend.thenewstale.com/admin/indexing/url", {
        url: url, // URL you want to index
      });

      const { urlNotificationMetadata } = response.data;

      const formattedMessage = `
        Indexing successful!
        <br/>
        <strong>URL:</strong> ${urlNotificationMetadata.url}
        <br/>
        <strong>Latest Update:</strong>
        <br/>
        <strong>Type:</strong> ${urlNotificationMetadata.latestUpdate.type}
        <br/>
        <strong>Notify Time:</strong> ${new Date(urlNotificationMetadata.latestUpdate.notifyTime).toLocaleString()}
      `;

      setResponseMessage(formattedMessage);
    } catch (error) {
      console.error("Indexing error:", error); // Log the full error to the console for debugging

      // Improved error handling
      if (error.response) {
        // Server responded with a status other than 200 range
        setResponseMessage(
          "Indexing failed: " + (error.response.data?.error?.message || error.response.statusText)
        );
      } else if (error.request) {
        // Request was made but no response was received
        setResponseMessage("Indexing failed: No response received from the server.");
      } else {
        // Something else happened while setting up the request
        setResponseMessage("Indexing failed: " + error.message);
      }
    }
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Instant Indexing
      </Typography>
      <br />
      <Box className={styles.inputContainer}>
        <TextField
          label="Enter URL to index"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleIndexing}
          className={styles.button}
        >
          Index URL
        </Button>
      </Box>
      {responseMessage && (
        <Typography
          variant="body1"
          className={styles.response}
          dangerouslySetInnerHTML={{ __html: responseMessage }}
        />
      )}
    </Container>
  );
};

export default IndexingComponent;
