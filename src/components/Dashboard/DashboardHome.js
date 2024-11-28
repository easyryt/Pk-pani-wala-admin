import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Widget1 from './Widgets/Widget1';
import LineChartWidget from './Widgets/LineChartWidget';
import Widget2 from './Widgets/Widget2';
import Widget3 from './Widgets/Widget3';

function DashboardHome() {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Widgets in One Row */}
        <Grid item xs={12} sm={12} md={4}>
          <Paper sx={{ padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
            <Widget1 />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper sx={{ padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
            <Widget2 />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper sx={{ padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
            <Widget3 />
          </Paper>
        </Grid>
      </Grid>

      {/* Divider between widgets and chart */}
      <Divider sx={{ marginY: 4 }} />

      {/* Line Chart Below Widgets */}
      <Grid item xs={12}>
        <Box sx={{ marginTop: 4 }}>
          <Paper sx={{ padding: '20px', borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
            <LineChartWidget />
          </Paper>
        </Box>
      </Grid>

      {/* Footer */}
      <Box sx={{ marginTop: 5, textAlign: 'center', color: '#888' }}>
        <Typography variant="body2">© 2024 Dashboard. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}

export default DashboardHome;
