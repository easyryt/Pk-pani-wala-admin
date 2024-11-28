import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  datasets: [
    {
      label: 'Visitors',
      data: [12, 19, 3, 5, 2],
      backgroundColor: '#1976D2',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const BarChartWidget = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Daily Visitors
      </Typography>
      <Bar data={data} options={options} />
    </Paper>
  );
};

export default BarChartWidget;
