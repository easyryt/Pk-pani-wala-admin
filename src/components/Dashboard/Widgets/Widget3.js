import React from 'react';
import { Paper, Typography } from '@mui/material';

const Widget3 = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        color: 'black',
      }}
    >
      <Typography variant="h6">Widget 1</Typography>
      <Typography variant="body2">Content for Widget 1</Typography>
    </Paper>
  );
};

export default Widget3;
