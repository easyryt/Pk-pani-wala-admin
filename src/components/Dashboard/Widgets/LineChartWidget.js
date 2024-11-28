import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      backgroundColor: '#1565C0',
      borderColor: '#1565C0',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const LineChartWidget = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Monthly Revenue
      </Typography>
      <Line data={data} options={options} />
    </Paper>
  );
};

export default LineChartWidget;
