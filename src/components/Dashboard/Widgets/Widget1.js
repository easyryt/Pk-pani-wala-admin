import React from 'react';
import { Paper, Typography } from '@mui/material';

const Widget1 = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6">Widget 1</Typography>
      <Typography variant="body1">Content for Widget 1</Typography>
    </Paper>
  );
};

export default Widget1;
