import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const data = {
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [
    {
      label: 'Product Sales',
      data: [300, 50, 100],
      backgroundColor: ['#1E88E5', '#D32F2F', '#388E3C'],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const PieChartWidget = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Product Sales Distribution
      </Typography>
      <Pie data={data} options={options} />
    </Paper>
  );
};

export default PieChartWidget;
