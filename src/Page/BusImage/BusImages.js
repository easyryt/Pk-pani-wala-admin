import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import styles from './BusImages.module.css';

const BusImages = () => {
  const [busImages, setBusImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [updateState, setUpdateState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchBusImages();
  }, [updateState]);

  const fetchBusImages = () => {
    let url = 'https://www.backend.easytripss.com/admin/bus/images/getFilter';
    if (searchTerm) {
      url += `?busNumber=${searchTerm}`;
    }

    axios
      .get(url)
      .then((response) => {
        setBusImages(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching bus images:', error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchBusImages();
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://www.backend.easytripss.com/admin/bus/images/delete/${id}`)
      .then(() => {
        setUpdateState(!updateState);
      })
      .catch((error) => {
        console.error('Error deleting bus image:', error);
      });
  };

  const handleUpdateClick = (id) => {
    setSelectedBusId(id);
    setOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdate = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios
      .put(
        `https://www.backend.easytripss.com/admin/bus/images/update/${selectedBusId}`,
        formData
      )
      .then(() => {
        setUpdateState(!updateState);
        setOpen(false);
        setSelectedFile(null);
        setSelectedBusId(null);
      })
      .catch((error) => {
        console.error('Error updating bus image:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setSelectedBusId(null);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Image URL copied to clipboard!');
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <TextField
          label="Search by Bus Number"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Bus Number</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Image URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {busImages.map((bus) => (
              <TableRow key={bus._id}>
                <TableCell>{bus.busNumber}</TableCell>
                <TableCell>
                  <img src={bus.image.url} alt={bus.busNumber} width="100" />
                </TableCell>
                <TableCell>
                  <div className={styles.urlContainer}>
                    <TextField
                      value={bus.image.url}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Tooltip title="Copy URL">
                      <IconButton onClick={() => handleCopy(bus.image.url)}>
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.buttonGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(bus._id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(bus._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Image Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Bus Image</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BusImages;
