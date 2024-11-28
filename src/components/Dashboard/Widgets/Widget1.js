import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Widget1 = () => {
  return (
    <Paper
      elevation={6} // Higher elevation for a more prominent shadow effect
      sx={{
        padding: 4, // Increased padding for a more spacious layout
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly more opaque background
        backdropFilter: 'blur(10px)', // Stronger blur effect for a modern feel
        borderRadius: 2, // Rounded corners for a softer look
        color: '#333', // Darker text for better contrast
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Smooth and soft shadow
        '&:hover': {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)', // Darker shadow on hover
          transform: 'scale(1.02)', // Slight scale-up effect on hover
        },
        transition: 'all 0.3s ease', // Smooth transition for hover effects
        maxWidth: '400px', // Maximum width for better content layout
        margin: '0 auto', // Centering the widget horizontally
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="h5" // Larger heading for better emphasis
          sx={{
            fontWeight: 600, // Bold text for the title
            color: '#1A237E', // Professional blue color for the title
          }}
        >
          Widget 1
        </Typography>
      </Box>
      <Typography
        variant="body1" // Larger body text for better readability
        sx={{
          color: '#555', // Slightly lighter color for the content text
          fontSize: '16px',
          lineHeight: 1.6, // Increase line height for better readability
        }}
      >
        Content for Widget 1
      </Typography>
    </Paper>
  );
};

export default Widget1;
