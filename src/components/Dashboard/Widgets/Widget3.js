import React from 'react';
import { Paper, Typography } from '@mui/material';

const Widget3 = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6">Widget 3</Typography>
      <Typography variant="body1">Content for Widget 3</Typography>
    </Paper>
  );
};

export default Widget3;
