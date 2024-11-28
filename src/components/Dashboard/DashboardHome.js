import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import Widget1 from "./Widgets/Widget1";
import LineChartWidget from "./Widgets/LineChartWidget";

function DashboardHome() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Widget1 />
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Box sx={{ width: "100%", paddingTop: 4 }}>
        <LineChartWidget />
      </Box>
    </div>
  );
}

export default DashboardHome;
